"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function DashboardAIInsights() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const insights = [
    {
      title: "Ramadan Marketing Surge",
      content:
        "Food delivery campaigns show 300% higher engagement during Ramadan. Focus on family-oriented messaging and halal certifications.",
      trend: "+300%",
    },
    {
      title: "Gen Z Language Evolution",
      content:
        "Malaysian Gen Z increasingly uses English-Malay code-switching. Campaigns with mixed languages perform 45% better.",
      trend: "+45%",
    },
    {
      title: "Sustainable Living Trend",
      content:
        "Eco-friendly messaging resonates strongly with urban Malaysians. Green campaigns see 60% higher click-through rates.",
      trend: "+60%",
    },
    {
      title: "Mobile-First Content",
      content:
        "Vertical video content optimized for mobile gets 4x more shares. TikTok-style formats dominate engagement.",
      trend: "+400%",
    },
  ]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % insights.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying, insights.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % insights.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + insights.length) % insights.length)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Insights - Current Trends in Malaysia 2025
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-32 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {insights.map((insight, index) => (
              <div key={index} className="w-full flex-shrink-0 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{insight.title}</h3>
                  <span className="text-primary font-bold">{insight.trend}</span>
                </div>
                <p className="text-muted-foreground text-pretty leading-relaxed">{insight.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {insights.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
