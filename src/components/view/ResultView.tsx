import type {
  AmpAdUnitDetail,
  CheckResult,
  HtmlAdUnitDetail
} from '@/app/actions'
import AmpAdUnitItem from '@/components/AmpAdUnitItem'
import HtmlAdUnitItem from '@/components/HtmlAdUnitItem'
import ResultItem from '@/components/ResultItem'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  AlertTriangle,
  CheckCircle,
  Code,
  FileText,
  ListChecks,
  ListTree,
  ShieldCheck,
  Tag,
  XCircle,
  Zap
} from 'lucide-react'

export default function ResultView({
  state,
  adUnitTabDefaultValue
}: {
  state: CheckResult
  adUnitTabDefaultValue: string
}) {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="font-headline mb-6 text-center text-xl font-semibold">
        Results for:{' '}
        <span className="font-medium text-primary">
          {new URL(state.urlChecked).hostname}
        </span>
      </h3>
      {state.error && (
        <Alert
          variant="destructive"
          className="flex items-start gap-3 shadow-sm"
        >
          <div className="flex h-full items-center">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      {!state.error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* AdSense Ownership Verification Section */}
          <div className="pt-3">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-md flex items-center font-semibold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="mr-2 h-5 w-5 text-primary/80" />
                AdSense Ownership Verification
              </h4>
              <div
                className={cn(
                  'flex min-w-[105px] items-center rounded-full px-2 py-1 text-xs font-semibold',
                  state.ownershipVerified
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                )}
              >
                {state.ownershipVerified ? (
                  <CheckCircle className="mr-1.5 h-3 w-3" />
                ) : (
                  <XCircle className="mr-1.5 h-3 w-3" />
                )}
                {state.ownershipVerified ? 'Verified' : 'Not Verified'}
              </div>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              Overall verification is positive if the
              &#39;google-adsense-account&#39; meta tag, a valid
              &#39;ads.txt&#39; file, OR the &#39;adsbygoogle.js&#39; script
              (with client ID) is found.
            </p>

            <div className="space-y-3 border-l-2 border-primary/20 pl-3">
              {/* Meta Tag Item */}
              <div className="rounded-md border bg-slate-50 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800/40">
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                    <Tag className="mr-2 h-4 w-4 text-primary/70" />
                    google-adsense-account meta tag
                  </h5>
                  {state.metaTagFound ? (
                    <span className="flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-600 dark:bg-green-900/40 dark:text-green-400">
                      <CheckCircle className="mr-1 h-3 w-3" /> Found
                    </span>
                  ) : (
                    <span className="flex min-w-[95px] items-center rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-red-600 dark:bg-red-900/40 dark:text-red-400">
                      <XCircle className="mr-1 h-3 w-3" /> Not Found
                    </span>
                  )}
                </div>
                {state.metaTagFound ? (
                  <>
                    {state.metaTagContent !== null &&
                    state.metaTagContent.trim() !== '' ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                          value="meta-tag-content-detail"
                          className="border-t border-slate-200 pt-1 dark:border-slate-700/50"
                        >
                          <AccordionTrigger className="justify-start gap-1.5 px-0 py-2 text-xs font-normal hover:text-primary/80 hover:no-underline focus-visible:ring-1 focus-visible:ring-inset [&[data-state=open]>svg]:text-primary/80">
                            View Content
                          </AccordionTrigger>
                          <AccordionContent className="pb-0 pt-2">
                            <pre className="mt-0 block max-h-48 overflow-x-auto whitespace-pre-wrap rounded bg-slate-100 p-3 text-[11px] leading-relaxed text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                              <code>{`<meta name='google-adsense-account' content='${state.metaTagContent}'>`}</code>
                            </pre>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : state.metaTagContent === '' ? (
                      <p className="mt-1 rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-600 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Meta tag found, but its &#39;content&#39; attribute is
                        empty.
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Meta tag found, but &#39;content&#39; attribute might be
                        missing or unreadable.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">
                    The &#39;google-adsense-account&#39; meta tag was not
                    detected in the site&#39;s HTML.
                  </p>
                )}
              </div>

              {/* ads.txt Item */}
              <div className="rounded-md border bg-slate-50 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800/40">
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                    <FileText className="mr-2 h-4 w-4 text-primary/70" />
                    ads.txt File
                  </h5>
                  {state.adsTxtFound && !state.adsTxtIsHtmlOrEmpty ? (
                    <span className="flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-600 dark:bg-green-900/40 dark:text-green-400">
                      <CheckCircle className="mr-1 h-3 w-3" /> Found & Valid
                    </span>
                  ) : state.adsTxtFound && state.adsTxtIsHtmlOrEmpty ? (
                    <span className="flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-xs text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                      <AlertTriangle className="mr-1 h-3 w-3" /> Found
                      (HTML/Empty)
                    </span>
                  ) : (
                    <span className="flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-red-600 dark:bg-red-900/40 dark:text-red-400">
                      <XCircle className="mr-1 h-3 w-3" /> Not Found
                    </span>
                  )}
                </div>
                {state.adsTxtFound ? (
                  <>
                    {state.adsTxtIsHtmlOrEmpty ? (
                      <Alert
                        variant="default"
                        className="mt-1 border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 shadow-sm dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      >
                        <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                        <AlertDescription className="ml-1">
                          ads.txt file is present, but its content appears to be
                          an HTML page (e.g., a custom 404) or is empty.
                          {state.adsTxtContent &&
                            state.adsTxtContent.trim() !== '' && (
                              <Accordion
                                type="single"
                                collapsible
                                className="mt-2 w-full"
                              >
                                <AccordionItem
                                  value="ads-txt-raw-content-detail"
                                  className="border-t border-amber-200 pt-1 dark:border-amber-700/50"
                                >
                                  <AccordionTrigger className="justify-start gap-1.5 px-0 py-2 text-xs font-normal hover:text-primary/80 hover:no-underline focus-visible:ring-1 focus-visible:ring-inset [&[data-state=open]>svg]:text-primary/80">
                                    View Raw Content
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-0 pt-2">
                                    <pre className="mt-0 block max-h-60 overflow-x-auto whitespace-pre-wrap rounded bg-slate-100 p-3 text-[11px] leading-relaxed text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                                      <code>{state.adsTxtContent}</code>
                                    </pre>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            )}
                        </AlertDescription>
                      </Alert>
                    ) : state.adsTxtContent ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                          value="ads-txt-content-detail"
                          className="border-t border-slate-200 pt-1 dark:border-slate-700/50"
                        >
                          <AccordionTrigger className="justify-start gap-1.5 px-0 py-2 text-xs font-normal hover:text-primary/80 hover:no-underline focus-visible:ring-1 focus-visible:ring-inset [&[data-state=open]>svg]:text-primary/80">
                            View Content
                          </AccordionTrigger>
                          <AccordionContent className="pb-0 pt-2">
                            <pre className="mt-0 block max-h-96 overflow-x-auto whitespace-pre-wrap rounded bg-slate-100 p-3 text-[11px] leading-relaxed text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                              <code>{state.adsTxtContent}</code>
                            </pre>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Alert
                        variant="default"
                        className="mt-1 border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 shadow-sm dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      >
                        <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                        <AlertDescription className="ml-1">
                          ads.txt file is present, but content could not be
                          retrieved or is empty (after trimming).
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">
                    The ads.txt file was not found or is not accessible at the
                    root of the domain.
                  </p>
                )}
              </div>

              {/* AdSense Script Item */}
              <div className="rounded-md border bg-slate-50 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800/40">
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                    <Code className="mr-2 h-4 w-4 text-primary/70" />
                    adsbygoogle.js script
                  </h5>
                  {state.adsbygoogleScriptFound ? (
                    <span className="flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-600 dark:bg-green-900/40 dark:text-green-400">
                      <CheckCircle className="mr-1 h-3 w-3" /> Found
                    </span>
                  ) : (
                    <span className="flex min-w-[95px] items-center rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-red-600 dark:bg-red-900/40 dark:text-red-400">
                      <XCircle className="mr-1 h-3 w-3" /> Not Found
                    </span>
                  )}
                </div>
                {state.adsbygoogleScriptFound ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    The AdSense core script (&#39;adsbygoogle.js&#39;) with a
                    client ID was detected in the site&#39;s HTML.
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">
                    The AdSense core script (&#39;adsbygoogle.js&#39;) with a
                    client ID was not detected.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Ad Unit Detection Section with Tabs */}
          <div className="pt-3">
            <h4 className="text-md mb-3 flex items-center font-semibold text-slate-700 dark:text-slate-300">
              <ListChecks className="mr-2 h-5 w-5 text-primary/80" />
              Ad Unit Detection
            </h4>
            <Tabs defaultValue={adUnitTabDefaultValue} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-700">
                <TabsTrigger value="html">
                  HTML
                  {state.pushScriptFound && (
                    <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-700/20 dark:text-green-400">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="amp">
                  AMP
                  {state.ampAdScriptFound && (
                    <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-700/20 dark:text-green-400">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="html">
                <div className="mt-2 space-y-4 border-l-2 border-primary/20 pl-3">
                  <ResultItem
                    label="Ad Push Script"
                    found={state.pushScriptFound}
                    Icon={Code}
                    description={
                      state.pushScriptFound
                        ? 'The script for initializing ad requests (e.g., (adsbygoogle = window.adsbygoogle || []).push({})) was found. This is necessary for HTML ad units to display.'
                        : 'The script for initializing ad requests (e.g., (adsbygoogle = window.adsbygoogle || []).push({})) was not found. HTML ad units may not display without this.'
                    }
                  />

                  <div className="border-t border-dashed border-slate-300 pt-3 dark:border-slate-700">
                    <h5 className="mb-2 mt-2 flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                      <ListTree className="mr-2 h-4 w-4 text-primary/70" />
                      <code className="mx-1 rounded bg-slate-100 p-0.5 text-xs dark:bg-slate-800">
                        &lt;ins class=&#39;adsbygoogle&#39;&gt;
                      </code>{' '}
                      tags
                    </h5>
                    {state.htmlAdUnits.length > 0 ? (
                      <div className="space-y-3">
                        {state.htmlAdUnits.map(
                          (unit: HtmlAdUnitDetail, index: number) => (
                            <HtmlAdUnitItem
                              key={index}
                              unit={unit}
                              index={index}
                            />
                          )
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 shadow-sm dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        <XCircle className="mr-2 h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
                        No{' '}
                        <code className="mx-1 rounded bg-amber-100 p-1 text-xs dark:bg-amber-800">
                          &lt;ins class=&#39;adsbygoogle&#39;&gt;
                        </code>{' '}
                        tags detected.
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="amp">
                <div className="mt-2 space-y-4 border-l-2 border-primary/20 pl-3">
                  <ResultItem
                    label="AMP Ad Script: amp-ad-0.1.js"
                    found={state.ampAdScriptFound}
                    Icon={Zap}
                    description={
                      state.ampAdScriptFound
                        ? 'The AMP ad component script (amp-ad-0.1.js) was found. This is necessary for AMP ad units to function.'
                        : 'The AMP ad component script (amp-ad-0.1.js) was not found. AMP ad units require this script.'
                    }
                  />
                  <div className="border-t border-dashed border-slate-300 pt-3 dark:border-slate-700">
                    <h5 className="mb-2 mt-2 flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                      <ListTree className="mr-2 h-4 w-4 text-primary/70" />
                      <code className="mx-1 rounded bg-slate-100 p-0.5 text-xs dark:bg-slate-800">
                        &lt;amp-ad type=&#39;adsense&#39;&gt;
                      </code>{' '}
                      tags
                    </h5>
                    {state.ampAdUnits.length > 0 ? (
                      <div className="space-y-3">
                        {state.ampAdUnits.map(
                          (unit: AmpAdUnitDetail, index: number) => (
                            <AmpAdUnitItem
                              key={index}
                              unit={unit}
                              index={index}
                            />
                          )
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 shadow-sm dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        <XCircle className="mr-2 h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
                        No{' '}
                        <code className="mx-1 rounded bg-amber-100 p-1 text-xs dark:bg-amber-800">
                          &lt;amp-ad type=&#39;adsense&#39;&gt;
                        </code>{' '}
                        tags detected.
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
