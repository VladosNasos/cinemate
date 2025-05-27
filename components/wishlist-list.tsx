"use client"
import { Play, Heart, Clock, Calendar, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { WishlistDto } from "./wishlist-page"

interface WishlistListProps {
  items: WishlistDto[]
  onContentClick: (content: WishlistDto) => void
  onRemoveFromWishlist: (contentId: number) => void
}

export function WishlistList({ items, onContentClick, onRemoveFromWishlist }: WishlistListProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatAddedAt = (dateString: string) => {
    if (!dateString) return ""
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return ""
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.contentId}
          className="group bg-[#161616] rounded-lg p-4 hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer"
          onClick={() => onContentClick(item)}
        >
          <div className="flex items-center space-x-4">
            {/* Poster */}
            <div className="relative w-16 h-24 bg-[#222] rounded overflow-hidden flex-shrink-0">
              <img
                src={item.posterUrl || "/placeholder.svg"}
                alt={item.contentName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1 w-4 h-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white fill-white" />
              </div>
            </div>

            {/* Content Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg truncate group-hover:text-[#1CA2AA] transition-colors">
                    {item.contentName}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                    <span className="bg-[#1CA2AA] bg-opacity-90 text-white px-2 py-1 rounded text-xs">
                      {item.contentType}
                    </span>
                    <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {item.ageRating}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(item.durationMin)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 mt-2">
                    <Calendar className="w-3 h-3" />
                    <span>Added {formatAddedAt(item.addedAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onContentClick(item)
                    }}
                    className="w-10 h-10 bg-[#1CA2AA] hover:bg-[#189aa1] text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveFromWishlist(item.contentId)
                    }}
                    className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
