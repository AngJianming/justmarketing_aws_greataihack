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
  Clock,
  Award,
} from "lucide-react"
import Link from "next/link"


export function TranslationResultsStep({ data, onBackToUpload }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const languageLabels = {
    english: "English",
    malay: "Bahasa Malaysia",
    chinese: "中文 (Chinese)",
    tamil: "தமிழ் (Tamil)",
  }

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
    // In a real app, this would open a contact modal or redirect to messaging
    alert(`Contacting ${translatorName}...`)
  }

  const TranslatorCard = ({
    translator,
    onContact,
  }) => {
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
                <p className="text-sm text-muted-foreground">Translated to {languageLabels[data.targetLanguage]}</p>
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
                  <Badge variant="outline">{languageLabels[data.targetLanguage]}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden bg-black mb-4">
                  <video
                    ref={videoRef}
                    src={data.translatedVideo}
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
                  <Button className="flex-1" size="sm">
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

            {/* Translation Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Translation Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Accuracy Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-[92%] h-full bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cultural Adaptation</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-[88%] h-full bg-blue-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Lip Sync Quality</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-orange-500 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Words to Notice & Translators */}
          <div className="space-y-6">
            {/* Words to be Noticed Card */}
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="w-5 h-5" />
                  Words to be Noticed
                </CardTitle>
                <p className="text-sm text-orange-700">
                  These elements may need attention from local translators for better cultural adaptation
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.wordsToNotice.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-200"
                    >
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Local Translators Card */}
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
