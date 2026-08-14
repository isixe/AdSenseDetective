'use server'

import { HTMLElement, parse } from 'node-html-parser'
import { AmpAdUnitDetail, CheckResult, HtmlAdUnitDetail } from '@/types/result'

const initialServerLogicState: CheckResult = {
  urlChecked: '',
  error: undefined,
  ownershipVerified: false,
  metaTagFound: false,
  metaTagContent: null,
  adsTxtFound: false,
  adsTxtIsHtmlOrEmpty: false,
  adsTxtContent: null,
  adsbygoogleScriptFound: false,
  pushScriptFound: false,
  pushScriptInBody: false,
  ampAdScriptFound: false,
  htmlAdUnits: [],
  ampAdUnits: []
}

const REGEX = {
  metaTag:
    /<meta\s[^>]*name=(?:"google-adsense-account"|'google-adsense-account')[^>]*content=(?:"([^"]*)"|'([^']*)')[^>]*>/i,

  adsScript:
    /<script\s[^>]*src=[^>]*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=([^"'>\s&]+)[^>]*><\/script>/i,

  pushScript:
    /\(\s*adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\s*\]\s*\)\.push\(\s*\{\s*\}\s*\)/i,

  ampAdScript:
    /<script\s[^>]*custom-element="amp-ad"[^>]*src="https[^"]*cdn\.ampproject\.org\/v0\/amp-ad-0\.1\.js"[^>]*><\/script>/i,

  ampAdTag: /<amp-ad\s((?:.|\n)*?)<\/amp-ad>/gi
}

const ZERO_SIZE_PATTERN =
  /^0(?:\.0+)?(?:px|em|rem|%|vh|vw|vmin|vmax|pt|pc|mm|cm|in|ex|ch|q)?$/i

// Detects explicit zero width/height (inline style wins over attributes)
function getZeroSizeInfo(el: HTMLElement): string | null {  const style = el.attributes['style']
  if (style) {
    for (const decl of style.split(';')) {
      const colonIndex = decl.indexOf(':')
      if (colonIndex === -1) continue
      const prop = decl.slice(0, colonIndex).trim().toLowerCase()
      const value = decl.slice(colonIndex + 1).trim().toLowerCase()
      if (
        (prop === 'width' || prop === 'height') &&
        ZERO_SIZE_PATTERN.test(value)
      ) {
        return `${prop}: ${value}`
      }
    }
  }

  for (const attr of ['width', 'height']) {
    const value = el.attributes[attr]
    if (value && ZERO_SIZE_PATTERN.test(value.trim().toLowerCase())) {
      return `${attr}: ${value.trim()}`
    }
  }

  return null
}

// Walks ancestors (excluding body/html); falls back to the <ins> itself
function findZeroSizeWarning(el: HTMLElement): string | null {
  let parent = el.parentNode as HTMLElement | null
  while (parent) {
    const tagName = parent.rawTagName?.toUpperCase()
    if (!tagName || tagName === 'BODY' || tagName === 'HTML') break
    const info = getZeroSizeInfo(parent)
    if (info) {
      return `Parent container <${parent.rawTagName.toLowerCase()}> has ${info}; the ad may not render.`
    }
    parent = parent.parentNode as HTMLElement | null
  }

  const selfInfo = getZeroSizeInfo(el)
  if (selfInfo) {
    return `The <ins> ad unit itself has ${selfInfo}; the ad may not render.`
  }

  return null
}

