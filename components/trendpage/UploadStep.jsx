"use client"

import { useState, useRef } from "react"
import { Upload, ImageIcon, FileText, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function UploadStep({
  selectedVideo,
  onVideoUpload,
  onCustomizationUpdate,
  onProcessVideo,
  customizations,
}) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        setUploadedFile(file)
        onVideoUpload(file)
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadedFile(file)
      onVideoUpload(file)
    }
  }

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      const updatedImages = [...customizations.images, ...newImages]
      onCustomizationUpdate({
        ...customizations,
        images: updatedImages,
      })
    }
  }

  const removeImage = (index) => {
    const updatedImages = customizations.images.filter((_, i) => i !== index)
    onCustomizationUpdate({
      ...customizations,
      images: updatedImages,
    })
  }

  const handlePromptsChange = (value) => {
    onCustomizationUpdate({
      ...customizations,
      prompts: value,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Upload & Customize Your Content</h2>
        <p className="text-muted-foreground text-lg">Add your product video and customize it with the selected trend</p>
      </div>

      {/* Selected Trend Preview */}
      {selectedVideo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Selected Trend Video
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-20 h-28 bg-muted rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-primary border-y-[4px] border-y-transparent ml-1" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Malaysian Food Challenge Trend</h4>
                <p className="text-sm text-muted-foreground">2.3M views • 0:15 duration</p>
                <p className="text-sm text-muted-foreground mt-1">This trend will be adapted with your content</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Product Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Change Video
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Drop your video here</p>
                    <p className="text-sm text-muted-foreground">or click to browse files</p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>Choose Video</Button>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
          </CardContent>
        </Card>

        {/* Customization Options */}
        <Card>
          <CardHeader>
            <CardTitle>Customization Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Text Prompts */}
            <div className="space-y-2">
              <Label htmlFor="prompts" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Add Text Prompts
              </Label>
              <Textarea
                id="prompts"
                placeholder="Enter your product description, call-to-action, or any text you want to include..."
                value={customizations.prompts}
                onChange={(e) => handlePromptsChange(e.target.value)}
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Add Product Images
              </Label>
              <Button variant="outline" onClick={() => imageInputRef.current?.click()} className="w-full">
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Uploaded Images Preview */}
              {customizations.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {customizations.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{image.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Button */}
      <div className="text-center">
        <Button onClick={onProcessVideo} disabled={!uploadedFile} size="lg" className="px-8">
          Process Video
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        {!uploadedFile && <p className="text-sm text-muted-foreground mt-2">Please upload a video to continue</p>}
      </div>
    </div>
  )
}
