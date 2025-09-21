"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, ImageIcon, Palette, Sparkles, Loader2 } from "lucide-react"

export function StepThree({ formData, insightData, onNext, onPrevious }) {
  const [selectedElements, setSelectedElements] = useState([])
  const [showDesignOptions, setShowDesignOptions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const posterElements = [
    "Pastel gradient background",
    'Bold slang tagline: "Jom Glow!"',
    "Trendy emojis 🌸✨",
    "Product placement in center",
    "Cultural motifs",
    "Local landmarks silhouette",
  ]

  const videoCoverElements = [
    "Bright neon border",
    'Text overlay: "Can or not? 🤔"',
    "Trending TikTok sticker",
    "Influencer thumbnail",
    "Product showcase",
    "Call-to-action button",
  ]

  const handleElementToggle = (element) => {
    setSelectedElements((prev) =>
      prev.includes(element) ? prev.filter((e) => e !== element) : [...prev, element]
    )
  }

  const handleGenerateDesign = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2500)) // mock AI loading
    setIsGenerating(false)
    setShowDesignOptions(true)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Step intro */}
      {!showDesignOptions ? (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="text-2xl">AI Design Assistance</CardTitle>
            <CardDescription>
              Do you want AI to generate suggested elements for your poster and video cover page?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4 mt-6 py-8">
            <Button
              onClick={handleGenerateDesign}
              className="bg-primary hover:bg-primary/90"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Yes, Generate Designs"
              )}
            </Button>
            <Button variant="outline" onClick={onNext}>
              No, Skip Design
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Poster + Video Cover Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Poster Elements */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Poster Elements</CardTitle>
                </div>
                <CardDescription>Choose elements for your poster design</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {posterElements.map((element, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedElements.includes(element)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleElementToggle(element)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{element}</span>
                        {selectedElements.includes(element) && (
                          <Badge variant="default" className="text-xs">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock Poster Preview */}
                <div className="mt-6 p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg border-2 border-dashed border-primary/30">
                  <div className="text-center space-y-2">
                    <div className="text-2xl">🌸✨</div>
                    <div className="font-bold text-lg text-purple-600">Jom Glow!</div>
                    <div className="w-16 h-16 bg-white rounded-lg mx-auto flex items-center justify-center">
                      <span className="text-xs text-gray-500">Product</span>
                    </div>
                    <div className="text-sm text-purple-500">Preview</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Cover Elements */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg">Video Cover Elements</CardTitle>
                </div>
                <CardDescription>Choose elements for your video covers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {videoCoverElements.map((element, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedElements.includes(element)
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                      onClick={() => handleElementToggle(element)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{element}</span>
                        {selectedElements.includes(element) && (
                          <Badge variant="secondary" className="text-xs">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock Video Cover Preview */}
                <div className="mt-6 p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg border-2 border-dashed border-accent/30 relative">
                  <div className="absolute top-2 left-2 right-2 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded"></div>
                  <div className="text-center space-y-2 mt-4">
                    <div className="text-lg font-bold text-orange-600">Can or not? 🤔</div>
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto"></div>
                    <div className="text-sm text-orange-500">Video Preview</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Elements Summary */}
          {selectedElements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Design Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedElements.map((element, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {element}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onNext}>
                Skip Design
              </Button>
              <Button onClick={onNext} className="bg-primary hover:bg-primary/90">
                Continue to Timeline <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

