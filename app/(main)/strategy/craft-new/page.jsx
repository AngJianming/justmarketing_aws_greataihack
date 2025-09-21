"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { StepOne } from "@/components/strategypage/step1"
import { StepIndicator } from "@/components/strategypage/stepindictor"
import { StepTwo } from "@/components/strategypage/step2"
import { StepThree } from "@/components/strategypage/step3"
import { StepFour } from "@/components/strategypage/step4"
import { StepFive } from "@/components/strategypage/step5"

export function MarketingStrategyCrafter() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    product: "",
    region: "",
    targetedCulture: [],
    audience: "",
    goal: "",
    duration: "",
    seasonality: [],
    budget: "",
    platforms: [],
  })
  const [insightData, setInsightData] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const totalSteps = 5
  const stepTitles = ["Campaign Foundation", "AI Insights", "Visual Design", "Timeline", "Export"]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGenerateInsights = async () => {
    setIsGenerating(true)
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock AI-generated insights based on form data
    const mockInsights= {
      hashtags: ["#OOTD", "#OnzLah", "#CunLook", "#MalaysiaStyle", "#TrendingMY"],
      contentType: "Short TikTok challenge + IG Story stickers",
      tone: "Fun, playful, pastel",
      strategy: `Target ${formData.targetedCulture.join(" & ")} communities in ${formData.region} with ${formData.goal.toLowerCase()} focused campaigns during ${formData.seasonality.join(" & ")} seasons.`,
    }

    setInsightData(mockInsights)
    setIsGenerating(false)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne formData={formData} setFormData={setFormData} onNext={handleNext} />
      case 2:
        return (
          <StepTwo
            formData={formData}
            insightData={insightData}
            isGenerating={isGenerating}
            onGenerate={handleGenerateInsights}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <StepThree formData={formData} insightData={insightData} onNext={handleNext} onPrevious={handlePrevious} />
        )
      case 4:
        return (
          <StepFour formData={formData} insightData={insightData} onNext={handleNext} onPrevious={handlePrevious} />
        )
      case 5:
        return <StepFive formData={formData} insightData={insightData} onPrevious={handlePrevious} />
      default:
        return null
    }
  }

  return (
    <div className="marketing-strategy-bg min-h-screen pt-16 pb-4">
      <div className="container mx-auto py-8 max-w-6xl px-5 ">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Marketing Strategy Crafter
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {"Create data-driven marketing strategies tailored for Malaysian audiences with AI-powered insights"}
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitles={stepTitles} />

        {/* Step Content */}
        <div className="animate-slide-up">{renderStep()}</div>
      </div>
    </div>
  )
}

export default MarketingStrategyCrafter

