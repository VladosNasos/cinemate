"use client"

import { WatchingHistoryCard } from "./watching-history-card"
import { ContentViewHistoryDto } from "./watching-history-page"

interface WatchingHistoryGridProps {
  content: ContentViewHistoryDto[]
  onContentClick: (content: ContentViewHistoryDto) => void
  showMore: boolean
}

export function WatchingHistoryGrid({ content, onContentClick, showMore }: WatchingHistoryGridProps) {
  const displayedContent = showMore ? content : content.slice(0, 12)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {displayedContent.map((item) => (
        <WatchingHistoryCard key={item.contentId} content={item} onClick={() => onContentClick(item)} />
      ))}
    </div>
  )
}
