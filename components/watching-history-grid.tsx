// components/watching-history-grid.tsx
"use client"

import { WatchingHistoryCard } from "./watching-history-card"
import type { ContentViewHistoryDto } from "@/lib/watching-history"

interface Props {
  content:        ContentViewHistoryDto[]
  onContentClick: (c: ContentViewHistoryDto) => void
  showMore:       boolean
}

export function WatchingHistoryGrid({ content, onContentClick, showMore }: Props) {
  const displayed = showMore ? content : content.slice(0, 12)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {displayed.map(item => (
        <WatchingHistoryCard
          key={item.contentId}
          content={item}
          onClick={() => onContentClick(item)}
        />
      ))}
    </div>
  )
}
