"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Music, Upload, X, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

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

export default function ArtistUploadPage() {
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setCoverImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAudioFile(file.name)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Music className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">SoundWave</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Upload Your Music</h1>
            <p className="text-muted-foreground">
              Share your music with the world. Fill out the details below to upload your track.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Track Title</Label>
              <Input id="title" placeholder="Enter the title of your track" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre.toLowerCase()}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">Mood</Label>
                <Select>
                  <SelectTrigger id="mood">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="happy">Happy</SelectItem>
                    <SelectItem value="sad">Sad</SelectItem>
                    <SelectItem value="energetic">Energetic</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Tell us about your track" className="min-h-[120px]" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="flex flex-col items-center gap-4">
                  {coverImage ? (
                    <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-md border">
                      <img
                        src={coverImage || "/placeholder.svg"}
                        alt="Cover preview"
                        className="h-full w-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full"
                        onClick={() => setCoverImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex aspect-square w-full max-w-[200px] flex-col items-center justify-center gap-2 rounded-md border border-dashed p-4 text-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Drag & drop or click to upload</p>
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF, max 2MB</p>
                      </div>
                    </div>
                  )}
                  <div className="w-full">
                    <Input
                      id="cover-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Label
                      htmlFor="cover-image"
                      className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      {coverImage ? "Change Image" : "Upload Image"}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Audio File</Label>
                <div className="flex flex-col items-center gap-4">
                  {audioFile ? (
                    <div className="flex w-full max-w-[300px] items-center gap-2 rounded-md border p-4">
                      <Music className="h-8 w-8 text-primary" />
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate font-medium">{audioFile}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setAudioFile(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex aspect-square w-full max-w-[200px] flex-col items-center justify-center gap-2 rounded-md border border-dashed p-4 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Drag & drop or click to upload</p>
                        <p className="text-xs text-muted-foreground">MP3, WAV or FLAC, max 20MB</p>
                      </div>
                    </div>
                  )}
                  <div className="w-full">
                    <Input
                      id="audio-file"
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleAudioChange}
                    />
                    <Label
                      htmlFor="audio-file"
                      className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      {audioFile ? "Change Audio" : "Upload Audio"}
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Add tags separated by commas (e.g. acoustic, guitar, vocal)" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="explicit" />
                <Label htmlFor="explicit" className="font-normal">
                  This track contains explicit content
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="original" defaultChecked />
                <Label htmlFor="original" className="font-normal">
                  This is my original content and I own all rights
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="font-normal">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Content Policy
                  </Link>
                </Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline">Save as Draft</Button>
              <Button className="flex-1">Upload Track</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

