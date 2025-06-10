import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart3,
  Clock,
  Eye,
  ListTree,
  ShieldCheck,
  Star,
  Zap
} from 'lucide-react'

export default function LandingView() {
  return (
    <>
      <div className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Powerful Features for
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {' '}
                AdSense Success
              </span>
            </h2>
            <p className="mx-auto max-w-xl text-lg text-gray-600">
              Everything you need to optimize your AdSense performance and
              maximize revenue
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <CardHeader className="relative items-center pb-4 pt-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center text-xl font-bold text-gray-900">
                  Verify Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pb-8 pt-0 text-center">
                <p className="mb-4 leading-relaxed text-gray-600 md:min-h-[130px]">
                  Check for AdSense meta tags, ads.txt, and core script
                  implementations to ensure proper ownership and ad serving.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600">
                  <Eye className="h-4 w-4" />
                  Deep Configuration Scan
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <CardHeader className="relative items-center pb-4 pt-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                  <ListTree className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center text-xl font-bold text-gray-900">
                  Detect Ad Slots
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pb-8 pt-0 text-center">
                <p className="mb-4 leading-relaxed text-gray-600 md:min-h-[130px]">
                  Identify all HTML and AMP ad units on a page, detailing their
                  client and slot IDs for easy verification.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-purple-600">
                  <BarChart3 className="h-4 w-4" />
                  Complete Ad Inventory
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <CardHeader className="relative items-center pb-4 pt-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center text-xl font-bold text-gray-900">
                  Quick Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pb-8 pt-0 text-center">
                <p className="mb-4 leading-relaxed text-gray-600 md:min-h-[130px]">
                  Get fast, actionable insights into your website&#39;s AdSense
                  configuration for efficient troubleshooting and optimization.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-600">
                  <Clock className="h-4 w-4" />
                  Instant Recommendations
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="max-w-6xlx mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Trusted by Publishers Worldwide
            </h2>
            <p className="text-lg text-gray-600">
              See what our users have to say
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <div className="mb-4 flex text-green-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                &quot;This tool saved me hours of manual checking. Found issues
                I never would have caught!&quot;
              </p>
              <div className="font-semibold text-gray-900">Sarah Chen</div>
              <div className="text-sm text-gray-500">Digital Publisher</div>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-lg">
              <div className="mb-4 flex text-green-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                &quot;Increased our AdSense revenue by 35% after implementing
                the recommendations.&quot;
              </p>
              <div className="font-semibold text-gray-900">Mike Rodriguez</div>
              <div className="text-sm text-gray-500">Content Creator</div>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-lg">
              <div className="mb-4 flex text-green-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mb-4 italic text-gray-600">
                &quot;The most comprehensive AdSense analysis tool I&apos;ve
                used. Highly recommended!&quot;
              </p>
              <div className="font-semibold text-gray-900">Emma Johnson</div>
              <div className="text-sm text-gray-500">Agency Owner</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
