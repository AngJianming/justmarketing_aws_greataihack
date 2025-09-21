import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director at TechCorp",
      content:
        "This tool revolutionized our global campaigns. The cultural checker saved us from potential PR disasters.",
      rating: 5,
      gradient: "bg-gradient-to-br from-pink-500/10 to-rose-500/10",
      border: "border-pink-500/30",
      accent: "text-pink-400",
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Lead at BrandStudio",
      content: "The AI character masking feature is incredible. We can create diverse content in minutes, not hours.",
      rating: 5,
      gradient: "bg-gradient-to-br from-cyan-500/10 to-blue-500/10",
      border: "border-cyan-500/30",
      accent: "text-cyan-400",
    },
    {
      name: "Aisha Patel",
      role: "Content Manager at StartupX",
      content: "The translation quality is outstanding. Our international engagement increased by 300%.",
      rating: 5,
      gradient: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      border: "border-violet-500/30",
      accent: "text-violet-400",
    },
  ]

  return (
    <section id="testimonials" className="px-6 lg:px-8 py-32 bg-gradient-to-b from-gray-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance text-white">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Marketing Teams
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-xl text-gray-300 text-pretty">
            See how leading brands are transforming their marketing with AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`group hover:scale-105 transition-all duration-300 ${testimonial.gradient} border-2 ${testimonial.border} hover:shadow-xl bg-gray-800/50 backdrop-blur-sm`}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 fill-current ${testimonial.accent}`} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-pretty leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-balance text-white">{testimonial.name}</div>
                  <div className={`text-sm text-pretty ${testimonial.accent}`}>{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
