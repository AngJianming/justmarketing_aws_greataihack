"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Play,
  Pause,
  Download,
  Share2,
  AlertTriangle,
  MessageCircle,
  RefreshCw,
  Star,
  BookText,
  Clock,
  Award,
} from "lucide-react"
import Link from "next/link"

export function TranslationResultsStep({ data, onBackToUpload }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-muted-foreground">Loading translation results...</p>
      </div>
    )
  }

  /**
   * Converts an S3 URI (s3://bucket/key) to a public HTTPS URL.
   * NOTE: This only works if the S3 objects are publicly accessible.
   * The recommended production approach is for the backend to provide a pre-signed URL.
   * @param {string} s3Uri The S3 URI.
   * @returns {string} The HTTPS URL.
   */
  const convertS3UriToHttpsUrl = (s3Uri) => {
    if (!s3Uri || !s3Uri.startsWith("s3://")) {
      return s3Uri; // Return as-is if not a valid S3 URI or already a URL
    }
    const bucketAndKey = s3Uri.substring(5);
    const [bucket, ...keyParts] = bucketAndKey.split("/");
    const key = keyParts.join("/");
    const region = "us-east-1"; // This should match your S3 bucket's region from app.py
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null)

  const languageLabels = {
    en: "English",
    es: "Spanish",
    zh: "中文 (Mandarin)",
    "zh-HK": "廣東話 (Cantonese)",
  };
  
  const localTranslators = [
    {
      name: "Ahmad Rahman",
      language: "Bahasa Malaysia",
      rating: 4.9,
      reviews: 127,
      speciality: "Marketing & Advertising",
      price: "RM 50",
      available: true,
      responseTime: "< 1 hour",
      completedProjects: 89,
    },
    {
      name: "Li Wei Chen",
      language: "Chinese (Mandarin)",
      rating: 4.8,
      reviews: 89,
      speciality: "Business Translation",
      price: "RM 45",
      available: true,
      responseTime: "< 2 hours",
      completedProjects: 156,
    },
    {
      name: "Priya Devi",
      language: "Tamil",
      rating: 4.9,
      reviews: 156,
      speciality: "Cultural Adaptation",
      price: "RM 40",
      available: false,
      responseTime: "< 3 hours",
      completedProjects: 203,
    },
  ]

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

  const handleContactTranslator = (translatorName) => {
    alert(`Contacting ${translatorName}...`)
  }

  const handleDownload = () => {
    const url = convertS3UriToHttpsUrl(data.translatedVideo);
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      link.setAttribute("download", fileName || "translated-video.mp4");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const TranslatorCard = ({ translator, onContact }) => {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {translator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{translator.name}</h4>
                <p className="text-sm text-muted-foreground">{translator.language}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{translator.rating}</span>
              <span className="text-xs text-muted-foreground">({translator.reviews})</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {translator.speciality}
              </Badge>
              {translator.available ? (
                <Badge className="bg-green-100 text-green-700 border-green-200">Available</Badge>
              ) : (
                <Badge variant="secondary">Busy</Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{translator.responseTime || "< 2 hours"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{translator.completedProjects || 50}+ projects</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">{translator.price}</span>
              <span className="text-sm text-muted-foreground">per hour</span>
            </div>
          </div>

          <Button
            size="sm"
            className="w-full"
            disabled={!translator.available}
            onClick={() => onContact(translator.name)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {translator.available ? "Contact Translator" : "Currently Unavailable"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBackToUpload} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Upload
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Translation Complete</h1>
                <p className="text-sm text-muted-foreground">Translated to {languageLabels[data.targetLanguage] || data.targetLanguage}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                Ready for Review
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Translated Video */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Translated Video</span>
                  <Badge variant="outline">{languageLabels[data.targetLanguage] || data.targetLanguage}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden bg-black mb-4">
                  <video
                    ref={videoRef}
                    src={convertS3UriToHttpsUrl(data.translatedVideo)}
                    className="w-full h-64 object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <button
                    onClick={togglePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-16 h-16 text-white" /> : <Play className="w-16 h-16 text-white" />}
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Re-translate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transcript & Translation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookText className="w-5 h-5" />
                  Transcript & Translation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">Original Transcript</h3>
                    <div className="p-3 rounded-md bg-muted/50 max-h-48 overflow-y-auto">
                      <p className="text-sm text-muted-foreground">{data.transcript}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">AI Translation</h3>
                    <div className="p-3 rounded-md bg-muted/50 max-h-48 overflow-y-auto">
                      <p className="text-sm text-muted-foreground">{data.translation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Translation Analysis & Translators */}
          <div className="space-y-6">
            {/* Translation Analysis Card */}
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="w-5 h-5" />
                  Translation Analysis
                </CardTitle>
                <p className="text-sm text-orange-700">
                  These elements may need attention from local translators for better cultural adaptation
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.translationAnalysis?.potential_issues?.length > 0 ? (
                    data.translationAnalysis.potential_issues.map((issue, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-orange-200">
                        <Badge variant="secondary" className="mb-2">
                          {issue.category}
                        </Badge>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong className="text-foreground">Original:</strong>{" "}
                            <span className="text-muted-foreground">{issue.original_phrase}</span>
                          </p>
                          <p>
                            <strong className="text-foreground">Translation:</strong>{" "}
                            <span className="text-muted-foreground">{issue.translated_phrase}</span>
                          </p>
                          <p className="pt-1 text-xs text-orange-900">
                            <strong>Explanation:</strong> {issue.explanation}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center p-4">
                      No potential issues were detected.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Local Translators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Connect with Local Translators
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Get professional help from verified Malaysian translators
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {localTranslators.map((translator, index) => (
                    <TranslatorCard key={index} translator={translator} onContact={handleContactTranslator} />
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Need help finding the right translator?{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Contact our support team
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
