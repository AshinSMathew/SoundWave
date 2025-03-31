"use client"
import { forwardRef, useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

interface MusicPlayerProps {
  title: string
  artist: string
  coverUrl: string
  src: string
  autoPlay?: boolean
  className?: string
  onNext?: () => void
  onPrevious?: () => void
  onClose?: () => void
}

export const MusicPlayer = forwardRef<HTMLAudioElement, MusicPlayerProps>(
  ({ title, artist, coverUrl, src, autoPlay = false, className, onNext, onPrevious, onClose }, ref) => {
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.7)
    const [showVolume, setShowVolume] = useState(false)

    useEffect(() => {
      const audio = (ref as React.RefObject<HTMLAudioElement>).current
      if (!audio) return

      const updateTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration)
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)

      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('durationchange', updateDuration)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)

      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('durationchange', updateDuration)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
      }
    }, [ref])

    useEffect(() => {
      const audio = (ref as React.RefObject<HTMLAudioElement>).current
      if (audio) {
        audio.volume = volume
      }
    }, [volume, ref])

    const togglePlay = () => {
      const audio = (ref as React.RefObject<HTMLAudioElement>).current
      if (!audio) return

      if (isPlaying) {
        audio.pause()
      } else {
        audio.play().catch(error => console.error('Play failed:', error))
      }
    }

    const handleTimeChange = (value: number[]) => {
      const audio = (ref as React.RefObject<HTMLAudioElement>).current
      if (audio) {
        audio.currentTime = value[0]
      }
    }

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
      <div className={`flex flex-col gap-2 bg-background p-3 rounded-lg shadow-lg ${className}`}>
        <div className="flex items-center gap-3 relative">
          <img 
            src={coverUrl} 
            alt={`${title} cover`} 
            className="h-14 w-14 rounded-md object-cover flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium truncate pr-6">{title}</h3>
              <button
                onClick={onClose}
                className="absolute right-0 top-0 text-muted-foreground hover:text-destructive p-1"
                aria-label="Close player"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground truncate">{artist}</p>
            
            <div className="flex items-center gap-2 mt-1">
              <button 
                onClick={onPrevious}
                className="text-muted-foreground hover:text-primary p-1"
                aria-label="Previous song"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              
              <button 
                onClick={onNext}
                className="text-muted-foreground hover:text-primary p-1"
                aria-label="Next song"
              >
                <SkipForward className="h-4 w-4" />
              </button>
              
              <button 
                onClick={() => setShowVolume(!showVolume)}
                className="text-muted-foreground hover:text-primary p-1 ml-auto"
                aria-label="Volume control"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-muted-foreground w-8 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleTimeChange}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8">
            {formatTime(duration)}
          </span>
        </div>

        {showVolume && (
          <div className="flex items-center gap-2 mt-1">
            <Volume2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}

        <audio 
          ref={ref}
          src={src} 
          autoPlay={autoPlay}
          onEnded={onNext}
        />
      </div>
    )
  }
)

MusicPlayer.displayName = "MusicPlayer"