"use client"

import { useState } from "react"
import { Play, Heart, Clock, Calendar, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { WishlistDto } from "./wishlist-page"

interface WishlistCardProps {
  item: WishlistDto
  onClick: () => void
  onRemove: () => void
}

export function WishlistCard({ item, onClick, onRemove }: WishlistCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

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
    <div className="group cursor-pointer animate-fade-in transition-transform duration-300 hover:scale-105 hover:z-10 relative">
      <div className="relative aspect-[2/3] bg-[#161616] rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
        {!imageError ? (
          <img
            src={item.posterUrl || "/placeholder.svg"}
            alt={item.contentName}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#161616]">
            <div className="text-center text-gray-400">
              <div className="text-2xl mb-2">🎬</div>
              <div className="text-xs px-2">{item.contentName}</div>
            </div>
          </div>
        )}

        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-70 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Wishlist Heart */}
        <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-white fill-white" />
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center"
          onClick={onClick}
        >
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Age Rating Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {item.ageRating}
        </div>

        {/* Content Type Badge */}
        <div className="absolute bottom-2 left-2 bg-[#1CA2AA] bg-opacity-90 text-white text-xs px-2 py-1 rounded">
          {item.contentType}
        </div>

        {/* Content Info - Hidden by default, shown on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <h3 className="font-semibold text-sm line-clamp-2 text-white mb-2">{item.contentName}</h3>

          <div className="flex items-center text-xs text-gray-300 space-x-3">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(item.durationMin)}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatAddedAt(item.addedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
