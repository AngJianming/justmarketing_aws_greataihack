"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

// direct from lucide-react component
import {
  Globe,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
  FileText,
  Languages,
  Target,
  Zap,
  MapPin,
  Users,
  Upload,
  Download,
  Clock,
  ImageIcon,
} from "lucide-react"

export default function AIChecker() {
  const [content, setContent] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("Malay")
  const [targetRegion, setTargetRegion] = useState("West Malaysia")
  const [targetRace, setTargetRace] = useState("Malay")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [bedrockStatus, setBedrockStatus] = useState(null) // Added bedrock status tracking
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("import") // Changed tab order: import, result, output
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)

  const languages = ["Malaysia", "Chinese", "Tamil", "English"]

  const regions = ["West Malaysia", "East Malaysia", "Singapore", "Indonesia", "Thailand", "Philippines"]

  const races = ["Malay", "Chinese", "Indian", "Mixed"]

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setContent("") // Clear any pasted text to avoid confusion
    setAnalysisResult(null)
    setBedrockStatus(null)
    // Do not switch tabs, stay on 'import'

    if (file.type.startsWith("text/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setContent(e.target.result)
      }
      reader.readAsText(file)
    }
    // For image/video, we just store the file object. Analysis will happen on button click.
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    // Reuse the file upload logic by creating a synthetic event
    const syntheticEvent = { target: { files: event.dataTransfer.files } }
    handleFileUpload(syntheticEvent)
  }

  const handleAnalyzeContent = async () => {
    if ((!content.trim() && !uploadedFile) || isAnalyzing || !targetRegion) {
      if (!targetRegion) alert("Please select a target region.")
      else alert("Please enter text or upload a file to analyze.")
      return
    }
    setIsAnalyzing(true)
    setProgress(0)
    setActiveTab("result")
    setBedrockStatus("PROCESSING")
    setAnalysisResult(null)

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev))
    }, 500)

    try {
      let apiResult

      // Map frontend region names to a country name that the Bedrock flow expects.
      let countryForApi = targetRegion
      if (targetRegion === "West Malaysia" || targetRegion === "East Malaysia") {
        countryForApi = "Malaysia"
      }

      if (uploadedFile && (uploadedFile.type.startsWith("image/") || uploadedFile.type.startsWith("video/"))) {
        // Handle Image or Video File
        const file = uploadedFile
        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
        })

        if (file.type.startsWith("video/")) {
          const response = await fetch("http://127.0.0.1:8000/speech-to-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              video_base64: base64Data,
              filename: file.name,
              use_bedrock: true,
              // Note: The video endpoint does not currently accept a country parameter.
              // The analysis will use the backend's default.
            }),
          })
          apiResult = await response.json()
          if (apiResult.success) {
            setContent(apiResult.text)
            const analysis = apiResult.bedrock_analysis?.flow_outputs?.[0]?.content?.document
            setAnalysisResult({ ...apiResult, analysis_result: analysis })
          }
        } else {
          // Image
          const response = await fetch("http://127.0.0.1:8000/image-analysis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image_base64: base64Data.split(",")[1],
              image_format: file.type.split("/")[1],
              country: countryForApi,
            }),
          })
          apiResult = await response.json()
          if (apiResult.success) {
            setContent(apiResult.image_description)
            setAnalysisResult(apiResult)
          }
        }
      } else if (content.trim()) {
        // Handle Text (from file or pasted)
        const response = await fetch("http://127.0.0.1:8000/text-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text_content: content,
            country: countryForApi,
          }),
        })
        apiResult = await response.json()
        if (apiResult.success) {
          setAnalysisResult(apiResult)
        }
      } else {
        throw new Error("No content to analyze.")
      }

      if (apiResult?.success) {
        setBedrockStatus("SUCCESS")
      } else {
        setBedrockStatus("FAILED")
        console.error("Analysis failed:", apiResult?.error || "Unknown error")
      }
    } catch (error) {
      console.error("API call failed:", error)
      setBedrockStatus("FAILED")
    } finally {
      clearInterval(progressInterval)
      setProgress(100)
      setIsAnalyzing(false)
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "default"
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <XCircle className="h-4 w-4" />
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">AI Content Checker</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Check if your marketing content is culturally appropriate and relevant to Malaysia.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="inline-flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab("import")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "import"
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
            <button
              onClick={() => setActiveTab("result")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "result"
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              <Target className="h-4 w-4" />
              Result
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "output"
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              Output
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === "import" && (
            <div className="space-y-6">
              {/* Upload Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Upload Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-slate-400 dark:hover:border-slate-500 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      Drag and drop your content here
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Supports JPEG, PNG images and MP4, MPEG-4 videos
                    </p>
                    <Button variant="outline" size="lg">
                      Browse Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      accept=".jpg,.jpeg,.png,.mp4,.mpeg,.txt,.doc,.docx"
                      className="hidden"
                    />
                  </div>
                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-700 dark:text-green-300">✓ File uploaded: {uploadedFile.name}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Target Region */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Target Region
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <select
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value)}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="">Select target region for analysis</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </CardContent>
              </Card>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Languages className="h-4 w-4" />
                      Target Language
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      Target Audience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select
                      value={targetRace}
                      onChange={(e) => setTargetRace(e.target.value)}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {races.map((race) => (
                        <option key={race} value={race}>
                          {race}
                        </option>
                      ))}
                    </select>
                  </CardContent>
                </Card>
              </div>

              {/* Analyze Button */}
              <div className="text-center">
                <Button
                  onClick={handleAnalyzeContent}
                  disabled={(!content.trim() && !uploadedFile) || isAnalyzing || !targetRegion}
                  size="lg"
                  className="px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {activeTab === "result" && (
            <div className="space-y-6">
              {isAnalyzing && (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center space-y-4">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                      <div className="space-y-2">
                        <Progress value={progress} className="w-full max-w-md mx-auto" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {progress < 20 && "Analyzing content structure..."}
                          {progress >= 20 && progress < 40 && "Checking cultural context..."}
                          {progress >= 40 && progress < 60 && "Identifying localization challenges..."}
                          {progress >= 60 && progress < 80 && "Generating recommendations..."}
                          {progress >= 80 && "Analysis complete!"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {bedrockStatus && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Bedrock Analysis Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      {bedrockStatus === "PROCESSING" && <Loader2 className="h-4 w-4 animate-spin" />}
                      {bedrockStatus === "SUCCESS" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {bedrockStatus === "FAILED" && <XCircle className="h-4 w-4 text-red-600" />}
                      <Badge
                        variant={
                          bedrockStatus === "SUCCESS"
                            ? "default"
                            : bedrockStatus === "FAILED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {bedrockStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysisResult ? (
                <>
                  {analysisResult.image_description && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ImageIcon className="h-5 w-5" />
                          Image Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{analysisResult.image_description}</p>
                      </CardContent>
                    </Card>
                  )}

                  {analysisResult.text && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Transcribed Text
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{analysisResult.text}</p>
                      </CardContent>
                    </Card>
                  )}

                  {analysisResult.processing_time && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Processing Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            {analysisResult.processing_time?.toFixed(2)}s
                          </Badge>
                          <span className="text-sm text-slate-600 dark:text-slate-400">Total processing time</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing analysis result cards */}
                  {analysisResult.analysis_result && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Relevancy Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Relevancy Score</span>
                            <Badge variant="outline" className="text-lg px-3 py-1">
                              {analysisResult.analysis_result.relevancy.SCORE}/100
                            </Badge>
                          </div>
                          <Progress value={analysisResult.analysis_result.relevancy.SCORE} className="w-full" />

                          <div className="space-y-2">
                            <h4 className="font-medium">Relevant Terms:</h4>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.analysis_result.relevancy.relevancy_indicator.map((indicator, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {indicator}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Explanation:</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {analysisResult.analysis_result.relevancy.explanation}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Suggestion:</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {analysisResult.analysis_result.relevancy.suggestion}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Appropriateness Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Risk Level</span>
                            <Badge variant={getRiskColor(analysisResult.analysis_result.appropriateness.RISK)}>
                              {analysisResult.analysis_result.appropriateness.RISK}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Appropriateness Score</span>
                            <Badge variant="outline" className="text-lg px-3 py-1">
                              {analysisResult.analysis_result.appropriateness.SCORE}/100
                            </Badge>
                          </div>
                          <Progress value={analysisResult.analysis_result.appropriateness.SCORE} className="w-full" />

                          {analysisResult.analysis_result.appropriateness.high_risk_indicator.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-red-600 dark:text-red-400">Potentially Sensitive Terms:</h4>
                              <div className="flex flex-wrap gap-2">
                                {analysisResult.analysis_result.appropriateness.high_risk_indicator.map(
                                  (indicator, index) => (
                                    <Badge key={index} variant="destructive" className="text-xs font-semibold">
                                      ⚠️ {indicator}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <h4 className="font-medium">Explanation:</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {analysisResult.analysis_result.appropriateness.explanation}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Suggestion:</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {analysisResult.analysis_result.appropriateness.suggestion}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </>
              ) : !isAnalyzing ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Globe className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Ready to Analyze</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Upload your content and select a target region to get started with the analysis.
                    </p>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          )}

          {activeTab === "output" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Preview
                </CardTitle>
                <CardDescription>Review your content before analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Your content will appear here... You can also paste or edit content directly."
                  className="min-h-[400px] resize-none"
                />
                <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                  <span>{content.length} characters</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
