
export const dynamic = 'force-dynamic' 

import Navbar          from "@/components/navbar"
import HeroSection     from "@/components/hero-section"
import Footer          from "@/components/footer"
import ContentCarousel from "@/components/content-carousel"
import GenreShowcase   from "@/components/genre-showcase"
import { Movie }       from "@/components/movie-detail-modal"

/* базовый адрес без /api/v1 */
const API_ROOT =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/i, "") ||
  "http://cinemate.ddns.net:8081"

/* DTO, приходящее от бэка */
interface ContentDto {
  id:           number
  name:         string
  contentType:  string
  posterUrl:    string
  trailerUrl?:  string
  videoUrl?:    string
  description?: string
  durationMin?: number
  ageRating?:   string
  releaseDate?: string
  actors?:      number[]
  genres?:      number[]
  warnings?:    number[]
  rating?:      number
}

/* dto → Movie */
const mapToMovie = (c: ContentDto): Movie => ({
  id:          c.id,
  image:       c.posterUrl,
  title:       c.name,
  description: c.description,
  durationMin: c.durationMin,
  ageRating:   c.ageRating,
  genre:       c.contentType,
  year:        c.releaseDate ? new Date(c.releaseDate).getFullYear().toString() : undefined,
  actors:      c.actors,
  genres:      c.genres,
  warnings:    c.warnings,
  rating:      c.rating,
  videoUrl:    c.videoUrl,
  trailerUrl:  c.trailerUrl,
})

/* utility: маленький shuffle */
const shuffle = <T,>(arr: T[]) =>
  arr
    .map((v) => [Math.random(), v] as const)
    .sort((a, b) => a[0] - b[0])
    .map(([, v]) => v)

/* запрашиваем N случайных фильмов, гарантируя уникальность только ВНУТРИ списка */
async function fetchRandomMovies(count: number): Promise<Movie[]> {
  const res = await fetch(`${API_ROOT}/api/v1/contents/random?count=${count}`)
  if (!res.ok) return []

  const movies = (await res.json() as ContentDto[]).map(mapToMovie)

  /* на случай, если бэкенд прислал дубликаты — оставляем по одному */
  const unique = new Map<number, Movie>()
  movies.forEach((m) => unique.set(m.id, m))

  /* добираем, если после удаления дубликатов оказалось меньше, чем надо */
  if (unique.size < count) {
    const extra = await fetchRandomMovies(count - unique.size)
    extra.forEach((m) => unique.set(m.id, m))
  }

  /* возвращаем ровно count элементов в случайном порядке */
  return shuffle(Array.from(unique.values())).slice(0, count)
}

/* ------------------------------------------------------
                       Home page
-------------------------------------------------------*/
export default async function HomePage() {
  /* три независимые выборки, получаем параллельно  */
  const [
    continueWatching,
    recommendations,
    detectives,
  ] = await Promise.all([
    fetchRandomMovies(8),
    fetchRandomMovies(8),
    fetchRandomMovies(8),
  ])

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />

      <div className="container mx-auto px-4 py-8 space-y-16">
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

        <GenreShowcase />
      </div>

      <Footer />
    </main>
  )
}
