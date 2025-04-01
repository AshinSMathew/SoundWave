"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Music, Upload, X, ImageIcon, ArrowLeft, FileAudio, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const genres = [
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Electronic",
  "Jazz",
  "Classical",
  "Folk",
  "Country",
  "Indie",
  "Metal",
  "Reggae",
  "Blues",
  "Soul",
  "Funk",
  "Punk",
  "World",
]

export default function MusicUploadPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")

  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate image file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Cover image must be less than 2MB",
          variant: "destructive",
        })
        return
      }
      setCoverImage(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate audio file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Audio file must be less than 20MB",
          variant: "destructive",
        })
        return
      }
      setAudioFile(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title || !genre || !coverImage || !audioFile) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("genre", genre)
    formData.append("coverImage", coverImage)
    formData.append("audioFile", audioFile)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.floor(Math.random() * 10)
          return newProgress > 90 ? 90 : newProgress
        })
      }, 300)

      const response = await fetch("/api/artist/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()

      toast({
        title: "Upload Successful",
        description: "Your track has been uploaded successfully!",
        variant: "default",
      })

      setTitle("")
      setGenre("")
      setCoverImage(null)
      setAudioFile(null)
      setCoverPreview(null)

      setTimeout(() => {
        router.push("/artist/profile")
      }, 1500)
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  const removeCoverImage = () => {
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview)
    }
    setCoverImage(null)
    setCoverPreview(null)
  }

  const removeAudioFile = () => {
    setAudioFile(null)
  }

  const handleBackToProfile = () => {
    router.push("/artist/profile")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={handleBackToProfile} className="gap-2 hover:bg-background/50">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-xl">
            <div className="text-center space-y-2 mb-8">
              <div className="bg-primary/10 p-3 rounded-full inline-flex mx-auto mb-2">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Upload Your Music</h1>
              <p className="text-muted-foreground">Share your track with the world</p>
            </div>

            <div className="space-y-6">
              {/* Cover Image Upload Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Cover Image *</Label>
                <div className="flex flex-col items-center">
                  {coverPreview ? (
                    <div className="relative w-64 h-64 mb-4">
                      <img
                        src={coverPreview || "/placeholder.svg"}
                        alt="Cover preview"
                        className="w-full h-full object-cover rounded-xl border border-border/50"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={removeCoverImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border/50 bg-background/30 p-8 text-center rounded-xl mb-4 w-full max-w-md">
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Upload Cover Image</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB.</p>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="cover-image"
                    onChange={handleImageChange}
                    required
                  />
                  <Label
                    htmlFor="cover-image"
                    className="cursor-pointer px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors inline-flex items-center gap-2"
                  >
                    <ImageIcon className="h-4 w-4" />
                    {coverImage ? "Change Image" : "Upload Image"}
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Track Title *</Label>
                  <Input
                    placeholder="Enter track title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Genre *</Label>
                  <Select value={genre} onValueChange={setGenre} required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genreOption) => (
                        <SelectItem key={genreOption} value={genreOption}>
                          {genreOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Audio File Upload Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Audio File *</Label>
                <div className="flex flex-col items-center">
                  {audioFile ? (
                    <div className="flex items-center space-x-4 p-4 border border-border/50 rounded-xl w-full max-w-md bg-background/30 mb-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Music className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{audioFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                        onClick={removeAudioFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border/50 bg-background/30 p-8 text-center rounded-xl w-full max-w-md mb-4">
                      <FileAudio className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Upload Audio File</p>
                      <p className="text-xs text-muted-foreground mt-1">MP3, WAV, FLAC. Max 20MB.</p>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    id="audio-file"
                    onChange={handleAudioChange}
                    required
                  />
                  <Label
                    htmlFor="audio-file"
                    className="cursor-pointer px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors inline-flex items-center gap-2"
                  >
                    <FileAudio className="h-4 w-4" />
                    {audioFile ? "Change Audio" : "Upload Audio"}
                  </Label>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-primary">Important</p>
                  <p className="text-muted-foreground">
                    By uploading, you confirm that your music doesn't violate any copyright laws and you have the rights
                    to distribute it.
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/artist/profile")}
                  disabled={isLoading}
                  className="flex-1 rounded-lg"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 rounded-lg" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {uploadProgress > 0 ? `Uploading ${uploadProgress}%` : "Processing..."}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Track
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}