export async function checkWebsiteAdSense(
  _prevState: CheckResult,
  formData: FormData
): Promise<CheckResult> {
  const url = formData.get('url') as string

  if (!url) {
    return {
      ...initialServerLogicState,
      urlChecked: '',
      error: 'URL is required.'
    }
  }

  let validatedUrl: URL
  try {
    validatedUrl = new URL(
      url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`
    )
    if (
      validatedUrl.protocol !== 'http:' &&
      validatedUrl.protocol !== 'https:'
    ) {
      throw new Error('Invalid URL protocol. Please use http or https.')
    }
  } catch (error: unknown) {
    const err = error as Error
    return {
      ...initialServerLogicState,
      urlChecked: url,
      error: `Invalid URL: ${err.message}`
    }
  }

  const targetUrl = validatedUrl.href

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: 'text/html'
      }
    })

    if (!response.ok) {
      return {
        ...initialServerLogicState,
        urlChecked: targetUrl,
        error: `Failed to fetch URL: ${response.status} ${response.statusText}`
      }
    }

    const html = await response.text()

    // Meta Tag Detection
    const metaTagMatch = html.match(REGEX.metaTag)
    const currentMetaTagFound = !!metaTagMatch
    const currentMetaTagContent = metaTagMatch
      ? metaTagMatch[1] || metaTagMatch[2] || null
      : null

    // AdSense Script Detection (adsbygoogle.js?client=...)
    const currentAdsbygoogleScriptFound = REGEX.adsScript.test(html)

    // Push Script Detection (must be located inside <body>)
    const pushScriptMatches: RegExpExecArray[] = []
    const pushRegex = new RegExp(REGEX.pushScript.source, 'gi')
    let pushMatch
    while ((pushMatch = pushRegex.exec(html)) !== null) {
      pushScriptMatches.push(pushMatch)
      if (pushMatch.index === pushRegex.lastIndex) pushRegex.lastIndex++
    }
    const currentPushScriptFound = pushScriptMatches.length > 0

    const bodyOpenMatch = html.match(/<body[^>]*>/i)
    const bodyCloseMatch = html.match(/<\/body\s*>/i)
    let currentPushScriptInBody = false
    if (currentPushScriptFound && bodyOpenMatch && bodyCloseMatch) {
      const bodyStart = bodyOpenMatch.index! + bodyOpenMatch[0].length
      const bodyEnd = bodyCloseMatch.index!
      currentPushScriptInBody = pushScriptMatches.every(
        (m) => m.index >= bodyStart && m.index <= bodyEnd
      )
    }

    // HTML Ad Unit Detection (ins.adsbygoogle) via DOM parsing
    const root = parse(html)
    const insNodes = root.querySelectorAll('ins.adsbygoogle')
    const htmlAdUnits: HtmlAdUnitDetail[] = insNodes.map((ins) => {
      let fullTagPreview = `<${ins.rawTagName}${ins.rawAttrs ? ' ' + ins.rawAttrs : ''}>`
      // Tag preview format
      fullTagPreview = fullTagPreview.replace(
        /^<ins\s+class="adsbygoogle"/i,
        '<ins class="adsbygoogle"\n'
      )
      fullTagPreview = fullTagPreview.replace(/\s+([a-zA-Z\-]+)=/g, '\n    $1=')
      return {
        client: ins.attributes['data-ad-client'],
        slot: ins.attributes['data-ad-slot'],
        fullTagPreview,
        containerWarning: findZeroSizeWarning(ins) ?? undefined
      }
    })

    // ads.txt Detection
    let currentAdsTxtFound = false
    let currentAdsTxtContent: string | null = null
    let currentAdsTxtIsHtmlOrEmpty = false
    let validAdsTxtForOwnership = false

    try {
      const adsTxtUrlObject = new URL('/ads.txt', targetUrl)
      const adsTxtUrl = adsTxtUrlObject.href
      const adsTxtResponse = await fetch(adsTxtUrl)

      currentAdsTxtFound = adsTxtResponse.ok

      if (adsTxtResponse.ok) {
        const fetchedAdsTxtContent = await adsTxtResponse.text()
        const contentType = adsTxtResponse.headers.get('content-type')
        const isHtml =
          contentType && contentType.toLowerCase().includes('text/html')
        const isEmpty =
          !fetchedAdsTxtContent || fetchedAdsTxtContent.trim() === ''

        if (isHtml || isEmpty) {
          currentAdsTxtIsHtmlOrEmpty = true
          currentAdsTxtContent = fetchedAdsTxtContent
        } else {
          currentAdsTxtContent = fetchedAdsTxtContent
          currentAdsTxtIsHtmlOrEmpty = false
          validAdsTxtForOwnership = true
        }
      }
    } catch {
      // currentAdsTxtFound remains false
    }

    const currentOwnershipVerified =
      currentMetaTagFound ||
      validAdsTxtForOwnership ||
      currentAdsbygoogleScriptFound

    // AMP Ad Script Detection
    const currentAmpAdScriptFound = REGEX.ampAdScript.test(html)

    // AMP Ad Unit Detection
    const currentAmpAdUnits: AmpAdUnitDetail[] = []
    let ampMatch
    while ((ampMatch = REGEX.ampAdTag.exec(html)) !== null) {
      const fullTagPreview = ampMatch[0]
      const attributesString = ampMatch[1]

      const typeMatch = attributesString.match(/type="([^"]*)"/i)
      const clientMatch = attributesString.match(/data-ad-client="([^"]*)"/i)
      const slotMatch = attributesString.match(/data-ad-slot="([^"]*)"/i)

      const typeAttr = typeMatch ? typeMatch[1] : undefined

      if (typeAttr === 'adsense') {
        const client = clientMatch ? clientMatch[1] : undefined
        const slot = slotMatch ? slotMatch[1] : undefined
        currentAmpAdUnits.push({
          typeAttr,
          client,
          slot,
          fullTagPreview
        })
      }
    }

    return {
      urlChecked: targetUrl,
      error: undefined,
      ownershipVerified: currentOwnershipVerified,
      metaTagFound: currentMetaTagFound,
      metaTagContent: currentMetaTagContent,
      adsTxtFound: currentAdsTxtFound,
      adsTxtIsHtmlOrEmpty: currentAdsTxtIsHtmlOrEmpty,
      adsTxtContent: currentAdsTxtContent,
      adsbygoogleScriptFound: currentAdsbygoogleScriptFound,
      pushScriptFound: currentPushScriptFound,
      pushScriptInBody: currentPushScriptInBody,
      ampAdScriptFound: currentAmpAdScriptFound,
      htmlAdUnits: htmlAdUnits,
      ampAdUnits: currentAmpAdUnits
    }
  } catch (error: unknown) {
    const err = error as Error
    if (err.name === 'AbortError') {
      return {
        ...initialServerLogicState,
        urlChecked: targetUrl,
        error: 'Request timed out while fetching URL.'
      }
    }
    return {
      ...initialServerLogicState,
      urlChecked: targetUrl,
      error: `Error processing URL: ${err.message}`
    }
  }
}
