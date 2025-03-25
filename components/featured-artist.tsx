import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface FeaturedArtistProps {
  name: string
  genre: string
  imageUrl: string
  followers: string
}

export function FeaturedArtist({ name, genre, imageUrl, followers }: FeaturedArtistProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 overflow-hidden rounded-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="flex-1 overflow-hidden">
        <Link href="#" className="block truncate font-medium hover:text-primary">
          {name}
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{genre}</span>
          <span>•</span>
          <span>{followers} followers</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}

