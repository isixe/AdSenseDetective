import { AmpAdUnitDetail } from '@/types/result'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion'

interface AmpAdUnitItemProps {
  unit: AmpAdUnitDetail
  index: number
}

export default function AmpAdUnitItem({ unit, index }: AmpAdUnitItemProps) {
  return (
    <div className="rounded-md border bg-slate-100 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
      <p className="font-headline mb-2 text-sm font-medium text-primary">
        AMP Ad Slot #{index + 1} (type: adsense)
      </p>
      <div className="space-y-1 text-xs text-muted-foreground dark:text-slate-400">
        <p>
          <strong>Client ID (data-ad-client):</strong>{' '}
          {unit.client ? (
            <code className="rounded bg-slate-200 p-0.5 text-xs dark:bg-slate-700">
              {unit.client}
            </code>
          ) : (
            <span className="text-orange-500 dark:text-orange-400">
              Not specified
            </span>
          )}
        </p>
        <p>
          <strong>Slot ID (data-ad-slot):</strong>{' '}
          {unit.slot ? (
            <code className="rounded bg-slate-200 p-0.5 text-xs dark:bg-slate-700">
              {unit.slot}
            </code>
          ) : (
            <span className="text-orange-500 dark:text-orange-400">
              Not specified
            </span>
          )}
        </p>
        <Accordion type="single" collapsible className="mt-1 w-full">
          <AccordionItem
            value={`amp-ad-unit-${index}-preview`}
            className="border-b-0 border-t border-slate-200 pt-2 dark:border-slate-700/50"
          >
            <AccordionTrigger className="justify-start gap-1.5 px-0 py-2 text-xs font-normal hover:text-primary/80 hover:no-underline focus-visible:ring-1 focus-visible:ring-inset [&[data-state=open]>svg]:text-primary/80">
              Tag Preview
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-2">
              <code className="mt-0 block overflow-x-auto whitespace-pre-wrap rounded bg-slate-200 p-3 text-[11px] leading-relaxed text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                {unit.fullTagPreview}
              </code>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
