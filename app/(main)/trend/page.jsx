"use client"

import { useState } from "react"
import { SearchStep } from "@/components/trendpage/SearchStep"
import { UploadStep } from "@/components/trendpage/UploadStep"
import { ResultStep } from "@/components/trendpage/ResultStep"
import { StepIndicator } from "@/components/trendpage/StepIndicator"

export default function VideoTrendAdapter() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [customizations, setCustomizations] = useState({
    prompts: "",
    images: [] ,
  })

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId)
    setCurrentStep(2)
  }

  const handleVideoUpload = (file) => {
    setUploadedVideo(file)
  }

  const handleCustomizationUpdate = (updates) => {
    setCustomizations(updates)
  }

  const handleProcessVideo = () => {
    setCurrentStep(3)
  }

  const resetToStep1 = () => {
    setCurrentStep(1)
    setSelectedVideo(null)
    setUploadedVideo(null)
    setCustomizations({ prompts: "", images: [] })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 pt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Malaysian Trend Adapter for Video</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Transform trending Malaysian TikTok or Youtube videos into powerful product promotions
            </p>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {currentStep === 1 && <SearchStep onVideoSelect={handleVideoSelect} />}

        {currentStep === 2 && (
          <UploadStep
            selectedVideo={selectedVideo}
            onVideoUpload={handleVideoUpload}
            onCustomizationUpdate={handleCustomizationUpdate}
            onProcessVideo={handleProcessVideo}
            customizations={customizations}
          />
        )}

        {currentStep === 3 && (
          <ResultStep
            selectedVideo={selectedVideo}
            uploadedVideo={uploadedVideo}
            customizations={customizations}
            onStartOver={resetToStep1}
          />
        )}
      </main>
    </div>
  )
}
