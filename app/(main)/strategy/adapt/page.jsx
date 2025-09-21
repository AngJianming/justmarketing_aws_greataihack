"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Download, Printer, Sparkles, Target, Clock, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"



export default function MarketingStrategyTool() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [formData, setFormData] = useState({
    region: "",
    culture: "",
    targetAudience: "",
    seasonality: "",
  })
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleAdaptStrategy = async () => {
    setIsAnalyzing(true)
    setCurrentStep(2)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis results
    const mockResult= {
      fixes: [
        {
          id: "1",
          title: "Cultural Sensitivity Issues",
          description: "Marketing copy contains references that may not resonate with Malaysian cultural values",
          priority: "high",
          category: "Cultural Adaptation",
        },
        {
          id: "2",
          title: "Language Localization",
          description: "Content needs translation to Bahasa Malaysia and Chinese for broader reach",
          priority: "high",
          category: "Language",
        },
        {
          id: "3",
          title: "Pricing Strategy",
          description: "Current pricing model not aligned with Malaysian market purchasing power",
          priority: "medium",
          category: "Pricing",
        },
      ],
      suggestions: [
        {
          id: "1",
          title: "Festival-Based Campaigns",
          description: "Leverage major Malaysian festivals like Hari Raya, Chinese New Year, and Deepavali",
          impact: "High",
          effort: "Medium",
        },
        {
          id: "2",
          title: "Local Influencer Partnerships",
          description: "Partner with Malaysian KOLs and micro-influencers for authentic reach",
          impact: "High",
          effort: "Low",
        },
        {
          id: "3",
          title: "Regional Customization",
          description: "Tailor messaging for different states and urban vs rural audiences",
          impact: "Medium",
          effort: "High",
        },
      ],
      timeline: {
        immediate: ["Update cultural references", "Translate key materials", "Adjust pricing display"],
        shortTerm: ["Launch festival campaigns", "Partner with local influencers", "A/B test regional messaging"],
        longTerm: [
          "Establish local brand presence",
          "Build community partnerships",
          "Develop Malaysia-specific products",
        ],
      },
    }

    setAnalysisResult(mockResult)
    setIsAnalyzing(false)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(analysisResult, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "malaysia-marketing-analysis.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handlePrint = () => {
    window.print()
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-foreground">Malaysia Marketing Adapter</h1>
              </div>
              <Badge variant="secondary" className="text-xs">
                Step 1 of 2
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-balance mb-4">Adapt Your Marketing Strategy for Malaysia</h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Upload your marketing documents and get AI-powered insights to optimize your strategy for the Malaysian
                market
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* File Upload Section */}
              <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Marketing Document
                  </CardTitle>
                  <CardDescription>
                    Upload your marketing strategy, campaign materials, or brand guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, TXT (MAX. 10MB)</p>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    {uploadedFile && (
                      <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{uploadedFile.name}</span>
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Form Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Targeting Details</CardTitle>
                  <CardDescription>Specify your target market parameters for Malaysia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region in Malaysia</Label>
                    <Input
                      id="region"
                      placeholder="e.g., Kuala Lumpur, Selangor, Penang"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="culture">Cultural Focus</Label>
                    <Select
                      value={formData.culture}
                      onValueChange={(value) => setFormData({ ...formData, culture: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cultural focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cultures</SelectItem>
                        <SelectItem value="malay">Malay</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Textarea
                      id="audience"
                      placeholder="Describe your target audience demographics, interests, and behaviors"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seasonality">Seasonality/Occasions</Label>
                    <Input
                      id="seasonality"
                      placeholder="e.g., Hari Raya, Chinese New Year, Year-end sales"
                      value={formData.seasonality}
                      onChange={(e) => setFormData({ ...formData, seasonality: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Button */}
            <div className="flex justify-center mt-12">
              <Button
                size="lg"
                className="gradient-bg text-white hover:opacity-90 transition-opacity px-8 py-3 text-lg"
                onClick={handleAdaptStrategy}
                disabled={!uploadedFile || !formData.region || !formData.culture}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Adapt Strategy with AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 2 && isAnalyzing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full gradient-bg ai-loading flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Analyzing Your Marketing Strategy</h2>
            <p className="text-muted-foreground">Our AI is adapting your content for the Malaysian market...</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">Malaysia Marketing Adapter</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                Analysis Complete
              </Badge>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Results Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-3xl font-bold">Strategy Analysis Complete</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Here's your personalized adaptation plan for the Malaysian market
            </p>
          </div>

          {/* Fixes Identified */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" />
                Issues Identified ({analysisResult?.fixes.length})
              </CardTitle>
              <CardDescription>Critical areas that need attention for Malaysian market success</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {analysisResult?.fixes.map((fix) => (
                  <div key={fix.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{fix.title}</h3>
                      <Badge className={getPriorityColor(fix.priority)}>{fix.priority} priority</Badge>
                    </div>
                    <p className="text-muted-foreground">{fix.description}</p>
                    <Badge variant="outline" className="w-fit">
                      {fix.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Optimization Suggestions ({analysisResult?.suggestions.length})
              </CardTitle>
              <CardDescription>Recommended improvements to maximize your Malaysian market impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {analysisResult?.suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-4 border border-border rounded-lg space-y-3">
                    <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                    <p className="text-muted-foreground">{suggestion.description}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Impact: {suggestion.impact}</Badge>
                      <Badge variant="outline">Effort: {suggestion.effort}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Implementation Timeline
              </CardTitle>
              <CardDescription>Recommended phased approach for implementing changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    Immediate (0-2 weeks)
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult?.timeline.immediate.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    Short-term (2-8 weeks)
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult?.timeline.shortTerm.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Long-term (2-6 months)
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult?.timeline.longTerm.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentStep(1)
                setAnalysisResult(null)
                setUploadedFile(null)
                setFormData({ region: "", culture: "", targetAudience: "", seasonality: "" })
              }}
            >
              Start New Analysis
            </Button>
            <Button className="gradient-bg text-white hover:opacity-90" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
