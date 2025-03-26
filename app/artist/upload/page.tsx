"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Music, Upload, X, ImageIcon, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const genres = [
  "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Classical", 
  "Folk", "Country", "Indie", "Metal", "Reggae", "Blues", "Soul", 
  "Funk", "Punk", "World"
]

export default function MusicUploadPage() {
  const router = useRouter()
  
  // State for form fields
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  
  // State for file uploads
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false)

  // Image file change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate image file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Cover image must be less than 2MB",
          variant: "destructive"
        })
        return
      }
      setCoverImage(file)
    }
  }

  // Audio file change handler
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate audio file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Audio file must be less than 20MB",
          variant: "destructive"
        })
        return
      }
      setAudioFile(file)
    }
  }

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validate form fields
    if (!title || !genre || !coverImage || !audioFile) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }
  
    // Start loading state
    setIsLoading(true)
  
    // Create form data for upload
    const formData = new FormData()
    formData.append('title', title)
    formData.append('genre', genre)
    formData.append('coverImage', coverImage)
    formData.append('audioFile', audioFile)
  
    try {
      // Send upload request using fetch instead of axios
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
  
      // Check if the response is ok
      if (!response.ok) {
        // Try to parse error response, but handle cases where response might be empty
        let errorMessage = 'Upload failed'
        try {
          const errorData = await response.text() // Use text() instead of json()
          // Parse text if it looks like JSON, otherwise use the text directly
          try {
            const parsedError = JSON.parse(errorData)
            errorMessage = parsedError.error || errorData
          } catch {
            errorMessage = errorData || 'Upload failed'
          }
        } catch {
          // If even text() fails, use default error message
          errorMessage = 'Upload failed'
        }
  
        throw new Error(errorMessage)
      }
  
      const responseData = await response.json()
  
      // Show success toast
      toast({
        title: "Upload Successful",
        description: "Your track has been uploaded!",
      })
      router.push('/artist/upload')
    } catch (error) {
      // Handle upload error
      console.error('Upload failed:', error)
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "There was an error uploading your track",
        variant: "destructive"
      })
    } finally {
      // Stop loading state
      setIsLoading(false)
    }
  }

  // Remove cover image
  const removeCoverImage = () => {
    setCoverImage(null)
  }

  // Remove audio file
  const removeAudioFile = () => {
    setAudioFile(null)
  }
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'same-origin'
      });  
      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
        onClick={handleLogout}
        >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Upload Your Music</h1>
          <p className="text-muted-foreground">
            Share your track with the world
          </p>
        </div>

        {/* Track Title */}
        <div className="space-y-2">
          <Label>Track Title</Label>
          <Input 
            placeholder="Enter track title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Genre Selection */}
        <div className="space-y-2">
          <Label>Genre</Label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger>
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

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <Label>Cover Image</Label>
          <div className="flex flex-col items-center">
            {coverImage ? (
              <div className="relative w-64 h-64">
                <img 
                  src={URL.createObjectURL(coverImage)} 
                  alt="Cover preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button 
                  type="button"
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2"
                  onClick={removeCoverImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed p-8 text-center rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm">Upload Cover Image</p>
              </div>
            )}
            <Input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="cover-image"
              onChange={handleImageChange}
            />
            <Label 
              htmlFor="cover-image" 
              className="mt-4 cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              {coverImage ? "Change Image" : "Upload Image"}
            </Label>
          </div>
        </div>

        {/* Audio File Upload */}
        <div className="space-y-2">
          <Label>Audio File</Label>
          <div className="flex flex-col items-center">
            {audioFile ? (
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <Music className="h-8 w-8 text-primary" />
                <span className="truncate max-w-xs">{audioFile.name}</span>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon"
                  onClick={removeAudioFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed p-8 text-center rounded-lg">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm">Upload Audio File</p>
              </div>
            )}
            <Input 
              type="file" 
              accept="audio/*" 
              className="hidden" 
              id="audio-file"
              onChange={handleAudioChange}
            />
            <Label 
              htmlFor="audio-file" 
              className="mt-4 cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              {audioFile ? "Change Audio" : "Upload Audio"}
            </Label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push('/artist/dashboard')}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1" 
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload Track"}
          </Button>
        </div>
      </form>
    </div>
  )
}