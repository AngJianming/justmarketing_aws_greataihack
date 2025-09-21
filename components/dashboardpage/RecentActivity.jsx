import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, Languages, Target } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      campaign: "Sustainable Living Campaign",
      asset: "Video Advertisement",
      timestamp: "10 hours ago",
      status: "generated",
    },
    {
      id: 2,
      campaign: "Tech Product Launch",
      asset: "Landing Page",
      timestamp: "1 day ago",
      status: "generated",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[420px] overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <h4 className="font-medium text-sm text-balance">{activity.campaign}</h4>
              <Badge variant={activity.status === "completed" ? "default" : "secondary"}>{activity.status}</Badge>
            </div>

            <div className="space-y-2 text-sm">
              
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Asset:</span>
                <span className="font-medium">{activity.asset}</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
