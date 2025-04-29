"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Grid, LayoutList } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Movie {
  id: number
  image: string
  title: string
  genre?: string
  year?: string
  rating?: string
}

interface ContentCarouselProps {
  title: string
  movies: Movie[]
  hasFilters?: boolean
}

export default function ContentCarousel({ title, movies, hasFilters = false }: ContentCarouselProps) {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")
  const [currentPage, setCurrentPage] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Extract all unique genres from movies
  const allGenres = Array.from(new Set(movies.map((movie) => movie.genre).filter(Boolean)))

  // Items per page based on view mode
  const itemsPerPage = viewMode === "carousel" ? 5 : 10
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage)

  // Handle filter changes
  const toggleFilter = (genre: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre)
      } else {
        return [...prev, genre]
      }
    })
  }

  // Apply filters
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredMovies(movies)
    } else {
      setFilteredMovies(movies.filter((movie) => movie.genre && activeFilters.includes(movie.genre)))
    }
    setCurrentPage(0)
  }, [activeFilters, movies])

  // Navigation functions
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <div className="flex items-center gap-2">
          {hasFilters && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 px-4 bg-transparent border-gray-700 text-white hover:bg-gray-800"
                >
                  Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-700">
                {allGenres.map((genre) => (
                  <DropdownMenuItem
                    key={genre}
                    className={`cursor-pointer ${
                      activeFilters.includes(genre || "")
                        ? "bg-primary/20 text-primary"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => genre && toggleFilter(genre)}
                  >
                    {genre}
                  </DropdownMenuItem>
                ))}
                {activeFilters.length > 0 && (
                  <DropdownMenuItem
                    className="border-t border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={() => setActiveFilters([])}
                  >
                    Clear filters
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="flex bg-gray-900 rounded-md border border-gray-700 overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-none ${viewMode === "carousel" ? "bg-gray-800" : "bg-transparent"}`}
              onClick={() => setViewMode("carousel")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-none ${viewMode === "grid" ? "bg-gray-800" : "bg-transparent"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-10 text-center">
          <p className="text-gray-400">No movies found matching your filters.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setActiveFilters([])}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="relative group" ref={carouselRef}>
          <div className="overflow-hidden">
            <motion.div
              className={`grid gap-4 ${
                viewMode === "carousel"
                  ? "grid-flow-col auto-cols-[calc(20%-12px)]"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              }`}
              initial={false}
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {filteredMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="relative aspect-video rounded-lg overflow-hidden group/item"
                  whileHover={{ scale: 1.05, zIndex: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-medium mb-1">{movie.title}</h3>
                      {movie.genre && <p className="text-sm text-primary">{movie.genre}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {viewMode === "carousel" && (
            <>
              {currentPage > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-black/50 hover:bg-black/70 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevPage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}

              {currentPage < totalPages - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-black/50 hover:bg-black/70 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextPage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}
            </>
          )}

          {viewMode === "grid" && totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    currentPage === index ? "w-6 bg-primary" : "w-1.5 bg-gray-600"
                  }`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

