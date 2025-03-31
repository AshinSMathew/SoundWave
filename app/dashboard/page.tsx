"use client"
import { useEffect, useState, useRef } from "react"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { Music, Search, LogOut, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MusicCard } from "@/components/music-card"
import { MusicPlayer } from "@/components/music-player"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup } from "@/components/ui/dropdown-menu"

interface Song {
  id: number
  title: string
  artist_name: string
  genre: string
  audio_url: string
  cover_image: string
  duration?: string
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/dashboard/songs")
        const data = await response.json()
        setSongs(data)
      } catch (error) {
        console.error("Error fetching songs:", error)
        setSongs([])
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      })

      if (response.ok) {
        window.location.href = "/login"
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const playSong = (song: Song) => {
    setCurrentSong(song)
  }

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audio_url
      audioRef.current.play().catch((error) => {
        console.error("Auto-play failed:", error)
      })
    }
  }, [currentSong])

  const genres = [...new Set(songs.map((song) => song.genre))].sort()

  const filteredSongs = selectedGenre ? songs.filter((song) => song.genre === selectedGenre) : songs

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pb-24 md:pb-0">
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
                placeholder="Search music, artists..."
                className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container pb-8 pt-6">
        <section className="mb-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">All Songs</h2>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedGenre ? selectedGenre : "All Genres"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => setSelectedGenre(null)}
                    className={!selectedGenre ? "bg-accent text-accent-foreground" : ""}
                  >
                    All Genres
                  </DropdownMenuItem>
                  {genres.map((genre) => (
                    <DropdownMenuItem
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={selectedGenre === genre ? "bg-accent text-accent-foreground" : ""}
                    >
                      {genre}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <MusicCard
                  key={song.id}
                  title={song.title}
                  artist={song.artist_name}
                  genre={song.genre}
                  coverUrl={song.cover_image || "/placeholder.svg"}
                  duration={song.duration || "0:00"}
                  onClick={() => playSong(song)}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No songs found in this genre.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 p-2 md:p-4">
          <MusicPlayer
            ref={audioRef}
            title={currentSong.title}
            artist={currentSong.artist_name}
            coverUrl={currentSong.cover_image || "/placeholder.svg"}
            src={currentSong.audio_url}
            autoPlay={true}
            className="max-w-screen-md mx-auto"
          />
        </div>
      )}
    </div>
  )
}