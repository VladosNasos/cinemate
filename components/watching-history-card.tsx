"use client"

import { useState } from "react"
import { Play, Clock, Calendar } from "lucide-react"
import type { ContentViewHistoryDto } from "@/components/watching-history-page"
import { formatDistanceToNow } from "date-fns"

interface WatchingHistoryCardProps {
  content: ContentViewHistoryDto
  onClick: () => void
}

export function WatchingHistoryCard({ content, onClick }: WatchingHistoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatViewedAt = (dateString: string) => {
    if (!dateString) return ""
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return ""
    }
  }

  return (
    <div
      className="group cursor-pointer animate-fade-in transition-transform duration-300 hover:scale-105 hover:z-10 relative"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] bg-[#161616] rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
        {!imageError ? (
          <img
            src={content.posterUrl || "/placeholder.svg"}
            alt={content.contentName}
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
              <div className="text-xs px-2">{content.contentName}</div>
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Age Rating Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {content.ageRating}
        </div>

        {/* Content Type Badge */}
        <div className="absolute top-2 left-2 bg-[#1CA2AA] bg-opacity-90 text-white text-xs px-2 py-1 rounded">
          {content.contentType}
        </div>

        {/* Content Info - Hidden by default, shown on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <h3 className="font-semibold text-sm line-clamp-2 text-white mb-2">{content.contentName}</h3>

          <div className="flex items-center text-xs text-gray-300 space-x-3">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(content.durationMin)}</span>
            </div>

            {content.viewedAt && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatViewedAt(content.viewedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
