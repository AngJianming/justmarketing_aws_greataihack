import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CommonPitfalls() {
  const pitfalls = [
    {
      warning: "Whitening term flagged in 40% of skincare ads",
      severity: "high",
    },
    {
      warning: "Religious references causing 25% rejection rate",
      severity: "medium",
    },
    {
      warning: "Color symbolism issues in 15% of campaigns",
      severity: "low",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Common Pitfalls This Week
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {pitfalls.map((pitfall, index) => (
          <Alert key={index} className="border-l-4 border-l-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">⚠️ {pitfall.warning}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
