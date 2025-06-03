import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { TooltipProvider } from '@/components/ui/tooltip'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto')
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  return {
    metadataBase: new URL(url),
    title: 'AdSense Detective',
    keywords: 'AdSense Checker, AdSense Detective, AdSense Unit Checker',
    description:
      'A tool for checking whether a website has AdSense setup details.',
    alternates: {
      canonical: url
    },
    openGraph: {
      title: 'AdSense Detective',
      description:
        'A tool for checking whether a website has AdSense setup details.',
      url,
      siteName: 'AdSense Detective',
      locale: 'en',
      type: 'website',
      images: '/preview.png'
    }
  }
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
