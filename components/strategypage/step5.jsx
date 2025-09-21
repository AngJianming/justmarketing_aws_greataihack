"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share2, FileText, Printer, Mail } from "lucide-react"


export function StepFive({ formData, insightData, onPrevious }) {
  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting strategy as ${format}`)
    // In a real app, this would generate and download the file
  }

  const handleShare = () => {
    // Mock share functionality
    console.log("Sharing strategy")
  }

  const strategySummary = {
    campaignName: `${formData.product} - ${formData.region} Campaign`,
    targetAudience: `${formData.targetedCulture.join(" & ")} communities in ${formData.region}`,
    duration: formData.duration,
    budget: formData.budget || "Not specified",
    platforms: formData.platforms.join(", ") || "Multi-platform",
    hashtags: insightData?.hashtags.join(", ") || "",
    contentType: insightData?.contentType || "",
    tone: insightData?.tone || "",
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Strategy Complete!</CardTitle>
          </div>
          <CardDescription>
            {"Your personalized marketing strategy is ready for export and implementation"}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Strategy Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Campaign Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Campaign Name</label>
                <p className="text-sm mt-1">{strategySummary.campaignName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Target Audience</label>
                <p className="text-sm mt-1">{strategySummary.targetAudience}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Duration</label>
                <p className="text-sm mt-1">{strategySummary.duration}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Budget</label>
                <p className="text-sm mt-1">{strategySummary.budget}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Platforms</label>
                <p className="text-sm mt-1">{strategySummary.platforms}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Recommended Hashtags</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {insightData?.hashtags.map((hashtag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Content Type</label>
                <p className="text-sm mt-1">{strategySummary.contentType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tone & Style</label>
                <p className="text-sm mt-1">{strategySummary.tone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleExport("PDF")}>
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium mb-2">Export as PDF</h3>
            <p className="text-sm text-muted-foreground">Complete strategy document with all details and timelines</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleExport("Print")}>
          <CardContent className="p-6 text-center">
            <Printer className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-medium mb-2">Print Version</h3>
            <p className="text-sm text-muted-foreground">Printer-friendly format for team meetings and presentations</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleShare}>
          <CardContent className="p-6 text-center">
            <Share2 className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="font-medium mb-2">Share Strategy</h3>
            <p className="text-sm text-muted-foreground">Share with team members via email or collaboration tools</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => handleExport("PDF")} className="flex-1 bg-primary hover:bg-primary/90">
          <Download className="mr-2 h-4 w-4" />
          Download Complete Strategy
        </Button>
        <Button variant="outline" onClick={handleShare} className="flex-1 bg-transparent">
          <Mail className="mr-2 h-4 w-4" />
          Email to Team
        </Button>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Review and customize the strategy</p>
                <p className="text-sm text-muted-foreground">
                  Adapt the recommendations to your specific brand voice and requirements
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Create your content calendar</p>
                <p className="text-sm text-muted-foreground">
                  Use the timeline suggestions to plan your content creation and posting schedule
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Launch and monitor</p>
                <p className="text-sm text-muted-foreground">
                  Implement the strategy and track performance against the suggested milestones
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Create New Strategy
        </Button>
      </div>
    </div>
  )
}
