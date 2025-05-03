"use client"

import ContentCarousel from "../components/content-carousel"

const movies = [
  {
    id: 1,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 1",
    genre: "Action",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 2",
    genre: "Comedy",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 3",
    genre: "Action",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 4",
    genre: "Drama",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 5",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 6",
    genre: "Comedy",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 7",
    genre: "Thriller",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 8",
    genre: "Action",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 9",
    genre: "Sci-Fi",
  },
  {
    id: 10,
    image: "/placeholder.svg?height=180&width=320",
    title: "Movie 10",
    genre: "Drama",
  },
]

export default function Page() {
  return (
    <main className="container mx-auto py-10">
      <ContentCarousel title="Featured Movies" movies={movies} hasFilters={true} />
      <ContentCarousel title="New Releases" movies={movies} />
    </main>
  )
}
