import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-primary"
        >
          <Image
            src="/favicon.svg"
            alt="AdSense Detective"
            width={35}
            height={35}
          />
          <span>AdSense Detective</span>
        </Link>
        <a
          href="https://github.com/isixe/adsense-detective"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
          className="text-foreground transition-colors hover:text-primary"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </header>
  )
}
