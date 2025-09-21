import { Card, CardContent } from "@/components/ui/card"
import { Shield, Brain, Palette, Languages } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "AI Cultural Checker",
      description: "Ensure your marketing content is culturally appropriate and sensitive across all demographics",
      color: "text-emerald-400",
      bgGradient: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      borderGradient: "border-emerald-500/30",
    },
    {
      icon: Brain,
      title: "Marketing Crafter AI",
      description: "Generate compelling marketing copy that converts, tailored to your brand voice and audience",
      color: "text-purple-400",
      bgGradient: "bg-gradient-to-br from-purple-500/20 to-violet-500/20",
      borderGradient: "border-purple-500/30",
    },
    {
      icon: Palette,
      title: "AI Character Masking",
      description: "Seamlessly swap and customize characters in your visual content with advanced AI technology",
      color: "text-pink-400",
      bgGradient: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
      borderGradient: "border-pink-500/30",
    },
    {
      icon: Languages,
      title: "AI Translation Engine",
      description: "Translate your marketing materials into 100+ languages while maintaining cultural context",
      color: "text-cyan-400",
      bgGradient: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
      borderGradient: "border-cyan-500/30",
    },
  ]

  return (
    <section id="features" className="px-6 lg:px-8 py-32 bg-gradient-to-b from-slate-900 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance text-white">
            Powerful{" "}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">AI Tools</span>{" "}
            for Modern Marketing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Everything you need to create, optimize, and scale your marketing content across cultures and languages.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:scale-105 transition-all duration-300 ${feature.bgGradient} border-2 ${feature.borderGradient} hover:shadow-xl hover:shadow-${feature.color.split("-")[1]}-500/20 bg-gray-800/50 backdrop-blur-sm`}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${feature.bgGradient} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-balance text-white">{feature.title}</h3>
                    <p className="text-gray-300 text-pretty leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
