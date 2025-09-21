import { CheckCircle, Zap, Globe, Users } from "lucide-react"

export function StatsSection() {
  const stats = [
    { value: "99.9%", label: "Cultural Accuracy", icon: CheckCircle },
    { value: "10x", label: "Faster Content Creation", icon: Zap },
    { value: "3+", label: "Languages Supported", icon: Globe },
    { value: "50K+", label: "Happy Marketers", icon: Users },
  ]

  return (
    <section className="px-6 lg:px-8 py-10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-purple-300/20 transition-colors">
                <stat.icon className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-5xl font-bold text-purple-600 mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-pretty">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
