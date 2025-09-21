import { Button } from "@/components/ui/button"
import { Bell, Settings, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Welcome Back!</h1>
        <p className="text-lg text-muted-foreground text-pretty">AI-Powered Content Localization for Malaysia</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
