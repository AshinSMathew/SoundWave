"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {Music,Upload,Play,LogOut} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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

  useEffect(() => {
    async function fetchArtistTracks() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/artist/profile')
        
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

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading Profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    )
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Music className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">SoundWave</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
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
                        <div className="grid grid-cols-12 gap-2 rounded-md px-2 py-3 transition-colors hover:bg-accent/50 items-center">
                          <div className="col-span-1 text-center text-muted-foreground text-sm">
                            {index + 1}
                          </div>
                          
                          <div className="col-span-3 md:col-span-2 flex items-center">
                            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={song.cover_image || "/placeholder.svg"}
                                alt={song.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div className="col-span-5 md:col-span-4 flex flex-col min-w-0">
                            <h3 className="font-medium truncate max-w-full">{song.title}</h3>
                            <p className="text-sm text-muted-foreground truncate max-w-full">{song.genre}</p>
                          </div>

                          <div className="col-span-3 md:col-span-3 hidden md:block text-sm text-muted-foreground text-right">
                            {new Date(song.created_at).toLocaleDateString()}
                          </div>

                          <div className="col-span-3 md:col-span-2 flex justify-end">
                            <Link href={song.audio_url} target="_blank">
                              <Button size="sm" variant="outline" className="gap-2">
                                <Play className="h-4 w-4" /> 
                                <span className="hidden md:inline">Play</span>
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