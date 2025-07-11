// components/watching-history-card.tsx
"use client"

import { useState } from "react"
import { Play, Clock, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { ContentViewHistoryDto } from "@/lib/watching-history"

interface Props {
  content:  ContentViewHistoryDto
  onClick:  () => void
}

export function WatchingHistoryCard({ content, onClick }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [err,    setErr]    = useState(false)

  const duration = (min: number) =>
    `${Math.floor(min / 60)}h ${min % 60}m`

  const viewedAgo = (iso: string) =>
    iso ? formatDistanceToNow(new Date(iso), { addSuffix: true }) : ""

  return (
    <div
      className="group cursor-pointer animate-fade-in transition-transform duration-300 hover:scale-105 hover:z-10"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] bg-[#161616] rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl">
        {/* poster */}
        {!err ? (
          <img
            src={content.posterUrl || "/placeholder.svg"}
            alt={content.contentName}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#161616] text-gray-400 text-xs px-2">
            {content.contentName}
          </div>
        )}

        {/* hover-overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 flex items-center justify-center transition-all">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100" />
        </div>

        {/* badges */}
        <div className="absolute top-2 left-2 bg-[#1CA2AA] text-white text-xs px-2 py-1 rounded">
          {content.contentType}
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {content.ageRating}
        </div>

        {/* info (appear on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent
                        opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-white">
            {content.contentName}
          </h3>

          <div className="flex items-center text-xs text-gray-300 space-x-3">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{duration(content.durationMin)}</span>
            </span>

            {content.viewedAt && (
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{viewedAgo(content.viewedAt)}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
