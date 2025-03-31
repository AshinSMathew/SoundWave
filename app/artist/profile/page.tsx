"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Music, Upload, Play, LogOut, Edit, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

  useEffect(() => {
    async function fetchArtistTracks() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/artist/profile", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
          }
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
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete song')
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
      cover_image: song.cover_image
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
      formData.append('title', editFormData.title || '')
      formData.append('genre', editFormData.genre || '')
      
      if (editFormData.cover_image_file) {
        formData.append('cover_image', editFormData.cover_image_file)
      }

      const response = await fetch(`/api/artist/songs/${songToEdit.id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update song')
      }

      const updatedSong = await response.json()
      const updatedSongs = songs.map((song) => 
        song.id === songToEdit.id ? updatedSong : song
      )

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
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })
      
      if (response.ok) {
        localStorage.removeItem('auth-token')
        window.location.href = "/login"
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const genres = [
    "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Classical", 
    "Folk", "Country", "Indie", "Metal", "Reggae", "Blues", "Soul", 
    "Funk", "Punk", "World"
  ]

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

        {/* Edit Form */}
        {editMode && songToEdit && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Track</h2>
              <Button variant="ghost" size="sm" onClick={cancelEditing}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cover Image Upload */}
                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden">
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
                        <div>
                          <Input 
                            id="cover_image" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleCoverImageChange}
                            className="w-full max-w-xs"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG, PNG. Max 2MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Track Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        value={editFormData.title || ""} 
                        onChange={handleEditFormChange} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Select value={editFormData.genre} onValueChange={handleGenreChange}>
                        <SelectTrigger id="genre">
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
                    <Button onClick={saveEdit} className="gap-2">
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
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="w-full sm:w-auto">
                    <Input
                      placeholder="Search tracks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="sort">Sort by:</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort" className="w-[180px]">
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
                    <Music className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No tracks found</h3>
                    <p className="mb-6 text-muted-foreground">
                      {searchQuery ? "Try a different search term" : "You haven't uploaded any tracks yet"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {sortedSongs.map((song, index) => (
                      <div key={song.id}>
                        <div className="grid grid-cols-12 gap-2 rounded-md px-2 py-3 transition-colors hover:bg-accent/50 items-center">
                          <div className="col-span-1 text-center text-muted-foreground text-sm">{index + 1}</div>

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

                          <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => startEditing(song)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => openDeleteDialog(song)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Link href={song.audio_url} target="_blank">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Play className="h-4 w-4" />
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this song?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete "{songToDelete?.title}" from your library.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}