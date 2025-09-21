"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Calendar, Clock, TrendingUp } from "lucide-react"


export function StepFour({ formData, insightData, onNext, onPrevious }) {
  const timelineData = [
    {
      phase: "Pre-Launch",
      duration: "Week 1-2",
      activities: [
        "Content creation and design",
        "Influencer outreach and partnerships",
        "Community building on social platforms",
        "Teaser campaigns",
      ],
      color: "bg-blue-500",
    },
    {
      phase: "Launch",
      duration: "Week 3-4",
      activities: [
        "Official campaign launch",
        "Hashtag challenges on TikTok",
        "Instagram Stories and Reels",
        "Paid advertising activation",
      ],
      color: "bg-green-500",
    },
    {
      phase: "Amplification",
      duration: "Week 5-6",
      activities: [
        "User-generated content campaigns",
        "Cross-platform content sharing",
        "Community engagement activities",
        "Performance optimization",
      ],
      color: "bg-purple-500",
    },
    {
      phase: "Optimization",
      duration: "Week 7-8",
      activities: [
        "A/B testing different creatives",
        "Audience retargeting",
        "Conversion rate optimization",
        "ROI analysis and reporting",
      ],
      color: "bg-orange-500",
    },
  ]

  const keyMilestones = [
    { date: "Day 7", milestone: "First 10K impressions", target: "10,000 impressions" },
    { date: "Day 14", milestone: "Viral hashtag adoption", target: "1,000 hashtag uses" },
    { date: "Day 21", milestone: "Engagement peak", target: "5% engagement rate" },
    { date: "Day 30", milestone: "Conversion target", target: "100 conversions" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Campaign Timeline</CardTitle>
          </div>
          <CardDescription>{"Suggested timeline and milestones for your marketing campaign"}</CardDescription>
        </CardHeader>
      </Card>

      {/* Timeline Phases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {timelineData.map((phase, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${phase.color}`}></div>
                <CardTitle className="text-lg">{phase.phase}</CardTitle>
              </div>
              <Badge variant="outline" className="w-fit">
                {phase.duration}
              </Badge>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {phase.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    {activity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Milestones */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Key Milestones & Targets</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMilestones.map((milestone, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{milestone.date}</span>
                  </div>
                  <div className="text-sm font-medium">{milestone.milestone}</div>
                  <div className="text-xs text-muted-foreground">{milestone.target}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommended Posting Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-primary">TikTok</h4>
              <div className="space-y-2 text-sm">
                <div>• Daily posts: 6-9 PM</div>
                <div>• Trending challenges: Weekends</div>
                <div>• Live sessions: Friday 8 PM</div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-accent">Instagram</h4>
              <div className="space-y-2 text-sm">
                <div>• Feed posts: 11 AM, 7 PM</div>
                <div>• Stories: 3-4 times daily</div>
                <div>• Reels: 2 PM, 8 PM</div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-secondary">Facebook</h4>
              <div className="space-y-2 text-sm">
                <div>• Posts: 1-3 PM</div>
                <div>• Community engagement: Morning</div>
                <div>• Ads: Peak hours 7-9 PM</div>
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
        <Button onClick={onNext} className="bg-primary hover:bg-primary/90">
          Export Strategy <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
