import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Palette, Video } from "lucide-react"

export function MalaysiaTrendPulse() {
  const trends = [
    {
      icon: TrendingUp,
      category: "Trending Slang",
      items: ["Bestie", "Slay", "No cap", "Periodt"],
    },
    {
      icon: Palette,
      category: "Popular Colors",
      items: ["Sage Green", "Coral Pink", "Midnight Blue", "Warm Beige"],
    },
    {
      icon: Video,
      category: "TikTok Templates",
      items: ["Get Ready With Me", "Day in My Life", "Recipe Reveal", "Outfit Check"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Malaysia Trend Pulse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <trend.icon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">{trend.category}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {trend.items.map((item, itemIndex) => (
                <Badge key={itemIndex} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
