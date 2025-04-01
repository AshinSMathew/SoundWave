"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Music, Upload, Play, LogOut, Edit, Trash2, Save, X, Search, ArrowUpDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  const [artistName, setArtistName] = useState("Music Producer")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [songToDelete, setSongToDelete] = useState<Song | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [songToEdit, setSongToEdit] = useState<Song | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<Song> & { cover_image_file?: File }>({})
  const [previewSong, setPreviewSong] = useState<Song | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    async function fetchArtistTracks() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/artist/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch tracks")
        }

        const data = await response.json()
        setSongs(data)
        if (data.length > 0) {
          setArtistName(data[0].artist_name)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtistTracks()
  }, [])

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (editFormData.cover_image_file) {
        URL.revokeObjectURL(URL.createObjectURL(editFormData.cover_image_file))
      }
    }
  }, [editFormData.cover_image_file])

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

  const openDeleteDialog = (song: Song) => {
    setSongToDelete(song)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!songToDelete) return

    try {
      const response = await fetch(`/api/artist/songs/${songToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete song")
      }

      setSongs(songs.filter((song) => song.id !== songToDelete.id))
      setDeleteDialogOpen(false)
      setSongToDelete(null)
    } catch (error) {
      console.error("Error deleting song:", error)
    }
  }

  const startEditing = (song: Song) => {
    setSongToEdit(song)
    setEditFormData({
      title: song.title,
      genre: song.genre,
      cover_image: song.cover_image,
    })
    setEditMode(true)
  }

  const cancelEditing = () => {
    setEditMode(false)
    setSongToEdit(null)
    setEditFormData({})
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setEditFormData((prev) => ({
        ...prev,
        cover_image_file: file,
      }))
    }
  }

  const handleGenreChange = (value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      genre: value,
    }))
  }

  const saveEdit = async () => {
    if (!songToEdit) return

    try {
      const formData = new FormData()
      formData.append("title", editFormData.title || "")
      formData.append("genre", editFormData.genre || "")

      if (editFormData.cover_image_file) {
        formData.append("cover_image", editFormData.cover_image_file)
      }

      const response = await fetch(`/api/artist/songs/${songToEdit.id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to update song")
      }

      const updatedSong = await response.json()
      const updatedSongs = songs.map((song) => (song.id === songToEdit.id ? updatedSong : song))

      setSongs(updatedSongs)
      setEditMode(false)
      setSongToEdit(null)
      setEditFormData({})
    } catch (error) {
      console.error("Error updating song:", error)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })

      if (response.ok) {
        localStorage.removeItem("auth-token")
        window.location.href = "/login"
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const playPreview = (song: Song) => {
    setPreviewSong(song)
    if (audioRef.current) {
      audioRef.current.src = song.audio_url
      audioRef.current.play().catch((err) => console.error("Error playing audio:", err))
    }
  }

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPreviewSong(null)
  }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-primary/20 blur-lg"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-primary"></div>
          </div>
          <p className="text-muted-foreground animate-pulse">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 flex justify-center items-center">
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-xl max-w-md text-center">
          <div className="bg-destructive/10 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <X className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Profile</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <span className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                SoundWave
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
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

      <main className="container py-8">
        {/* Artist Profile Section */}
        <div className="mb-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold md:text-4xl">{artistName}</h1>
                  <p className="text-muted-foreground">Artist & Producer</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-6">
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {songs.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Tracks</p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-border/50">
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {songs.reduce((total, song) => total + Math.floor(Math.random() * 1000), 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Plays</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:self-start">
              <Link href="/artist/upload">
                <Button className="gap-2 rounded-lg">
                  <Upload className="h-4 w-4" />
                  Upload New Track
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {editMode && songToEdit && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Track</h2>
              <Button variant="ghost" size="sm" onClick={cancelEditing} className="gap-2">
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>

            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cover Image Upload */}
                    <div className="space-y-3">
                      <Label>Cover Image</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative h-28 w-28 rounded-lg overflow-hidden border border-border/50">
                          <Image
                            src={
                              editFormData.cover_image_file
                                ? URL.createObjectURL(editFormData.cover_image_file)
                                : songToEdit.cover_image || "/placeholder.svg"
                            }
                            alt={editFormData.title || songToEdit.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            id="cover_image"
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="title">Track Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={editFormData.title || ""}
                        onChange={handleEditFormChange}
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="genre">Genre</Label>
                      <Select value={editFormData.genre} onValueChange={handleGenreChange}>
                        <SelectTrigger id="genre" className="bg-background/50">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={saveEdit} className="gap-2 rounded-lg">
                      <Save className="h-4 w-4" /> Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tracks Section */}
        <Tabs defaultValue="tracks" className="w-full">
          <TabsContent value="tracks" className="mt-6">
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="w-full sm:w-auto relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tracks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50 w-full sm:w-auto max-w-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg bg-background/50"
                      onClick={() => setSortBy(sortBy === "recent" ? "title" : "recent")}
                    >
                      <ArrowUpDown className="h-4 w-4" />
                      {sortBy === "recent" ? "Sort by Date" : "Sort by Title"}
                    </Button>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort" className="w-[180px] bg-background/50">
                        <SelectValue placeholder="Select sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {sortedSongs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-muted/50 p-6 rounded-full mb-4">
                      <Music className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No tracks found</h3>
                    <p className="mb-6 text-muted-foreground max-w-md">
                      {searchQuery ? "Try a different search term" : "You haven't uploaded any tracks yet"}
                    </p>
                    {!searchQuery && (
                      <Link href="/artist/upload">
                        <Button className="gap-2 rounded-lg">
                          <Upload className="h-4 w-4" />
                          Upload Your First Track
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {sortedSongs.map((song, index) => (
                      <div key={song.id}>
                        <div className="grid grid-cols-12 gap-2 rounded-lg px-3 py-4 transition-colors hover:bg-accent/50 items-center">
                          <div className="col-span-1 text-center text-muted-foreground text-sm">{index + 1}</div>

                          <div className="col-span-3 md:col-span-2 flex items-center">
                            <div
                              className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md group cursor-pointer"
                              onClick={() => playPreview(song)}
                            >
                              <Image
                                src={song.cover_image || "/placeholder.svg"}
                                alt={song.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                          </div>

                          <div className="col-span-5 md:col-span-4 flex flex-col min-w-0">
                            <h3 className="font-medium truncate max-w-full">{song.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                                {song.genre}
                              </Badge>
                            </div>
                          </div>

                          <div className="col-span-3 md:col-span-3 hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{new Date(song.created_at).toLocaleDateString()}</span>
                          </div>

                          <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
                              onClick={() => startEditing(song)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => openDeleteDialog(song)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
                              onClick={() => playPreview(song)}
                            >
                              <Play className="h-4 w-4" />
                              <span className="sr-only">Play</span>
                            </Button>
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

      {/* Audio Preview */}
      {previewSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border/50 z-50 p-4">
          <div className="container max-w-screen-lg mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-md">
                <Image
                  src={previewSong.cover_image || "/placeholder.svg"}
                  alt={previewSong.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{previewSong.title}</h4>
                <p className="text-sm text-muted-foreground">{previewSong.artist_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <audio ref={audioRef} className="hidden" controls />
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full hover:bg-destructive/10 hover:text-destructive"
                onClick={stopPreview}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this song?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete "{songToDelete?.title}" from your library.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="rounded-lg">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

