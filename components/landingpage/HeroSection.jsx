"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, Play } from "lucide-react"
import Link from 'next/link';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative px-6 lg:px-8 pt-20 pb-18">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-primary/10 text-white border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by AWS with Advanced AI
          </Badge>

          <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-balance leading-tight text-white">
            The Future of{" "}
           <span
  className="bg-gradient-to-r 
             from-red-500 via-orange-500 via-yellow-500 via-green-500 
             via-blue-500 via-indigo-500 to-purple-500 
             bg-clip-text text-transparent animate-pulse"
>
  AI Marketing with Smart Localizer
</span>{" "}
            is Here
          </h1>

          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
            Create culturally-aware, globally-optimized marketing content with our comprehensive AI toolkit. From
            cultural sensitivity checks to seamless translations relevant to Malaysia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href = '/ai-checker'>
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg hover:bg-purple-600/90 animate-pulse-glow bg-purple-600"
              >
                Get Started Right Away
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10 bg-transparent text-white"
            >
              <Play className="w-5 h-5 mr-2 text-white" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-chart-3/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "4s" }}
      />
    </section>
  )
}
