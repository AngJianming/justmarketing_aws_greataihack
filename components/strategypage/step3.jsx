"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Palette, Sparkles, Loader2 } from "lucide-react"

export function StepThree({ formData, insightData, onNext, onPrevious }) {
  const [selectedElements, setSelectedElements] = useState([])
  const [showDesignOptions, setShowDesignOptions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isProcessingImages, setIsProcessingImages] = useState(false)
  const [processMessage, setProcessMessage] = useState("")
  const [displayImages, setDisplayImages] = useState([]) // Only public folder images
  const [imagesLoaded, setImagesLoaded] = useState(false) // Flag to show images only after loading

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
    await new Promise((resolve) => setTimeout(resolve, 2500)) // simulate AI generation
    setIsGenerating(false)
    setShowDesignOptions(true)
  }

  const handleProcessImages = () => {
    setIsProcessingImages(true)
    setProcessMessage("🎨 Generating suitable images for your poster and video elements...")

    // Reset previous images
    setDisplayImages([])
    setImagesLoaded(false)

    // Simulate AI processing time (4 seconds)
    setTimeout(() => {
      try {
        const publicImages = []
        for (let i = 1; i <= 5; i++) {
          publicImages.push(`/element_${i}_nobg.png`)
        }

        setDisplayImages(publicImages)
        setProcessMessage("✅ Images generated successfully!")
        setImagesLoaded(true) // Only now display the images
      } catch (err) {
        console.error(err)
        setProcessMessage("❌ Failed to generate images from public folder.")
      } finally {
        setIsProcessingImages(false)
      }
    }, 3500) // 4 seconds delay
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {!showDesignOptions ? (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="text-2xl">AI Design Assistance</CardTitle>
            <CardDescription>
              Do you want AI to generate suggested elements for your poster and video cover page?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4 mt-6 py-8">
            <Button onClick={handleGenerateDesign} className="bg-primary hover:bg-primary/90" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Yes, Generate Designs"
              )}
            </Button>
            <Button variant="outline" onClick={onNext}>No, Skip Design</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Poster + Video Cover Selection */}
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
                {posterElements.map((element, i) => (
                  <div
                    key={i}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedElements.includes(element) ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleElementToggle(element)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{element}</span>
                      {selectedElements.includes(element) && <Badge variant="default" className="text-xs">Selected</Badge>}
                    </div>
                  </div>
                ))}
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
                {videoCoverElements.map((element, i) => (
                  <div
                    key={i}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedElements.includes(element) ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                    }`}
                    onClick={() => handleElementToggle(element)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{element}</span>
                      {selectedElements.includes(element) && <Badge variant="secondary" className="text-xs">Selected</Badge>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Selected Elements */}
          {selectedElements.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Selected Design Elements</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedElements.map((el, i) => <Badge key={i} variant="outline" className="text-sm">{el}</Badge>)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generate Images Button */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button onClick={handleProcessImages} className="bg-primary hover:bg-primary/90" disabled={isProcessingImages}>
              {isProcessingImages ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Images & Video Elements"}
            </Button>
            {processMessage && <p className="text-sm text-center">{processMessage}</p>}
          </div>

          {/* Display only 5 public folder images after loading */}
          {imagesLoaded && displayImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-6">
              {displayImages.map((imgUrl, idx) => (
                <div key={idx} className="border rounded overflow-hidden">
                  <img src={imgUrl} alt={`Element ${idx + 1}`} className="w-full h-[500px] object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
            <Button onClick={onNext} className="bg-primary hover:bg-primary/90">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </>
      )}
    </div>
  )
}
