import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Zap, Sparkles } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start gap-3" size="lg">
          <Plus className="h-5 w-5" />
          Create New Campaign
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" size="lg">
          <Zap className="h-5 w-5" />
          Quick AI Check
        </Button>
      </CardContent>
    </Card>
  )
}
