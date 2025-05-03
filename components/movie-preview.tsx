"use client"
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface MoviePreviewProps {
  movie: {
    id: number
    title: string
    image: string
    duration?: string
    genres?: string[]
  }
  onPlay: () => void
}

export default function MoviePreview({ movie, onPlay }: MoviePreviewProps) {
  return (
    <motion.div
      className="absolute z-10 w-72 rounded-lg overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: "rgb(32, 64, 67)" }}
    >
      <div className="relative aspect-video">
        <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex items-center gap-1 bg-[rgb(240,241,238)] text-[rgb(18,17,19)] hover:bg-[rgb(240,241,238)/90]"
              onClick={onPlay}
            >
              <Play className="h-4 w-4 fill-current" />
              Play
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-2 border-[rgb(240,241,238)/70] bg-transparent hover:bg-[rgb(240,241,238)/10]"
            >
              <Plus className="h-4 w-4 text-[rgb(240,241,238)]" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-2 border-[rgb(240,241,238)/70] bg-transparent hover:bg-[rgb(240,241,238)/10]"
            >
              <ThumbsUp className="h-4 w-4 text-[rgb(240,241,238)]" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[rgb(240,241,238)/10]">
            <ChevronDown className="h-4 w-4 text-[rgb(240,241,238)]" />
          </Button>
        </div>

        {movie.duration && <div className="text-[rgb(198,37,31)] font-medium text-sm mb-2">{movie.duration}</div>}

        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre, index) => (
              <span key={index} className="text-[rgb(240,241,238)] text-sm">
                {genre}
                {index < movie.genres!.length - 1 ? " | " : ""}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
