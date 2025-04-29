"use client"

import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const heroSlides = [
  {
    id: 1,
    title: "New top content here",
    description: "Discover the latest and greatest films and series, all in one place.",
    image: "/placeholder.svg?height=600&width=1920",
    genre: "Action, Adventure",
    year: "2023",
    rating: "PG-13",
  },
  {
    id: 2,
    title: "Blockbuster Movies",
    description: "Watch the biggest blockbusters with stunning visuals and immersive sound.",
    image: "/placeholder.svg?height=600&width=1920",
    genre: "Sci-Fi, Fantasy",
    year: "2023",
    rating: "PG-13",
  },
  {
    id: 3,
    title: "Award-Winning Series",
    description: "Binge-watch critically acclaimed series that everyone is talking about.",
    image: "/placeholder.svg?height=600&width=1920",
    genre: "Drama, Thriller",
    year: "2023",
    rating: "TV-MA",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    }
  }

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
    }
  }

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true)
      setCurrentSlide(index)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentSlide])

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000)
    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <div className="relative w-full h-[600px] mt-16">
      <AnimatePresence mode="wait">
        {heroSlides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="relative container mx-auto h-full flex flex-col justify-center px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-primary font-medium">{slide.genre}</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span className="text-gray-300">{slide.year}</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span className="border border-gray-500 text-gray-300 text-xs px-1">{slide.rating}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-lg text-gray-300 max-w-xl mb-6">{slide.description}</p>

                    <div className="flex space-x-4">
                      <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-sm flex items-center space-x-2 transition-colors">
                        <Play className="h-4 w-4" />
                        <span>Watch Now</span>
                      </button>
                      <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-sm flex items-center space-x-2 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Add to List</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary w-6" : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-opacity duration-300 opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-opacity duration-300 opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  )
}

