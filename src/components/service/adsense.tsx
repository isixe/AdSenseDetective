'use client'

export default function Adsense() {
  return (
    <>
      <div className="mb-8 mt-4 w-full">
        <ins
          className="adsbygoogle block"
          data-ad-client="ca-pub-1891811866184778"
          data-ad-slot="9684215023"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
          }}
        />
      </div>
    </>
  )
}
