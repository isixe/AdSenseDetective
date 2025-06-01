'use client'

import { Button } from '@/components/ui/button'
import { Loader2, SearchCode } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export default function FormSubmitButton() {
  const { pending } = useFormStatus()
  return (
    <div className="mx-auto max-w-xl">
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-[#e5f2f2] text-teal-800 hover:bg-[#cce0e0] dark:bg-green-700 dark:text-green-200 dark:hover:bg-green-600"
      >
        {pending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <SearchCode className="mr-2 h-4 w-4" />
        )}
        Check Website
      </Button>
    </div>
  )
}
