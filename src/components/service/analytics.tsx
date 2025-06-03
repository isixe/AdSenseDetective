import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'

export default async function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <GoogleAnalytics gaId="G-D3ZCHZKMXS" />
    </>
  )
}
