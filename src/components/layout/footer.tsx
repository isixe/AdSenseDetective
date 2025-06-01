export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground md:px-6">
        © {currentYear} AdSense Detective. All rights reserved.
      </div>
    </footer>
  )
}
