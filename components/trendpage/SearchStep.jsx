"use client"

import { useState } from "react"
import { Search, Play, Download, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function SearchStep({ onVideoSelect }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [apiVideos, setApiVideos] = useState([])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('https://tiktok-scraper7.p.rapidapi.com/feed/list?region=MY&count=10', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
          'x-rapidapi-key': '166a8f2480mshcd2a06d948a9db7p19bbbejsn911736815abf'
        }
      })
      const data = await response.json()
      setApiVideos(data.data || [])
    } catch (error) {
      console.error('Error fetching TikTok videos:', error)
      // Use mock data as fallback
      setApiVideos([])
    }
    setIsLoading(false)
    setShowResults(true)
  }



  const formatPlayCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count?.toString() || '0'
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const combinedVideos = [...(apiVideos || []),]
  const displayedVideos = showMore ? combinedVideos : combinedVideos.slice(0, 12)

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
            <h3 className="text-xl font-semibold text-foreground">Trending Videos ({combinedVideos.length} found)</h3>
          </div>

          {/* Upload Your Own Video Card */}
          <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer"
           onClick={() => onVideoSelect("upload")}
          >
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground">Upload Your Own Trending Video</h4>
                <p className="text-sm text-muted-foreground">
                  Found a trending Malaysian TikTok video? Upload it here to adapt for your product
                </p>
                <Button variant="outline" className="mt-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedVideos.map((video, index) => (
              <Card key={  video.aweme_id ||
    (video.id && apiVideos.includes(video) ? video.id : `mock-${video.id}`) ||
    index} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Video Placeholder/Thumbnail */}
                    <div className="aspect-[9/16] bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      {video.cover ? (
                        <>
                          <img 
                            src={video.cover} 
                            alt={video.title || 'TikTok video'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 hidden items-center justify-center">
                            <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                          <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                        </>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration ? formatDuration(video.duration) : video.duration || '0:15'}
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.play_count ? formatPlayCount(video.play_count) : video.views || '1M'}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                        {video.title || 'TikTok Video'}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {video.author?.nickname || video.author?.unique_id || 'Unknown Author'}
                      </p>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 bg-transparent"
                          onClick={() => {
                            if (video.play || video.wmplay) {
                              window.open(video.play || video.wmplay, '_blank');
                            }
                          }}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1" 
                          onClick={() => onVideoSelect(video.aweme_id || video.id || index)}
                        >
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
          {!showMore && combinedVideos.length > 12 && (
            <div className="text-center">
              <Button variant="outline" onClick={() => setShowMore(true)} className="px-8">
                Show More Videos ({combinedVideos.length - 12} more)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}