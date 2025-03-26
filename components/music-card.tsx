"use client"
import { Play, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface MusicCardProps {
  title: string
  artist: string
  genre: string
  coverUrl: string
  duration: string
  layout?: "vertical" | "horizontal"
  onClick?: () => void
}

export function MusicCard({ 
  title, 
  artist, 
  genre, 
  coverUrl, 
  duration, 
  layout = "vertical",
  onClick 
}: MusicCardProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick?.()
  }

  if (layout === "horizontal") {
    return (
      <Card 
        className="overflow-hidden transition-all hover:bg-accent/50 cursor-pointer"
        onClick={onClick}
      >
        <CardContent className="p-0">
          <div className="flex items-center gap-4 p-2">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
              <Image 
                src={coverUrl || "/placeholder.svg"} 
                alt={title} 
                fill 
                className="object-cover" 
              />
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
                onClick={handlePlayClick}
              >
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="truncate font-medium leading-none">{title}</h3>
              <Link 
                href="#" 
                className="mt-1 block truncate text-sm text-muted-foreground hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                {artist}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">{genre}</span>
              <span>{duration}</span>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle like functionality here
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className="overflow-hidden transition-all hover:bg-accent/50 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={coverUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
            onClick={handlePlayClick}
          >
            <Button size="icon" className="h-12 w-12 rounded-full hover:scale-105">
              <Play className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{title}</h3>
          <Link 
            href="#" 
            className="mt-1 block text-sm text-muted-foreground hover:text-primary"
            onClick={(e) => e.stopPropagation()}
          >
            {artist}
          </Link>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{genre}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{duration}</span>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle like functionality here
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}