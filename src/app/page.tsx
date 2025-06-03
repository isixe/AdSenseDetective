'use client'

import FormSubmitButton from '@/components/FormSubmitButton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import LandingView from '@/components/view/LandingView'
import ResultView from '@/components/view/ResultView'
import { CheckResult } from '@/types/result'
import { useActionState } from 'react'
import { checkWebsiteAdSense } from './actions'

const initialState: CheckResult = {
  ownershipVerified: false,
  metaTagFound: false,
  metaTagContent: null,
  adsbygoogleScriptFound: false,
  pushScriptFound: false,
  adsTxtFound: false,
  adsTxtContent: null,
  adsTxtIsHtmlOrEmpty: false,
  ampAdScriptFound: false,
  htmlAdUnits: [],
  ampAdUnits: [],
  urlChecked: '',
  error: undefined
}

export default function AdsenseCheckerPage() {
  const [state, formAction] = useActionState(checkWebsiteAdSense, initialState)

  let adUnitTabDefaultValue = 'html'
  if (state?.urlChecked && !state.error) {
    if (state.ampAdScriptFound && !state.pushScriptFound) {
      adUnitTabDefaultValue = 'amp'
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-5xl rounded-none border-0 bg-transparent shadow-none">
        <CardHeader className="p-4">
          <CardDescription className="text-center">
            Enter a website URL to check for AdSense ownership verification,
            scripts, and ad units (HTML &amp; AMP).
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-6 pt-0">
          <form action={formAction} className="space-y-6">
            <div className="mx-auto max-w-2xl">
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="e.g., https://example.com"
                required
                className="mt-1"
                defaultValue={state?.urlChecked || ''}
              />
            </div>
            <FormSubmitButton />
          </form>

          {/* Feature Cards Section - shows only if no URL checked */}
          {!state.urlChecked && (
            <>
              <LandingView />
              <ins
                className="adsbygoogle"
                data-ad-client="ca-pub-1891811866184778"
                data-ad-slot="9684215023"
              ></ins>
            </>
          )}

          {state?.urlChecked && (
            <ResultView
              state={state}
              adUnitTabDefaultValue={adUnitTabDefaultValue}
            />
          )}
        </CardContent>
        {state?.urlChecked && !state.error && (
          <CardFooter className="border-t pt-6 text-xs text-muted-foreground">
            <p>
              Note: This tool checks the initial HTML content and ads.txt.
              Dynamically injected tags by client-side JavaScript may not be
              detected.
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
