import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ContentCarousel from "@/components/content-carousel"
import Footer from "@/components/footer"

export default function Home() {
  const continueWatching = [
    { id: 1, image: "/placeholder.svg?height=180&width=320", title: "Spider-Man", genre: "Action" },
    { id: 2, image: "/placeholder.svg?height=180&width=320", title: "Iron Man", genre: "Action" },
    { id: 3, image: "/placeholder.svg?height=180&width=320", title: "Doctor Strange", genre: "Sci-Fi" },
    { id: 4, image: "/placeholder.svg?height=180&width=320", title: "Captain America", genre: "Action" },
    { id: 5, image: "/placeholder.svg?height=180&width=320", title: "Thor", genre: "Action" },
    { id: 6, image: "/placeholder.svg?height=180&width=320", title: "Black Widow", genre: "Action" },
    { id: 7, image: "/placeholder.svg?height=180&width=320", title: "Hawkeye", genre: "Action" },
    { id: 8, image: "/placeholder.svg?height=180&width=320", title: "Loki", genre: "Sci-Fi" },
  ]

  const recommendations = [
    { id: 9, image: "/placeholder.svg?height=180&width=320", title: "Documentary Now!", genre: "Documentary" },
    { id: 10, image: "/placeholder.svg?height=180&width=320", title: "Mad Max", genre: "Action" },
    { id: 11, image: "/placeholder.svg?height=180&width=320", title: "Behind the Scenes", genre: "Documentary" },
    { id: 12, image: "/placeholder.svg?height=180&width=320", title: "Filmmaking", genre: "Documentary" },
    { id: 13, image: "/placeholder.svg?height=180&width=320", title: "The Crown", genre: "Drama" },
    { id: 14, image: "/placeholder.svg?height=180&width=320", title: "Breaking Bad", genre: "Drama" },
    { id: 15, image: "/placeholder.svg?height=180&width=320", title: "Stranger Things", genre: "Sci-Fi" },
    { id: 16, image: "/placeholder.svg?height=180&width=320", title: "The Witcher", genre: "Fantasy" },
  ]

  const detectives = [
    { id: 17, image: "/placeholder.svg?height=180&width=320", title: "Sherlock", genre: "Crime" },
    { id: 18, image: "/placeholder.svg?height=180&width=320", title: "True Detective", genre: "Crime" },
    { id: 19, image: "/placeholder.svg?height=180&width=320", title: "Luther", genre: "Crime" },
    { id: 20, image: "/placeholder.svg?height=180&width=320", title: "Mindhunter", genre: "Crime" },
    { id: 21, image: "/placeholder.svg?height=180&width=320", title: "Mare of Easttown", genre: "Crime" },
    { id: 22, image: "/placeholder.svg?height=180&width=320", title: "The Killing", genre: "Crime" },
    { id: 23, image: "/placeholder.svg?height=180&width=320", title: "Broadchurch", genre: "Crime" },
    { id: 24, image: "/placeholder.svg?height=180&width=320", title: "Bosch", genre: "Crime" },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <ContentCarousel title="Continue watching" movies={continueWatching} hasFilters={true} />

        <ContentCarousel title="Recommendations for you" movies={recommendations} hasFilters={true} />

        <ContentCarousel title="Top detectives of this year" movies={detectives} hasFilters={true} />
      </div>

      <Footer />
    </main>
  )
}

