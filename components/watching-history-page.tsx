"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WatchingHistoryGrid } from "@/components/watching-history-grid"
import { ContentRow } from "@/components/ui/content-row"
import Navbar from "./navbar"

// Type definition matching your DTO
export interface ContentViewHistoryDto {
  contentId: number
  contentName: string
  contentType: string
  posterUrl: string
  durationMin: number
  ageRating: string
  viewedAt: string
}

// Mock data for demonstration - replace with actual API calls
const mockThisWeekData: ContentViewHistoryDto[] = [
  {
    contentId: 1,
    contentName: "1917",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 119,
    ageRating: "R",
    viewedAt: "2024-01-20T10:30:00Z",
  },
  {
    contentId: 2,
    contentName: "Top Gun: Maverick",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 131,
    ageRating: "PG-13",
    viewedAt: "2024-01-19T20:15:00Z",
  },
  {
    contentId: 3,
    contentName: "Dunkirk",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 106,
    ageRating: "PG-13",
    viewedAt: "2024-01-18T14:45:00Z",
  },
]

const mockAllHistoryData: ContentViewHistoryDto[] = [
  ...mockThisWeekData,
  {
    contentId: 4,
    contentName: "Saving Private Ryan",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 169,
    ageRating: "R",
    viewedAt: "2024-01-15T19:20:00Z",
  },
  {
    contentId: 5,
    contentName: "Apocalypse Now",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 147,
    ageRating: "R",
    viewedAt: "2024-01-14T21:00:00Z",
  },
  {
    contentId: 6,
    contentName: "Black Hawk Down",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 144,
    ageRating: "R",
    viewedAt: "2024-01-12T16:30:00Z",
  },
  // Add more mock data to fill the grid
  ...Array.from({ length: 15 }, (_, i) => ({
    contentId: 7 + i,
    contentName: `War Movie ${i + 1}`,
    contentType: "MOVIE" as const,
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 120 + i * 5,
    ageRating: i % 2 === 0 ? "R" : "PG-13",
    viewedAt: `2024-01-${10 - i}T${15 + i}:00:00Z`,
  })),
]

const mockRecommendationsData: ContentViewHistoryDto[] = [
  {
    contentId: 101,
    contentName: "The Pianist",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 150,
    ageRating: "R",
    viewedAt: "",
  },
  {
    contentId: 102,
    contentName: "Casablanca",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 102,
    ageRating: "PG",
    viewedAt: "",
  },
  {
    contentId: 103,
    contentName: "The Great Escape",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 172,
    ageRating: "PG",
    viewedAt: "",
  },
  {
    contentId: 104,
    contentName: "Platoon",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 120,
    ageRating: "R",
    viewedAt: "",
  },
]

export function WatchingHistoryPage() {
  const [thisWeekHistory, setThisWeekHistory] = useState<ContentViewHistoryDto[]>([])
  const [allHistory, setAllHistory] = useState<ContentViewHistoryDto[]>([])
  const [recommendations, setRecommendations] = useState<ContentViewHistoryDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    // Replace with actual API calls
    const fetchWatchingHistory = async () => {
      try {
        setIsLoading(true)

        // Simulate API calls - replace with your actual endpoints
        // const thisWeekResponse = await fetch('/api/watching-history/this-week')
        // const allHistoryResponse = await fetch('/api/watching-history/all')
        // const recommendationsResponse = await fetch('/api/recommendations')

        // For now, using mock data
        setThisWeekHistory(mockThisWeekData)
        setAllHistory(mockAllHistoryData)
        setRecommendations(mockRecommendationsData)
        // For testing empty state, replace with:
        // setThisWeekHistory([])
        // setAllHistory([])
        // setRecommendations([])
      } catch (error) {
        console.error("Error fetching watching history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWatchingHistory()
  }, [])

  const handleContentClick = (content: ContentViewHistoryDto) => {
    // Handle content click - navigate to detail page or open modal
    console.log("Content clicked:", content)
    // Example: router.push(`/content/${content.contentId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-white text-xl">Loading your watching history...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Your existing Navbar */}
      <Navbar />

      {/* Hero Section with Clock Background */}
      <main className="flex-1 pt-20">
        <div
          className="relative h-96 flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/placeholder.svg?height=400&width=1200')`,
          }}
        >
          <div className="text-center z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-4 text-white"
            >
              Your watching history
            </motion.h1>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          {/* Check if user has any watching history */}
          {allHistory.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-[#161616] rounded-full flex items-center justify-center">
                  <div className="text-6xl text-gray-500">🎬</div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">You haven't watched anything yet!</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md">
                  Start exploring our vast collection of movies and shows to build your watching history.
                </p>
                <Link
                  href="/"
                  className="bg-[#1CA2AA] hover:bg-[#189aa1] text-white font-medium px-8 py-3 rounded transition-colors"
                >
                  Browse Content
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* This Week Section */}
              {thisWeekHistory.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold mb-6 text-white">This week</h2>
                  <ContentRow content={thisWeekHistory} onContentClick={handleContentClick} />
                </motion.section>
              )}

              {/* All History Grid */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <WatchingHistoryGrid content={allHistory} onContentClick={handleContentClick} showMore={showMore} />

                {allHistory.length > 12 && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => setShowMore(!showMore)}
                      className="text-white hover:text-[#1CA2AA] border border-gray-600 hover:border-[#1CA2AA] bg-transparent hover:bg-transparent"
                    >
                      <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${showMore ? "rotate-180" : ""}`} />
                      {showMore ? "Show Less" : "Show More"}
                    </Button>
                  </div>
                )}
              </motion.section>

              {/* Recommendations Section */}
              {recommendations.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl font-bold mb-6 text-white">Recommendations for you</h2>
                  <ContentRow content={recommendations} onContentClick={handleContentClick} />
                </motion.section>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#000000] text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">Questions? Call 1-844-505-2993</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">
                FAQ
              </Link>
              <Link href="#" className="block hover:underline">
                Investor Relations
              </Link>
              <Link href="#" className="block hover:underline">
                Buy Gift Cards
              </Link>
              <Link href="#" className="block hover:underline">
                Cookie Preferences
              </Link>
              <Link href="#" className="block hover:underline">
                Legal Notices
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">
                Help Center
              </Link>
              <Link href="#" className="block hover:underline">
                Jobs
              </Link>
              <Link href="#" className="block hover:underline">
                Ways to Watch
              </Link>
              <Link href="#" className="block hover:underline">
                Corporate Information
              </Link>
              <Link href="#" className="block hover:underline">
                Only on Netflix
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">
                Account
              </Link>
              <Link href="#" className="block hover:underline">
                Netflix Shop
              </Link>
              <Link href="#" className="block hover:underline">
                Terms of Use
              </Link>
              <Link href="#" className="block hover:underline">
                Contact Us
              </Link>
              <Link href="#" className="block hover:underline">
                Do Not Sell or Share My Personal Information
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">
                Media Center
              </Link>
              <Link href="#" className="block hover:underline">
                Redeem Gift Cards
              </Link>
              <Link href="#" className="block hover:underline">
                Privacy
              </Link>
              <Link href="#" className="block hover:underline">
                Speed Test
              </Link>
              <Link href="#" className="block hover:underline">
                Ad Choices
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
