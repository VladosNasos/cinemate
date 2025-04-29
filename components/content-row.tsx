"use client"

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

interface Movie {
  id: number
  image: string
  title: string
  genre?: string
}

interface ContentRowProps {
  title: string
  movies: Movie[]
  filterOption?: boolean
}

export default function ContentRow({ title, movies, filterOption = false }: ContentRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [filteredMovies, setFilteredMovies] = useState(movies)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Horror"]

  useEffect(() => {
    // Check if we need to show the right arrow initially
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current
      setShowRightArrow(scrollWidth > clientWidth)
    }
  }, [filteredMovies])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.clientWidth / 2, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth / 2, behavior: "smooth" })
    }
  }

  const handleFilterChange = (genre: string) => {
    setSelectedGenre(genre === "All" ? null : genre)

    if (genre === "All") {
      setFilteredMovies(movies)
    } else {
      // For demo purposes, we'll filter randomly since we don't have real genre data
      // In a real app, you would filter based on actual genre data
      const filtered = movies.filter(
        (movie) =>
          movie.genre === genre ||
          // If no genre is set, randomly assign some movies to the selected genre
          (!movie.genre && movie.id % genres.indexOf(genre || "Action") === 0),
      )
      setFilteredMovies(filtered.length > 0 ? filtered : movies.slice(0, 3))
    }
  }

  return (
    <section className="mb-12 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>

        {filterOption && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:text-white transition-colors duration-200"
              >
                {selectedGenre ? `Genre: ${selectedGenre}` : "Filter by genres"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
              {genres.map((genre) => (
                <DropdownMenuItem
                  key={genre}
                  className="hover:bg-gray-800 cursor-pointer transition-colors duration-150"
                  onClick={() => handleFilterChange(genre)}
                >
                  {genre}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="relative group">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 -ml-5 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-[250px] relative group/item overflow-hidden rounded-md cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:shadow-xl"
            >
              <div className="aspect-video relative">
                <Image
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover/item:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300 ease-in-out flex items-end">
                <div className="p-3 transform translate-y-2 group-hover/item:translate-y-0 transition-transform duration-300 ease-out w-full">
                  <h3 className="text-lg font-medium">{movie.title}</h3>
                  {movie.genre && <p className="text-sm text-gray-300">{movie.genre}</p>}
                  <div className="flex space-x-2 mt-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 delay-100">
                    <button className="bg-primary hover:bg-primary/90 text-white px-3 py-1 text-xs rounded transition-colors duration-200">
                      Play
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 text-xs rounded transition-colors duration-200">
                      + My List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredMovies.length === 0 && (
            <div className="flex-1 flex items-center justify-center h-32 text-gray-500">
              No movies found for this filter.
            </div>
          )}
        </div>

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 -mr-5 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </section>
  )
}

