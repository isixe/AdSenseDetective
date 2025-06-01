import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { TooltipProvider } from '@/components/ui/tooltip'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AdSense Detective',
  description: 'Check websites for AdSense implementation details.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="font-body flex min-h-screen flex-col bg-muted/40 text-foreground antialiased">
        <Header />
        <main className="container mx-auto flex-grow px-4 py-8 md:px-6">
          <TooltipProvider>{children}</TooltipProvider>
        </main>
        <Footer />
      </body>
    </html>
  )
}
