"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Music,
  Upload,
  Search,
  Play,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Type definition for song
interface Song {
    id: number
    title: string
    genre: string
    cover_image: string
    audio_url: string
    created_at: string
    artist_name: string
}

export default function ArtistDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [songs, setSongs] = useState<Song[]>([])
  const [artistName, setArtistName] = useState("Music Producer");
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch artist tracks
  useEffect(() => {
    async function fetchArtistTracks() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/artist/')
        
        if (!response.ok) {
          throw new Error('Failed to fetch tracks')
        }
        
        const data = await response.json()
        setSongs(data)
        if (data.length > 0) {
            setArtistName(data[0].artist_name)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtistTracks()
  }, [])

  // Filter songs based on search query
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort songs based on selected option
  const sortedSongs = [...filteredSongs].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading Profile...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    )
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
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search your music..."
                className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Artist Profile Section */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold md:text-4xl">{artistName}</h1>
            <p className="text-muted-foreground">Music Producer</p>

            <div className="mt-4 flex flex-wrap gap-6">
              <div>
                <p className="text-2xl font-bold">{songs.length}</p>
                <p className="text-sm text-muted-foreground">Total Tracks</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:self-start">
            <Link href="/artist/upload">
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Upload New Track
              </Button>
            </Link>
          </div>
        </div>

        {/* Tracks Section */}
        <Tabs defaultValue="tracks" className="w-full">
          <TabsContent value="tracks" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {sortedSongs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Music className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No tracks found</h3>
                    <p className="mb-6 text-muted-foreground">
                      {searchQuery ? "Try a different search term" : "You haven't uploaded any tracks yet"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {/* Track list rendering */}
                    {sortedSongs.map((song, index) => (
                      <div key={song.id}>
                        <div className="grid grid-cols-12 gap-4 rounded-md px-4 py-3 transition-colors hover:bg-accent/50">
                          <div className="col-span-6 flex items-center gap-3 md:col-span-5">
                            <span className="w-8 text-center text-muted-foreground">{index + 1}</span>
                            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={song.cover_image || "/placeholder.svg"}
                                alt={song.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate font-medium">{song.title}</h3>
                              <p className="truncate text-sm text-muted-foreground">{song.genre}</p>
                            </div>
                          </div>

                          <div className="col-span-6 flex items-center justify-end gap-4">
                            <span className="text-sm text-muted-foreground">
                              {new Date(song.created_at).toLocaleDateString()}
                            </span>
                            <Link href={song.audio_url} target="_blank">
                              <Button size="sm" variant="outline" className="gap-2">
                                <Play className="h-4 w-4" /> Play
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}