import React from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"
import ContentCarousel from "@/components/content-carousel"
import { Movie } from "@/components/movie-detail-modal"

/* ------------------------------------------------------------
   Базовый URL бэкенда (без /api/v1 — добавим ниже)
-------------------------------------------------------------*/
const API_ROOT =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/i, "") ||
  "http://cinemate.ddns.net:8081"

/* то, что реально возвращает /contents/random */
interface ContentDto {
  id: number
  name: string
  contentType: string
  posterUrl: string
  trailerUrl?: string
  videoUrl?: string
  description?: string
  durationMin?: number
  ageRating?: string
  releaseDate?: string
  actors?: number[]
  genres?: number[]
  warnings?: number[]
  rating?: number
}

/* ------------------------------------------------------------
   Утилита: получаем N случайных фильмов и маппим в Movie
-------------------------------------------------------------*/
async function fetchRandomContents(count: number): Promise<Movie[]> {
  const res = await fetch(`${API_ROOT}/api/v1/contents/random?count=${count}`)
  if (!res.ok) return []

  const items = (await res.json()) as ContentDto[]

  return items.map((c) => ({
    id: c.id,
    image: c.posterUrl,
    title: c.name,
    description: c.description,
    durationMin: c.durationMin,
    ageRating: c.ageRating,
    genre: c.contentType,
    year: c.releaseDate
      ? new Date(c.releaseDate).getFullYear().toString()
      : undefined,
    actors: c.actors,
    genres: c.genres,
    warnings: c.warnings,
    rating: c.rating,
    videoUrl: c.videoUrl,
    trailerUrl: c.trailerUrl,
  }))
}

/* ------------------------------------------------------------
   Главная страница
-------------------------------------------------------------*/
export default async function HomePage() {
  // три выборки параллельно
  const [continueWatching, recommendations, detectives] =
    await Promise.all([
      fetchRandomContents(8),
      fetchRandomContents(8),
      fetchRandomContents(8),
    ])

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <ContentCarousel
          title="Continue watching"
          movies={continueWatching}
          hasFilters
        />
        <ContentCarousel
          title="Recommendations for you"
          movies={recommendations}
          hasFilters
        />
        <ContentCarousel
          title="Top detectives of this year"
          movies={detectives}
          hasFilters
        />
      </div>

      <Footer />
    </main>
  )
}
