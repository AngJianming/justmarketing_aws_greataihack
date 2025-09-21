import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Target, TrendingUp, Users, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-xl font-semibold">StrategyAI</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Analytics
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-balance">Generate Marketing Strategy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Use AI to help you craft a new marketing strategy or adapt based on your existing one. Get data-driven
            insights and actionable recommendations tailored to your business.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href={"/strategy/craft-new"}>
          <Button size="lg" className="px-8 py-6 text-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Craft a New One
          </Button>
          </Link>
          <Link href={"/strategy/adapt"}>
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
            <Target className="w-5 h-5 mr-2" />
            Adapt Existing One
          </Button>
          </Link>
        </div>

        {/* Past Crafting Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-8">Past Crafting</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Strategy Card 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">E-commerce</Badge>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
                <CardTitle className="text-lg">Q1 Growth Strategy</CardTitle>
                <CardDescription>
                  Comprehensive strategy focusing on customer acquisition and retention for online retail.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Target: 25-45</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>ROI: 340%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

     
          </div>
        </div>
      </main>
    </div>
  )
}
