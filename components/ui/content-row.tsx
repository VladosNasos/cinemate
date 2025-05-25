"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ContentViewHistoryDto } from "@/components/watching-history-page"
import { WatchingHistoryCard } from "@/components/watching-history-card"

interface ContentRowProps {
  content: ContentViewHistoryDto[]
  onContentClick: (content: ContentViewHistoryDto) => void
}

export function ContentRow({ content, onContentClick }: ContentRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showArrows, setShowArrows] = useState(false)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  if (content.length === 0) return null

  return (
    <div
      className="relative -mx-2 px-2"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* Left Arrow */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white border-0 transition-opacity duration-300 ${
          showArrows ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      {/* Content Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-2 px-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {content.map((item) => (
          <div key={item.contentId} className="flex-none w-48">
            <WatchingHistoryCard content={item} onClick={() => onContentClick(item)} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white border-0 transition-opacity duration-300 ${
          showArrows ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => scroll("right")}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  )
}
