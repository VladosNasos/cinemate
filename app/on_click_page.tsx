"use client"

import ContentCarousel from "../components/content-carousel"

const movies = [
  {
    id: 1,
    image: "/placeholder.svg?height=180&width=320",
    title: "Captain America",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=180&width=320",
    title: "Spider-Man",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=180&width=320",
    title: "Deadpool",
    genre: "Comedy",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=180&width=320",
    title: "Groot",
    genre: "Sci-Fi",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=180&width=320",
    title: "Batman",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=180&width=320",
    title: "Doctor Strange",
    genre: "Sci-Fi",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=180&width=320",
    title: "Superman",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=180&width=320",
    title: "Wonder Woman",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=180&width=320",
    title: "The Flash",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 10,
    image: "/placeholder.svg?height=180&width=320",
    title: "Aquaman",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 11,
    image: "/placeholder.svg?height=180&width=320",
    title: "Cyborg",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
  {
    id: 12,
    image: "/placeholder.svg?height=180&width=320",
    title: "Green Lantern",
    genre: "Action",
    year: "2005",
    rating: "7.8",
  },
]

export default function Page() {
  return (
    <main className="container mx-auto py-10">
      <ContentCarousel title="Marvel Movies" movies={movies} hasFilters={true} />
      <ContentCarousel title="DC Movies" movies={movies} />
    </main>
  )
}
