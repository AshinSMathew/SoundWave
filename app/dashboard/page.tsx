"use client"
import { useEffect, useState, useRef } from "react"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { Music, Search, LogOut, Filter, Heart, Clock, Disc, Headphones, Volume2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MusicPlayer } from "@/components/music-player"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Song {
  id: number
  title: string
  artist_name: string
  genre: string
  audio_url: string
  cover_image: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true)
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

  const filteredSongs = songs.filter(
    (song) =>{
      const matchesSearch = 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.genre.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = selectedGenre === null || song.genre === selectedGenre
      return matchesSearch && matchesGenre
    }
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-primary/20 blur-lg"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-primary"></div>
          </div>
          <p className="text-muted-foreground animate-pulse">Loading your music...</p>
        </div>
      </div>
    )
  }

  const closeMusicPlayer = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
    }
    setCurrentSong(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 pb-24 md:pb-0">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10 items-center">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="" className="flex items-center space-x-2 group">
              <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <span className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                SoundWave
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tracks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 w-full sm:w-auto max-w-sm"
              />
            </div>
            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container pb-8 pt-8">
        <div className="flex flex-col md:flex-row gap-6 mb-10 relative">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <div
            className={`
        fixed md:relative top-0 left-0 z-50 h-full w-64 
        transform transition-transform duration-300 ease-in-out
        bg-background border-r border-border/50 md:border-none
        md:transform-none md:opacity-100 md:w-64 md:block
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
          >
            <div className="h-16 flex items-center justify-between px-4 md:hidden border-b">
              <Link href="" className="flex items-center space-x-2 group">
                <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Music className="h-5 w-5 text-primary" />
                </div>
                <span className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  SoundWave
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-primary" />
                  <span>Quick Links</span>
                </h3>
                <nav className="space-y-1">
                  <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                    <Disc className="h-4 w-4" />
                    <span>Discover</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                  </Link>
                </nav>
              </div>

              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <span>Genres</span>
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedGenre(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${!selectedGenre ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"}`}
                  >
                    All Genres
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedGenre === genre ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"}`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {selectedGenre ? `${selectedGenre} Music` : "All Songs"}
                  </h2>
                  <p className="text-muted-foreground">{filteredSongs.length} tracks available</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 rounded-lg w-full sm:w-auto">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl">
                    <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
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
                    <div
                      key={song.id}
                      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                      onClick={() => playSong(song)}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={song.cover_image || "/placeholder.svg"}
                          alt={song.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            size="icon"
                            className="h-12 w-12 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary"
                          >
                            <Music className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold truncate">{song.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{song.artist_name}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {song.genre}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Music className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No songs found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {selectedGenre
                        ? `We couldn't find any songs in the ${selectedGenre} genre. Try selecting a different genre.`
                        : "We couldn't find any songs matching your criteria."}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border/50 z-50 p-2 md:p-4">
          <MusicPlayer
            ref={audioRef}
            title={currentSong.title}
            artist={currentSong.artist_name}
            coverUrl={currentSong.cover_image || "/placeholder.svg"}
            src={currentSong.audio_url}
            autoPlay={true}
            className="max-w-screen-lg mx-auto"
            onClose={closeMusicPlayer}
          />
        </div>
      )}
    </div>
  )
}
