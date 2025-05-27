"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Plus, Filter, Grid, List } from "lucide-react"
import { motion } from "framer-motion"
import { WishlistGrid } from "@/components/wishlist-grid"
import { WishlistList } from "@/components/wishlist-list"
import Navbar from "./navbar"

// Type definition matching your DTO
export interface WishlistDto {
  contentId: number
  contentName: string
  contentType: string
  posterUrl: string
  durationMin: number
  ageRating: string
  addedAt: string
}

// API Response type
interface WishlistResponse {
  data: WishlistDto[]
  totalElements: number
  totalPages: number
  currentPage: number
  pageSize: number
}

// Mock data for demonstration
const mockWishlistData: WishlistDto[] = [
  {
    contentId: 1,
    contentName: "Dune: Part Two",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 166,
    ageRating: "PG-13",
    addedAt: "2024-01-20T10:30:00Z",
  },
  {
    contentId: 2,
    contentName: "The Crown",
    contentType: "SERIES",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 60,
    ageRating: "TV-MA",
    addedAt: "2024-01-19T20:15:00Z",
  },
  {
    contentId: 3,
    contentName: "Oppenheimer",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 180,
    ageRating: "R",
    addedAt: "2024-01-18T14:45:00Z",
  },
  {
    contentId: 4,
    contentName: "Stranger Things",
    contentType: "SERIES",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 50,
    ageRating: "TV-14",
    addedAt: "2024-01-17T16:20:00Z",
  },
  {
    contentId: 5,
    contentName: "The Batman",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 176,
    ageRating: "PG-13",
    addedAt: "2024-01-16T12:10:00Z",
  },
  {
    contentId: 6,
    contentName: "House of the Dragon",
    contentType: "SERIES",
    posterUrl: "/placeholder.svg?height=300&width=200",
    durationMin: 68,
    ageRating: "TV-MA",
    addedAt: "2024-01-15T18:30:00Z",
  },
]

export function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState<"ALL" | "MOVIE" | "SERIES">("ALL")
  const [sortBy, setSortBy] = useState<"addedAt" | "name" | "duration">("addedAt")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchWishlist()
  }, [filterType, sortBy])

  const fetchWishlist = async (page = 1) => {
    try {
      setIsLoading(true)
      setError(null)

      // For now, we'll use mock data since the API might not be ready
      // When your API is ready, uncomment the code below and remove the mock data usage

      /*
      // API call to your backend
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const contentTypeParam = filterType === "ALL" ? "" : `&contentType=${filterType}`
      const response = await fetch(
        `/api/v1/wishlist/me?page=${page}&size=12&sortBy=${sortBy}&isAsc=false${contentTypeParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Wishlist endpoint not found. Please check your API configuration.")
        }
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.")
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Check if the API endpoint exists.")
      }

      const data: WishlistResponse = await response.json()
      setWishlistItems(data.data || [])
      setCurrentPage(data.currentPage || 1)
      setTotalPages(data.totalPages || 1)
      */

      // Using mock data for demonstration
      let filteredData = mockWishlistData
      if (filterType !== "ALL") {
        filteredData = mockWishlistData.filter((item) => item.contentType === filterType)
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setWishlistItems(filteredData)
      setCurrentPage(1)
      setTotalPages(1)
    } catch (error) {
      console.error("Error fetching wishlist:", error)
      setError(error instanceof Error ? error.message : "Failed to load wishlist")

      // Fallback to mock data on error
      setWishlistItems(mockWishlistData)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContentClick = (content: WishlistDto) => {
    console.log("Content clicked:", content)
    // Navigate to content detail page
    // router.push(`/content/${content.contentId}`)
  }

  const handleRemoveFromWishlist = async (contentId: number) => {
    try {
      /*
      // API call to remove from wishlist
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`/api/v1/wishlist/me/${contentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to remove item from wishlist: ${response.status}`)
      }
      */

      // For demo, just remove from local state
      setWishlistItems((prev) => prev.filter((item) => item.contentId !== contentId))
    } catch (error) {
      console.error("Error removing from wishlist:", error)
      setError("Failed to remove item from wishlist")
    }
  }

  const filteredAndSortedItems = wishlistItems
    .filter((item) => filterType === "ALL" || item.contentType === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.contentName.localeCompare(b.contentName)
        case "duration":
          return b.durationMin - a.durationMin
        case "addedAt":
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      }
    })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-white text-xl">Loading your wishlist...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="text-red-400 text-xl mb-4">⚠️ Error Loading Wishlist</div>
            <div className="text-gray-400 mb-4">{error}</div>
            <button
              onClick={() => fetchWishlist()}
              className="bg-[#1CA2AA] hover:bg-[#189aa1] text-white font-medium px-6 py-2 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <div className="relative bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-red-900/20 py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">My Wishlist</h1>
                  <p className="text-gray-300 text-lg">
                    {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
                  </p>
                </div>
              </div>

              <Link
                href="/"
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add More</span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {wishlistItems.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full flex items-center justify-center">
                  <Heart className="w-16 h-16 text-pink-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md">
                  Start adding movies and shows you want to watch to build your personal collection.
                </p>
                <Link
                  href="/"
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Browse Content
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0"
              >
                <div className="flex items-center space-x-4">
                  {/* Filter */}
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as "ALL" | "MOVIE" | "SERIES")}
                      className="bg-[#161616] border border-gray-600 text-white rounded px-3 py-2 text-sm"
                    >
                      <option value="ALL">All Types</option>
                      <option value="MOVIE">Movies</option>
                      <option value="SERIES">Series</option>
                    </select>
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "addedAt" | "name" | "duration")}
                    className="bg-[#161616] border border-gray-600 text-white rounded px-3 py-2 text-sm"
                  >
                    <option value="addedAt">Recently Added</option>
                    <option value="name">Name</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-2 bg-[#161616] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "grid" ? "bg-[#1CA2AA] text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "list" ? "bg-[#1CA2AA] text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                {viewMode === "grid" ? (
                  <WishlistGrid
                    items={filteredAndSortedItems}
                    onContentClick={handleContentClick}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                  />
                ) : (
                  <WishlistList
                    items={filteredAndSortedItems}
                    onContentClick={handleContentClick}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                  />
                )}
              </motion.div>
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
