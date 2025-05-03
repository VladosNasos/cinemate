"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Plus, ThumbsUp, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MovieDetailProps {
  movie?: {
    id: number
    image: string
    title: string
    genre?: string
    year?: string
    rating?: string
    duration?: string
  }
  isOpen: boolean
  onClose: () => void
}

interface SimilarMovie {
  id: number
  image: string
  title: string
  year: string
  duration: string
  description: string
}

export default function MovieDetailModal({ movie, isOpen, onClose }: MovieDetailProps) {
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([])
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    // Mock data for similar movies
    if (isOpen) {
      setSimilarMovies([
        {
          id: 101,
          image: "/placeholder.svg?height=180&width=320",
          title: "Captain America",
          year: "2005",
          duration: "2h 13m",
          description:
            "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis ultrices. Nulla tristique sagittis amet a sem pellentesque lorem id",
        },
        {
          id: 102,
          image: "/placeholder.svg?height=180&width=320",
          title: "Spider-Man",
          year: "2005",
          duration: "2h 13m",
          description:
            "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis ultrices. Nulla tristique sagittis amet a sem pellentesque lorem id",
        },
        {
          id: 103,
          image: "/placeholder.svg?height=180&width=320",
          title: "Deadpool",
          year: "2005",
          duration: "2h 13m",
          description:
            "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis ultrices. Nulla tristique sagittis amet a sem pellentesque lorem id",
        },
        {
          id: 104,
          image: "/placeholder.svg?height=180&width=320",
          title: "Groot",
          year: "2005",
          duration: "2h 13m",
          description:
            "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis ultrices. Nulla tristique sagittis amet a sem pellentesque lorem id",
        },
        {
          id: 105,
          image: "/placeholder.svg?height=180&width=320",
          title: "Batman",
          year: "2005",
          duration: "2h 13m",
          description:
            "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis ultrices. Nulla tristique sagittis amet a sem pellentesque lorem id",
        },
        {
          id: 106,
          image: "/placeholder.svg?height=180&width=320",
          title: "Doctor Strange",
          year: "2005",
          duration: "2h 13m",
          description:
            "Lorem ipsum dolor sit amet consectetur. Ut tempus nibh ultrices lobortis lacus turpis ultrices. Nulla tristique sagittis amet a sem pellentesque lorem id",
        },
      ])
    }
  }, [isOpen])

  if (!movie) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide bg-[rgb(32,64,67)] rounded-lg shadow-xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-[rgb(18,17,19)] rounded-full p-1 hover:bg-[rgb(107,41,35)] transition-colors"
            >
              <X className="h-6 w-6 text-[rgb(240,241,238)]" />
            </button>

            {/* Hero image */}
            <div className="relative w-full h-[40vh]">
              <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
              {/* Removed gradient overlay */}
            </div>

            {/* Content */}
            <div className="p-8 bg-[rgb(32,64,67)]">
              {/* Controls */}
              <div className="flex items-center gap-4 mb-6">
                <Button className="flex items-center gap-2 bg-[rgb(240,241,238)] hover:bg-[rgb(240,241,238)]/90 text-[rgb(32,64,67)]">
                  <Play className="h-5 w-5 fill-current" />
                  Play
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full border-2 ${added ? "bg-[rgb(198,37,31)]/20 border-[rgb(198,37,31)]" : "bg-transparent border-[rgb(240,241,238)]/70 hover:bg-[rgb(107,41,35)]/20"}`}
                  onClick={() => setAdded(!added)}
                >
                  <Plus className={`h-5 w-5 ${added ? "text-[rgb(198,37,31)]" : "text-[rgb(240,241,238)]"}`} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full border-2 ${liked ? "bg-[rgb(198,37,31)]/20 border-[rgb(198,37,31)]" : "bg-transparent border-[rgb(240,241,238)]/70 hover:bg-[rgb(107,41,35)]/20"}`}
                  onClick={() => setLiked(!liked)}
                >
                  <ThumbsUp className={`h-5 w-5 ${liked ? "text-[rgb(198,37,31)]" : "text-[rgb(240,241,238)]"}`} />
                </Button>

                <div className="ml-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-2 bg-transparent border-[rgb(240,241,238)]/70 hover:bg-[rgb(107,41,35)]/20"
                  >
                    <ChevronDown className="h-5 w-5 text-[rgb(240,241,238)]" />
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[rgb(240,241,238)] font-medium">2h 13m</span>
                  <span className="text-[rgb(240,241,238)]/70">2005</span>
                  <span className="px-1.5 py-0.5 text-xs bg-[rgb(18,17,19)] text-[rgb(240,241,238)]/70 rounded">
                    18+
                  </span>
                </div>

                <h1 className="text-2xl font-bold text-[rgb(240,241,238)] mb-2">{movie.title}</h1>

                <div className="flex items-center gap-2 text-[rgb(240,241,238)] mb-4">
                  <span>Violent</span>
                  <span className="w-1 h-1 rounded-full bg-[rgb(240,241,238)]/70"></span>
                  <span>Drama</span>
                  <span className="w-1 h-1 rounded-full bg-[rgb(240,241,238)]/70"></span>
                  <span>Gritty</span>
                </div>

                <p className="text-[rgb(240,241,238)]">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit nisi nibh pulvinar. Habitant aliquam ac urna
                  morbi nisl pretium. Quam tortor scelerisque tortor leo at quam adipiscing. Lacus rutrum ipsum non
                  convallis et leo cursus ultrices mus. At ornare morbi donec elit blandit nam dolor dignissim tempor.
                  Consectetur tempus accumsan at montes maecenas tortor.
                </p>
              </div>

              {/* Cast */}
              <div className="mb-8">
                <div className="flex gap-x-8 text-[rgb(240,241,238)]">
                  <div>
                    <span className="text-[rgb(240,241,238)]/70 block mb-1">Cast:</span>
                    <span>John Smith, Elen Woolf, Catrine Bagher, Evelina Nads</span>
                  </div>
                  <div>
                    <span className="text-[rgb(240,241,238)]/70 block mb-1">Genres:</span>
                    <span>Sport movies, Crime movies, Drama movies</span>
                  </div>
                </div>
              </div>

              {/* More like this */}
              <div>
                <h2 className="text-xl font-bold text-[rgb(240,241,238)] mb-4">More like this</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarMovies.map((movie) => (
                    <div key={movie.id} className="relative bg-[rgb(18,17,19)] rounded-md overflow-hidden group">
                      <div className="relative aspect-video">
                        <Image
                          src={movie.image || "/placeholder.svg"}
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 right-0 bg-[rgb(18,17,19)] px-2 py-1 text-xs text-[rgb(240,241,238)]">
                          {movie.duration}
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[rgb(240,241,238)]/70">{movie.year}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full hover:bg-[rgb(107,41,35)]/20 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Plus className="h-3 w-3 text-[rgb(240,241,238)]" />
                          </Button>
                        </div>

                        <h3 className="font-medium text-[rgb(240,241,238)] mb-1">{movie.title}</h3>

                        <p className="text-xs text-[rgb(240,241,238)]/70 line-clamp-3">{movie.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
