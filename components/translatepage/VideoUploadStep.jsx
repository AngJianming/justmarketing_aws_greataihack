"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Play, Pause, Languages } from "lucide-react"



export function VideoUploadStep({ onTranslationComplete}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)

  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Spanish", flag: "🇪🇸" },
    { value: "zh", label: "中文 (Mandarin)", flag: "🇨🇳" },
    { value: "zh-HK", label: "廣東話 (Cantonese)", flag: "🇭🇰" },
  ];


  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTranslate = async () => {
    if (!selectedFile || !selectedLanguage) return

    setIsTranslating(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("target_lang", selectedLanguage);

    try {
      const response = await fetch("http://127.0.0.1:8000/localize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Localization failed");
      }

      const jobData = await response.json();
      // Assume jobData has { job_id: "..." }
      const video_id = jobData.video_id;
      if (!video_id) throw new Error("No video ID returned from API");

      // Poll for status
      let status = "in_progress";
      let result = null;
      while (status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds between polls

        const statusRes = await fetch(`http://127.0.0.1:8000/localize/status/${video_id}`);
        if (!statusRes.ok) throw new Error("Failed to get job status");

        const statusData = await statusRes.json();
        status = statusData.status;
        if (status === "completed") {
          result = statusData.result;
        }
      }


      onTranslationComplete({
        originalVideo: videoUrl,
        translatedVideo: result.video_uri, // In real app, this would be the translated video
        targetLanguage: selectedLanguage,
        transcript: result.transcript,
        translation: result.translation,
        translationAnalysis: result.translation_analysis,
      })
    } catch (error) {
      alert("Error: " + error.message)
    } finally {
      setIsTranslating(false)
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">TranslateMY</h1>
                <p className="text-sm text-muted-foreground">Marketing Translation Service</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Step 1 of 2</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Upload Your Marketing Video</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Upload your video advertisement and select the target language for professional translation adapted to
              Malaysian market
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Video File
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="relative min-h-[300px] flex flex-col items-center justify-center p-8 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {!selectedFile ? (
                    <>
                      <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium text-foreground mb-2">Drop your video here</p>
                      <p className="text-sm text-muted-foreground text-center">or click to browse files</p>
                      <p className="text-xs text-muted-foreground mt-2">Supports MP4, MOV, AVI formats</p>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Play className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-medium text-foreground">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preview & Settings */}
            <div className="space-y-6">
              {/* Video Preview */}
              {videoUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Video Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative rounded-lg overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        className="w-full h-48 object-cover"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                      <button
                        onClick={togglePlayPause}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-12 h-12 text-white" />
                        ) : (
                          <Play className="w-12 h-12 text-white" />
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Language Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Target Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose translation language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Translate Button */}
              <Button
                onClick={handleTranslate}
                disabled={!selectedFile || !selectedLanguage || isTranslating}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isTranslating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Translating...
                  </div>
                ) : (
                  "Start Translation"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

