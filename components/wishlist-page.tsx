"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Plus, Filter, Grid, List } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import Navbar from "@/components/navbar"
import { WishlistGrid } from "@/components/wishlist-grid"
import { WishlistList } from "@/components/wishlist-list"
import MovieDetailModal, { Movie } from "@/components/movie-detail-modal"

import {
  getMyWishlist,
  removeFromWishlist as apiRemove,
  WishlistDto,
} from "@/lib/wishlist"

/* fallback, если API упало */
const mockWishlistData: WishlistDto[] = [
  {
    id: 0,
    contentId: 1,
    contentName: "Dune: Part Two",
    contentType: "MOVIE",
    posterUrl: "/placeholder.svg",
    durationMin: 166,
    ageRating: "PG-13",
    addedAt: "2024-01-20T10:30:00Z",
  },
]

export default function WishlistPage() {
  const router = useRouter()

  /* ---------------- state ---------------- */
  const [items, setItems]         = useState<WishlistDto[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const [viewMode, setViewMode]   = useState<"grid" | "list">("grid")
  const [filter, setFilter]       = useState<"ALL" | "MOVIE" | "SERIES">("ALL")
  const [sortBy, setSortBy]       = useState<"addedAt" | "name" | "duration">("addedAt")

  const [page, setPage]           = useState(1)
  const [totalPages, setTotal]    = useState(1)

  /* -------- modal state -------- */
  const [selected, setSelected]   = useState<Movie | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (dto: WishlistDto) => {
    const m: Movie = {
      id: dto.contentId,
      image: dto.posterUrl,
      title: dto.contentName,
      genre: dto.contentType,
      durationMin: dto.durationMin,
      ageRating: dto.ageRating,
      year: new Date(dto.addedAt).getFullYear().toString(),
    }
    setSelected(m)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "auto"
  }

  /* ---------------- fetch ---------------- */
  useEffect(() => {
    fetchWishlist(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sortBy])

  async function fetchWishlist(p = 1) {
    try {
      setLoading(true)
      setError(null)

      const resp = await getMyWishlist({
        page: p,
        size: 12,
        sortBy,
        isAsc: false,
      })

      setItems(resp.data)
      setPage(resp.currentPage)
      setTotal(resp.totalPages)
    } catch (e) {
      console.error(e)
      setError("Failed to load wishlist — showing cached data")
      setItems(mockWishlistData)
    } finally {
      setLoading(false)
    }
  }

  async function handleRemove(id: number) {
    try {
      await apiRemove(id)
      setItems((prev) => prev.filter((it) => it.contentId !== id))
    } catch (e) {
      console.error(e)
      setError("Failed to remove item")
    }
  }

  /* ---------------- filtering / sorting ---------------- */
  const shown = items
    .filter((it) => filter === "ALL" || it.contentType === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.contentName.localeCompare(b.contentName)
        case "duration":
          return b.durationMin - a.durationMin
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      }
    })

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-white text-xl">Loading your wishlist…</div>
        </div>
      </div>
    )
  }

  if (error && items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="text-red-400 text-xl mb-4">⚠️ {error}</div>
            <button
              onClick={() => fetchWishlist(page)}
              className="bg-[#1CA2AA] hover:bg-[#189aa1] text-white font-medium px-6 py-2 rounded transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <Navbar />

        {/* HERO */}
        <main className="flex-1 pt-20">
          <div className="relative bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-red-900/20 py-16">
            <div className="container mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">My Wishlist</h1>
                      <p className="text-gray-300 text-lg">
                        {items.length} {items.length === 1 ? "item" : "items"} saved
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
                </div>
              </motion.div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="container mx-auto px-6 py-8">
            {items.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-8">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full flex items-center justify-center">
                      <Heart className="w-16 h-16 text-pink-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-md">
                      Start adding movies and shows you want to watch to build your personal list.
                    </p>
                    <Link
                      href="/"
                      className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300"
                    >
                      Browse Content
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {/* CONTROLS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as typeof filter)}
                        className="bg-[#161616] border border-gray-600 text-white rounded px-3 py-2 text-sm"
                      >
                        <option value="ALL">All Types</option>
                        <option value="MOVIE">Movies</option>
                        <option value="SERIES">Series</option>
                      </select>
                    </div>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="bg-[#161616] border border-gray-600 text-white rounded px-3 py-2 text-sm"
                    >
                      <option value="addedAt">Recently Added</option>
                      <option value="name">Name</option>
                      <option value="duration">Duration</option>
                    </select>
                  </div>

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

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {viewMode === "grid" ? (
                    <WishlistGrid
                      items={shown}
                      onContentClick={openModal}
                      onRemoveFromWishlist={handleRemove}
                    />
                  ) : (
                    <WishlistList
                      items={shown}
                      onContentClick={openModal}        
                      onRemoveFromWishlist={handleRemove}
                    />
                  )}
                </motion.div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* MODAL */}
      <MovieDetailModal
        movie={selected || undefined}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  )
}
