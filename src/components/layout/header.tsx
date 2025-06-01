import { Github, SearchCode } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-primary"
        >
          <SearchCode className="h-6 w-6" />
          <span>AdSense Detective</span>
        </Link>
        <a
          href="https://github.com/firebase/studio-app-hosting-example-adsense-detective"
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
