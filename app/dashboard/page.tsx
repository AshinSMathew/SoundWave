import Link from "next/link"
import { Music, Search, TrendingUp, Headphones } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MusicCard } from "@/components/music-card"
import { GenreFilter } from "@/components/genre-filter"
import { FeaturedArtist } from "@/components/featured-artist"
import { MusicPlayer } from "@/components/music-player"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Music className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">SoundWave</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Discover
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Genres
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Artists
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Playlists
              </Link>
            </nav>
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
          </div>
        </div>
      </header>
      <main className="container pb-8 pt-6">
        <section className="mb-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Featured Tracks</h2>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <MusicCard
              title="Midnight Dreams"
              artist="Luna Eclipse"
              genre="Electronic"
              coverUrl="/placeholder.svg?height=300&width=300"
              duration="3:45"
            />
            <MusicCard
              title="Ocean Waves"
              artist="Coastal Vibes"
              genre="Ambient"
              coverUrl="/placeholder.svg?height=300&width=300"
              duration="4:20"
            />
            <MusicCard
              title="Urban Jungle"
              artist="City Beats"
              genre="Hip Hop"
              coverUrl="/placeholder.svg?height=300&width=300"
              duration="2:55"
            />
            <MusicCard
              title="Starlight Serenade"
              artist="Cosmic Harmony"
              genre="Classical"
              coverUrl="/placeholder.svg?height=300&width=300"
              duration="5:10"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
                <Button variant="ghost" size="sm" className="gap-1">
                  <TrendingUp className="h-4 w-4" />
                  See charts
                </Button>
              </div>
              <div className="space-y-4">
                <GenreFilter />
                <div className="grid gap-4">
                  <MusicCard
                    layout="horizontal"
                    title="Summer Nights"
                    artist="Sunset Collective"
                    genre="Pop"
                    coverUrl="/placeholder.svg?height=80&width=80"
                    duration="3:22"
                  />
                  <MusicCard
                    layout="horizontal"
                    title="Mountain High"
                    artist="Alpine Echoes"
                    genre="Folk"
                    coverUrl="/placeholder.svg?height=80&width=80"
                    duration="4:15"
                  />
                  <MusicCard
                    layout="horizontal"
                    title="Digital Dreams"
                    artist="Pixel Pulse"
                    genre="Electronic"
                    coverUrl="/placeholder.svg?height=80&width=80"
                    duration="3:50"
                  />
                  <MusicCard
                    layout="horizontal"
                    title="Rhythm & Soul"
                    artist="Groove Masters"
                    genre="R&B"
                    coverUrl="/placeholder.svg?height=80&width=80"
                    duration="4:05"
                  />
                  <MusicCard
                    layout="horizontal"
                    title="Neon Lights"
                    artist="City Glow"
                    genre="Synthwave"
                    coverUrl="/placeholder.svg?height=80&width=80"
                    duration="3:30"
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Recently Played</h2>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Headphones className="h-4 w-4" />
                  View history
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <MusicCard
                  title="Rainy Day"
                  artist="Melancholy Mood"
                  genre="Lo-fi"
                  coverUrl="/placeholder.svg?height=200&width=200"
                  duration="3:15"
                />
                <MusicCard
                  title="Desert Wind"
                  artist="Nomadic Sounds"
                  genre="World"
                  coverUrl="/placeholder.svg?height=200&width=200"
                  duration="4:30"
                />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Featured Artists</h2>
              <div className="space-y-4">
                <FeaturedArtist
                  name="Luna Eclipse"
                  genre="Electronic"
                  imageUrl="/placeholder.svg?height=60&width=60"
                  followers="1.2M"
                />
                <FeaturedArtist
                  name="Coastal Vibes"
                  genre="Ambient"
                  imageUrl="/placeholder.svg?height=60&width=60"
                  followers="845K"
                />
                <FeaturedArtist
                  name="City Beats"
                  genre="Hip Hop"
                  imageUrl="/placeholder.svg?height=60&width=60"
                  followers="2.3M"
                />
                <Link href="#" className="inline-block text-sm text-primary hover:underline">
                  Discover more artists
                </Link>
              </div>
            </section>

            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Genres</h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  Pop
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Rock
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Hip Hop
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Electronic
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Jazz
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Classical
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  R&B
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Indie
                </Button>
              </div>
            </section>

            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Are you an artist?</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Upload your music and reach millions of listeners worldwide.
              </p>
              <Link href="/artist/upload">
                <Button className="w-full">Upload Music</Button>
              </Link>
            </section>
          </div>
        </div>
      </main>

      <MusicPlayer title="Midnight Dreams" artist="Luna Eclipse" coverUrl="/placeholder.svg?height=60&width=60" />
    </div>
  )
}

