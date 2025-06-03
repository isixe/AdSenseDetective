'use server'

export interface HtmlAdUnitDetail {
  client?: string
  slot?: string
  fullTagPreview: string
}

export interface AmpAdUnitDetail {
  typeAttr?: string
  client?: string
  slot?: string
  fullTagPreview: string
}

export interface CheckResult {
  urlChecked: string
  error?: string
  ownershipVerified: boolean
  metaTagFound: boolean
  metaTagContent: string | null
  adsTxtFound: boolean
  adsTxtIsHtmlOrEmpty: boolean
  adsTxtContent?: string | null
  adsbygoogleScriptFound: boolean
  pushScriptFound: boolean
  ampAdScriptFound: boolean
  htmlAdUnits: HtmlAdUnitDetail[]
  ampAdUnits: AmpAdUnitDetail[]
}

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
  ampAdScriptFound: false,
  htmlAdUnits: [],
  ampAdUnits: []
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
        'User-Agent':
          'AdSenseDetectiveBot/1.0 (+https://yourdomain.com/bot-info)',
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
    const metaTagRegex =
      /<meta\s[^>]*name=(?:"google-adsense-account"|'google-adsense-account')[^>]*content=(?:"([^"]*)"|'([^']*)')[^>]*>/i
    const metaTagMatch = html.match(metaTagRegex)
    const currentMetaTagFound = !!metaTagMatch
    const currentMetaTagContent = metaTagMatch
      ? metaTagMatch[1] || metaTagMatch[2] || null
      : null

    // AdSense Script Detection (adsbygoogle.js?client=...)
    const adsScriptRegex =
      /<script\s[^>]*src=[^>]*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=([^"'>\s&]+)[^>]*><\/script>/i
    const currentAdsbygoogleScriptFound = adsScriptRegex.test(html)

    // Push Script Detection
    const pushScriptRegex =
      /\(\s*adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\s*\]\s*\)\.push\(\s*\{\s*\}\s*\)/i
    const currentPushScriptFound = pushScriptRegex.test(html)

    const htmlAdUnits: HtmlAdUnitDetail[] = []
    const insTagRegex =
      /<ins\s[^>]*class=(?:"[^"]*\badsbygoogle\b[^"]*"|'[^']*\badsbygoogle\b[^']*')[^>]*>/gi
    let match
    while ((match = insTagRegex.exec(html)) !== null) {
      const fullTagPreview = match[0]
      const clientMatch = fullTagPreview.match(/data-ad-client="([^"]*)"/i)
      const slotMatch = fullTagPreview.match(/data-ad-slot="([^"]*)"/i)
      htmlAdUnits.push({
        client: clientMatch ? clientMatch[1] : undefined,
        slot: slotMatch ? slotMatch[1] : undefined,
        fullTagPreview: fullTagPreview
      })
    }

    // ads.txt Detection
    let currentAdsTxtFound = false
    let currentAdsTxtContent: string | null = null
    let currentAdsTxtIsHtmlOrEmpty = false
    let validAdsTxtForOwnership = false

    try {
      const adsTxtUrlObject = new URL('/ads.txt', targetUrl)
      const adsTxtUrl = adsTxtUrlObject.href
      const adsTxtResponse = await fetch(adsTxtUrl, {
        headers: {
          'User-Agent':
            'AdSenseDetectiveBot/1.0 (+https://yourdomain.com/bot-info)'
        }
      })

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
    const ampAdScriptRegex =
      /<script\s[^>]*custom-element="amp-ad"[^>]*src="https[^"]*cdn\.ampproject\.org\/v0\/amp-ad-0\.1\.js"[^>]*><\/script>/i
    const currentAmpAdScriptFound = ampAdScriptRegex.test(html)

    // AMP Ad Unit Detection
    const currentAmpAdUnits: AmpAdUnitDetail[] = []
    const ampAdTagRegex = /<amp-ad\s((?:.|\n)*?)<\/amp-ad>/gi
    let ampMatch
    while ((ampMatch = ampAdTagRegex.exec(html)) !== null) {
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
