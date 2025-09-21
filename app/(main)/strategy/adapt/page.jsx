"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Download, Printer, Sparkles, Target, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MarketingStrategyTool() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [formData, setFormData] = useState({
    pdf_file_path: "",         // matches FastAPI model
    region_malaysia: "",
    cultural_focus: "",
    target_audience: "",
    seasonality_occasions: "",
  })
  const [analysisResult, setAnalysisResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setFormData({ ...formData, pdf_file_path: file.name }) // just file name/path
    }
  }

  const handleAdaptStrategy = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setCurrentStep(2)
    setErrorMessage("")

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)   // send as JSON
      })

      const result = await response.json()

      if (response.ok) {
        setAnalysisResult(result)
        setCurrentStep(3)
      } else {
        setErrorMessage(result.detail || "Failed to analyze document")
      }
    } catch (err) {
      console.error(err)
      setErrorMessage("Error connecting to analysis server")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleExport = () => {
    if (!analysisResult) return
    const dataStr = JSON.stringify(analysisResult, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", "malaysia-marketing-analysis.json")
    linkElement.click()
  }

  const handlePrint = () => window.print()

  // Step 1: Upload form
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">Malaysia Marketing Adapter</h1>
            </div>
            <Badge variant="secondary" className="text-xs">Step 1 of 2</Badge>
          </div>
        </header>

        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-balance mb-4">Adapt Your Marketing Strategy for Malaysia</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your marketing documents and get AI-powered insights to optimize your strategy for the Malaysian market
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* File Upload */}
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Upload className="w-5 h-5" /> Upload Marketing Document</CardTitle>
                <CardDescription>Upload your marketing strategy, campaign materials, or brand guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
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
                  {uploadedFile && (
                    <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{uploadedFile.name}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</Badge>
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
                    placeholder="e.g., Kuala Lumpur, Selangor"
                    value={formData.region_malaysia}
                    onChange={(e) => setFormData({...formData, region_malaysia: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="culture">Cultural Focus</Label>
                  <Select
                    value={formData.cultural_focus}
                    onValueChange={(value) => setFormData({...formData, cultural_focus: value})}
                  >
                    <SelectTrigger><SelectValue placeholder="Select cultural focus" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cultures</SelectItem>
                      <SelectItem value="malay">Malay</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="iban">Iban</SelectItem>
                      <SelectItem value="kadazan">Kadazan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Textarea
                    id="audience"
                    rows={3}
                    placeholder="Describe your target audience"
                    value={formData.target_audience}
                    onChange={(e) => setFormData({...formData, target_audience: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seasonality">Seasonality/Occasions</Label>
                  <Input
                    id="seasonality"
                    placeholder="e.g., Hari Raya, Chinese New Year"
                    value={formData.seasonality_occasions}
                    onChange={(e) => setFormData({...formData, seasonality_occasions: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}

          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              className="gradient-bg text-white hover:opacity-90 px-8 py-3"
              onClick={handleAdaptStrategy}
              disabled={!uploadedFile || !formData.region_malaysia || !formData.cultural_focus}
            >
              <Sparkles className="w-5 h-5 mr-2" /> Adapt Strategy with AI
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Loading animation
  if (currentStep === 2 && isAnalyzing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full gradient-bg ai-loading flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold">Analyzing Your Marketing Strategy</h2>
          <p className="text-muted-foreground">Our AI is adapting your content for the Malaysian market...</p>
        </div>
      </div>
    )
  }

  // Step 3: Display analysis
  if (currentStep === 3 && analysisResult) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">Malaysia Marketing Adapter</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">Analysis Complete</Badge>
              <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-2" /> Export</Button>
              <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="w-4 h-4 mr-2" /> Print</Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8 max-w-6xl space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-3xl font-bold">Strategy Analysis Complete</h2>
            </div>
            <p className="text-muted-foreground text-lg">Here's your personalized adaptation plan for the Malaysian market</p>
          </div>

          {/* Display analysis results */}
          <Card>
            <CardHeader><CardTitle>Analysis Summary</CardTitle></CardHeader>
            <CardContent>
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{analysisResult.market_analysis}</pre>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => {
              setCurrentStep(1)
              setAnalysisResult(null)
              setUploadedFile(null)
              setFormData({
                pdf_file_path: "",
                region_malaysia: "",
                cultural_focus: "",
                target_audience: "",
                seasonality_occasions: "",
              })
            }}>Start New Analysis</Button>
            <Button className="gradient-bg text-white hover:opacity-90" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" /> Download Full Report
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
