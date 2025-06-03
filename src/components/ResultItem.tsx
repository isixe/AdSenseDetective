import { cn } from '@/lib/utils'
import { CheckCircle, SearchCode, XCircle } from 'lucide-react'

interface ResultItemProps {
  label: string
  found: boolean
  Icon?: React.ElementType
  description?: string
}

export default function ResultItem({
  label,
  found,
  Icon,
  description
}: ResultItemProps) {
  return (
    <div className="rounded-md border bg-slate-50 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800/40">
      <div className={cn('mb-1.5 flex items-center justify-between text-sm')}>
        <div className="flex items-center font-medium">
          {Icon ? (
            <Icon className={cn('mr-2 h-4 w-4 text-primary/70')} />
          ) : (
            <SearchCode className={cn('mr-2 h-4 w-4 text-primary/70')} />
          )}
          <span className="text-slate-600 dark:text-slate-300">{label}</span>
        </div>
        {found ? (
          <span className="flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-600 dark:bg-green-900/40 dark:text-green-400">
            <CheckCircle className="mr-1 h-3 w-3" /> Found
          </span>
        ) : (
          <span className="flex min-w-[95px] items-center rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-red-600 dark:bg-red-900/40 dark:text-red-400">
            <XCircle className="mr-1 h-3 w-3" /> Not Found
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
