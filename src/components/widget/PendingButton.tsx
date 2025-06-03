'use client'

import { Button } from '@/components/ui/button'
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic'
import React from 'react'
import { useFormStatus } from 'react-dom'

interface PendingButtonProps {
  icon: string
  pendingIcon: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

export default function PendingButton({
  icon,
  pendingIcon,
  className,
  type = 'button',
  children
}: PendingButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button type={type} disabled={pending} className={className}>
      {pending ? (
        <DynamicIcon
          name={pendingIcon as keyof typeof dynamicIconImports}
          className="mr-2 h-5 w-5 animate-spin"
        />
      ) : (
        <DynamicIcon
          name={icon as keyof typeof dynamicIconImports}
          className="mr-2 h-5 w-5"
        />
      )}
      {children}
    </Button>
  )
}
