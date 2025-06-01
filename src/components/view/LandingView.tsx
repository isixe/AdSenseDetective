import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ListTree, ShieldCheck, Zap } from 'lucide-react'

export default function LandingView() {
  return (
    <div className="mt-8">
      <h3 className="mb-8 text-center text-2xl font-semibold text-foreground">
        Key Features
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="items-center pb-3 pt-6">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-xl">Verify Setup</CardTitle>
          </CardHeader>
          <CardContent className="pb-6 pt-0 text-center text-sm text-muted-foreground">
            <p>
              Check for AdSense meta tags, ads.txt, and core script
              implementations to ensure proper ownership and ad serving.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="items-center pb-3 pt-6">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <ListTree className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-xl">
              Detect Ad Slots
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6 pt-0 text-center text-sm text-muted-foreground">
            <p>
              Identify all HTML and AMP ad units on a page, detailing their
              client and slot IDs for easy verification.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="items-center pb-3 pt-6">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center text-xl">
              Quick Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6 pt-0 text-center text-sm text-muted-foreground">
            <p>
              Get fast, actionable insights into a website&#39;s AdSense
              configuration for efficient troubleshooting and optimization.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
