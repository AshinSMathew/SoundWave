"use client"

import { useState } from "react"
import { Heart, SkipBack, Play, Pause, SkipForward, Volume2, ListMusic, Maximize2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface MusicPlayerProps {
  title: string
  artist: string
  coverUrl: string
}

export function MusicPlayer({ title, artist, coverUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const duration = 225 // 3:45 in seconds

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image src={coverUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-medium">{title}</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              {artist}
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-1 md:w-1/3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex w-full items-center gap-2">
            <span className="w-10 text-right text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={(value) => setCurrentTime(value[0])}
              className="w-full"
            />
            <span className="w-10 text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ListMusic className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider defaultValue={[70]} max={100} step={1} className="w-24" />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

