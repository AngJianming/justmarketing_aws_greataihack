"use client"

import { useState } from "react"
import { VideoUploadStep } from "@/components/translatepage/VideoUploadStep"
import { TranslationResultsStep } from "@/components/translatepage/TranslationResultStep"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState("upload")
  const [translationData, setTranslationData] = useState(null)

  const handleTranslationComplete = (data) => {
    setTranslationData(data)
    setCurrentStep("results")
  }

  const handleBackToUpload = () => {
    setCurrentStep("upload")
    setTranslationData(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {currentStep === "upload" && <VideoUploadStep onTranslationComplete={handleTranslationComplete} />}
      {currentStep === "results" && translationData && (
        <TranslationResultsStep data={translationData} onBackToUpload={handleBackToUpload} />
      )}
    </main>
  )
}
