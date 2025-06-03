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
