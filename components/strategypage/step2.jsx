"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Sparkles, Hash, MessageSquare, Palette, Target, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"


export function StepTwo({ formData, insightData, isGenerating, onGenerate, onNext, onPrevious }) {
  const [showNextButton, setShowNextButton] = useState(false)

  useEffect(() => {
    if (insightData && !isGenerating) {
      setShowNextButton(true)
    }
  }, [insightData, isGenerating])

  if (!insightData && !isGenerating) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <CardTitle className="text-2xl">AI Strategy Generation</CardTitle>
          </div>
          <CardDescription>
            {"Ready to generate your personalized marketing strategy based on your inputs"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg">
            <div className="space-y-4">
              <div className="text-lg font-medium">Campaign Summary</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Product:</strong> {formData.product}
                </div>
                <div>
                  <strong>Region:</strong> {formData.region}
                </div>
                <div>
                  <strong>Culture:</strong> {formData.targetedCulture.join(", ")}
                </div>
                <div>
                  <strong>Goal:</strong> {formData.goal}
                </div>
                <div>
                  <strong>Duration:</strong> {formData.duration}
                </div>
                <div>
                  <strong>Seasonality:</strong> {formData.seasonality || "Not specified"}
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={onGenerate}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white animate-pulse-glow"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Generate AI Strategy
          </Button>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isGenerating) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="text-center py-16">
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Crafting Your Strategy...</h3>
              <p className="text-muted-foreground">
                {"Our AI is analyzing Malaysian market trends and cultural insights"}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Research & Insights</CardTitle>
          </div>
          <CardDescription>{"AI-generated strategy tailored for your Malaysian market campaign"}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hashtags Card */}
        <Card className="hover:shadow-lg transition-shadow animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Trending Hashtags</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insightData?.hashtags.map((hashtag, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {hashtag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Type Card */}
        <Card className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Content Type</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{insightData?.contentType}</p>
          </CardContent>
        </Card>

        {/* Tone Card */}
        <Card className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-secondary" />
              <CardTitle className="text-lg">Poster/Video Tone</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{insightData?.tone}</p>
          </CardContent>
        </Card>

        {/* Strategy Card */}
        <Card className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Strategy Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{insightData?.strategy}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {showNextButton && (
          <Button onClick={onNext} className="bg-primary hover:bg-primary/90 animate-fade-in">
            Continue to Design <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
