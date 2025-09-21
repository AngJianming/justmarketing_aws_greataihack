import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="relative z-50 flex items-center justify-between p-6 lg:px-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center animate-pulse-glow">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-balance text-white">JustMarketing</span>
      </div>
      <div></div>
      <Link href={"/sign-in"}>
      <Button variant="outline" className="border-black/20 hover:text-gray-500 bg-transparent text-white">
        Sign In
      </Button>
      </Link>
    </nav>
  )
}
