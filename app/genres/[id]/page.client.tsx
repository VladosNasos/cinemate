"use client"

import { useState }           from "react"
import Image                  from "next/image"
import { useRouter }          from "next/navigation"
import { Grid, List, Filter } from "lucide-react"
import { motion }             from "framer-motion"

import { Button }             from "@/components/ui/button"
import ContentCarousel        from "@/components/content-carousel"
import MovieDetailModal, { Movie } from "@/components/movie-detail-modal"

/* DTO с бэка (минимальное) */
interface ContentDto {
  id:          number
  name:        string
  contentType: string
  posterUrl:   string
  trailerUrl?: string
  videoUrl?:   string
  description?: string
  durationMin?: number
  ageRating?:   string
  releaseDate?: string
  rating?:      number
}

interface Props {
  genre:    { id: number; name: string; imageUrl?: string }
  rawItems: ContentDto[]
}

/* dto ➜ Movie для ContentCarousel / модалки */
const toMovie = (c: ContentDto): Movie => ({
  id:          c.id,
  image:       c.posterUrl,
  title:       c.name,
  description: c.description,
  durationMin: c.durationMin,
  ageRating:   c.ageRating,
  genre:       c.contentType,
  year:        c.releaseDate ? new Date(c.releaseDate).getFullYear().toString() : undefined,
  rating:      c.rating,
  videoUrl:    c.videoUrl,
  trailerUrl:  c.trailerUrl,
})

export default function GenreClientPage({ genre, rawItems }: Props) {
  const router = useRouter()

  /* view-mode & sorting */
  const [view, setView]  = useState<"grid" | "list">("grid")
  const [sort, setSort]  = useState<"name" | "year" | "duration">("name")

  /* модалка */
  const [current, setCur]  = useState<Movie | null>(null)
  const [open,    setOpen] = useState(false)

  const movies = rawItems
    .map(toMovie)
    .sort((a, b) => {
      switch (sort) {
        case "year":     return (b.year ?? "").localeCompare(a.year ?? "")
        case "duration": return (b.durationMin ?? 0) - (a.durationMin ?? 0)
        default:         return a.title.localeCompare(b.title)
      }
    })

  /* герой-секция */
  return (
    <>
      {/* HERO */}
      <section className="relative h-[360px]">
        <Image
          src={genre.imageUrl || "/placeholder.svg"}
          alt={genre.name}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-6"
          >
            <h1 className="text-5xl font-extrabold text-white mb-2">{genre.name}</h1>
            <p className="text-gray-300 text-lg">{movies.length} titles</p>
          </motion.div>
        </div>
      </section>

      {/* CONTROLS */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value as typeof sort)}
            className="bg-[#161616] border border-gray-600 text-white rounded px-3 py-2 text-sm"
          >
            <option value="name">Alphabetical</option>
            <option value="year">Year</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-[#161616] rounded-lg p-1 self-start md:self-auto">
          <Button
            variant="ghost"
            size="icon"
            className={`p-2 rounded ${view === "grid" ? "bg-[#1CA2AA] text-white" : "text-gray-400"}`}
            onClick={() => setView("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`p-2 rounded ${view === "list" ? "bg-[#1CA2AA] text-white" : "text-gray-400"}`}
            onClick={() => setView("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-6 pb-16">
        {view === "grid" ? (
          <ContentCarousel
            title=""
            movies={movies}
            hasFilters={false}
          />
        ) : (
          /* reuse WishlistList for list view — если нужно отдельное представление,
             подключите свой компонент */
          <div className="space-y-4">
            {movies.map(m => (
              <div
                key={m.id}
                className="flex bg-[#161616] rounded-lg overflow-hidden cursor-pointer hover:bg-[#222]"
                onClick={() => { setCur(m); setOpen(true) }}
              >
                <div className="relative w-40 aspect-video shrink-0">
                  <Image src={m.image || "/placeholder.svg"} alt={m.title} fill className="object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-white">{m.title}</h3>
                  {m.description && (
                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">{m.description}</p>
                  )}
                  <div className="mt-auto flex items-center gap-4 text-gray-400 text-sm">
                    {m.year && <span>{m.year}</span>}
                    {m.durationMin && <span>{Math.floor(m.durationMin / 60)}h {m.durationMin % 60}m</span>}
                    {m.ageRating && <span className="border px-1">{m.ageRating}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <MovieDetailModal
        movie={current || undefined}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
