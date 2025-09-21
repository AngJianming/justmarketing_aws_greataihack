"use client"

import { useState } from "react"
import { Search, Play, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"



export function SearchStep({ onVideoSelect }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setShowResults(true)
  }

  const mockVideos = [
    { id: "1", title: "Malaysian Food Challenge Trend", views: "2.3M", duration: "0:15" },
    { id: "2", title: "KL Street Style Dance", views: "1.8M", duration: "0:30" },
    { id: "3", title: "Bahasa Malaysia Comedy Skit", views: "3.1M", duration: "0:25" },
    { id: "4", title: "Malaysian Traditional Recipe", views: "950K", duration: "0:45" },
    { id: "5", title: "Kuala Lumpur City Tour", views: "1.2M", duration: "0:35" },
    { id: "6", title: "Malaysian Festival Celebration", views: "2.7M", duration: "0:20" },
    { id: "7", title: "Penang Street Food Review", views: "1.5M", duration: "0:40" },
    { id: "8", title: "Malaysian Music Trend", views: "890K", duration: "0:18" },
  ]

  const displayedVideos = showMore ? mockVideos : mockVideos.slice(0, 6)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Search Malaysian TikTok Trends</h2>
        <p className="text-muted-foreground text-lg">
          Find the perfect trending video to adapt for your product promotion
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search for trending videos (e.g., 'Malaysian food', 'KL lifestyle', 'Bahasa comedy')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} disabled={!searchQuery.trim() || isLoading} className="h-12 px-8">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>

      {/* Loading Animation */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-muted-foreground">Finding trending videos...</p>
        </div>
      )}

      {/* Video Results */}
      {showResults && !isLoading && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">Trending Videos ({mockVideos.length} found)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Video Placeholder */}
                    <div className="aspect-[9/16] bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h4 className="font-medium text-foreground mb-2 line-clamp-2">{video.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{video.views} views</p>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" className="flex-1" onClick={() => onVideoSelect(video.id)}>
                          Adapt This
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show More Button */}
          {!showMore && mockVideos.length > 6 && (
            <div className="text-center">
              <Button variant="outline" onClick={() => setShowMore(true)} className="px-8">
                Show More Videos ({mockVideos.length - 6} more)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
