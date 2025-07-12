"use client"

import { WishlistCard } from "@/components/wishlist-card"
import { WishlistDto } from "@/lib/wishlist"

interface WishlistGridProps {
  items: WishlistDto[]
  onContentClick: (content: WishlistDto) => void
  onRemoveFromWishlist: (contentId: number) => void
}

export function WishlistGrid({ items, onContentClick, onRemoveFromWishlist }: WishlistGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {items.map((item) => (
        <WishlistCard
          key={item.contentId}
          item={item}
          onClick={() => onContentClick(item)}
          onRemove={() => onRemoveFromWishlist(item.contentId)}
        />
      ))}
    </div>
  )
}
