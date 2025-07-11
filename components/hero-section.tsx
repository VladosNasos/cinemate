/* components/hero-section.tsx */
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import api from "@/lib/api"
import VideoPlayerModal from "@/components/video-player-modal"

/* ---------- тип слайда ---------- */
interface Slide {
  id: number
  title: string
  description?: string
  image: string
  genre?: string
  year?: string
  rating?: string
  videoUrl?: string
  trailerUrl?: string
}

/* ---------- DTO → Slide ---------- */
const mapDto = (d: any): Slide => ({
  id: d.id,
  title: d.name,
  description: d.description,
  image: d.posterUrl,
  genre: d.contentType,
  year: d.releaseDate ? new Date(d.releaseDate).getFullYear().toString() : undefined,
  rating: d.ageRating,
})

/* ---------- details (через локальный прокси, без токена) ---------- */
async function fetchDetails(id: number) {
  try {
    const { data } = await api.get(`/contents/${id}`, {
      baseURL: "/api/v1",
      headers: { disableAuth: true },
    })
    return {
      description: data.description,
      videoUrl: data.videoUrl,
      trailerUrl: data.trailerUrl,
    }
  } catch {
    return {}
  }
}

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [current, setCurrent] = useState(0)
  const [lock, setLock] = useState(false)

  /* player */
  const [playerSrc, setSrc] = useState("")
  const [open, setOpen] = useState(false)

  /* ---------- load slides ---------- */
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get("/contents/random", {
          params: { count: 3 },
          baseURL: "/api/v1",
          headers: { disableAuth: true },
        })

        const basic: Slide[] = data.map(mapDto)

        const rich = await Promise.all(
          basic.map(async (s) => ({ ...s, ...(await fetchDetails(s.id)) })),
        )

        setSlides(rich)
      } catch {
        setSlides([
          {
            id: 0,
            title: "Welcome to Cinemate",
            description: "Discover top movies and series, all in one place.",
            image: "/placeholder.svg",
            genre: "Adventure",
            year: "2025",
            rating: "PG-13",
          },
        ])
      }
    })()
  }, [])

  const count = slides.length
  const next = useCallback(() => !lock && count && setCurrent((p) => (p + 1) % count), [lock, count])
  const prev = useCallback(() => !lock && count && setCurrent((p) => (p ? p - 1 : count - 1)), [lock, count])
  const goTo = (i: number) => !lock && i !== current && setCurrent(i)

  useEffect(() => {
    if (!count) return
    setLock(true)
    const t = setTimeout(() => setLock(false), 500)
    return () => clearTimeout(t)
  }, [current, count])

  const intRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (!count) return
    if (intRef.current) clearInterval(intRef.current)
    intRef.current = setInterval(next, 7000)
    return () => { if (intRef.current) clearInterval(intRef.current) }
  }, [current, next, count])

  if (!count) return <div className="h-[600px] mt-16 bg-black" />

  const slide   = slides[current]
  const canPlay = Boolean(slide.videoUrl || slide.trailerUrl)

  return (
    <>
      <div className="relative w-full h-[600px] mt-16">
        <AnimatePresence mode="wait">
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center space-x-2 mb-3">
                  {slide.genre && <span className="text-primary font-medium">{slide.genre}</span>}
                  {slide.genre && slide.year && <span className="w-1 h-1 bg-gray-500 rounded-full" />}
                  {slide.year && <span className="text-gray-300">{slide.year}</span>}
                  {(slide.genre || slide.year) && slide.rating && (
                    <>
                      <span className="w-1 h-1 bg-gray-500 rounded-full" />
                      <span className="border border-gray-500 text-gray-300 text-xs px-1">{slide.rating}</span>
                    </>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                {slide.description && <p className="text-lg text-gray-300 max-w-xl mb-6">{slide.description}</p>}

                <div className="flex space-x-4">
                  <button
                    disabled={!canPlay}
                    onClick={() => { if (canPlay) { setSrc(slide.videoUrl || slide.trailerUrl || ""); setOpen(true) } }}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-40 text-white px-6 py-2 rounded-sm flex items-center space-x-2 transition-colors"
                  >
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
        </AnimatePresence>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-6" : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full opacity-0 hover:opacity-100 focus:opacity-100">
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full opacity-0 hover:opacity-100 focus:opacity-100">
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <VideoPlayerModal
  src={playerSrc}
  isOpen={open}
  onClose={() => setOpen(false)}
  contentId={slide.id}
/>
    </>
  )
}
