"use client"

import { Download, RotateCcw, Share2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export function ResultStep({ selectedVideo, uploadedVideo, customizations, onStartOver }) {
  const handleDownload = () => {
    // Simulate download
    const link = document.createElement("a")
    link.href = "/placeholder.mp4"
    link.download = "adapted-trend-video.mp4"
    link.click()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Your Adapted Video is Ready!</h2>
        <p className="text-muted-foreground text-lg">
          Your product has been successfully integrated with the Malaysian TikTok trend
        </p>
      </div>

      {/* Result Video */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Final Result</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownload} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-[9/16] max-w-sm mx-auto bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
            <div className="text-center z-10">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <p className="text-foreground font-medium">Adapted Trend Video</p>
              <p className="text-sm text-muted-foreground">Ready for download</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">0:30</div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Original Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Malaysian Food Challenge Trend</p>
            <p className="text-xs text-muted-foreground mt-1">2.3M views • Viral format</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{uploadedVideo?.name || "Product video"}</p>
            <p className="text-xs text-muted-foreground mt-1">{customizations.images.length} images • Custom prompts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Final Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Trend-adapted promotional video</p>
            <p className="text-xs text-muted-foreground mt-1">Ready for TikTok & social media</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleDownload} size="lg" className="px-8">
          <Download className="w-5 h-5 mr-2" />
          Download Video
        </Button>
        <Button variant="outline" onClick={onStartOver} size="lg" className="px-8 bg-transparent">
          <RotateCcw className="w-5 h-5 mr-2" />
          Create Another
        </Button>
      </div>

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-foreground mb-3">Tips for Success:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Post during peak hours (7-9 PM Malaysian time) for maximum engagement</li>
            <li>• Use relevant Malaysian hashtags like #Malaysia #KL #TrendingMY</li>
            <li>• Engage with comments quickly to boost algorithm visibility</li>
            <li>• Consider creating variations for different Malaysian regions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
