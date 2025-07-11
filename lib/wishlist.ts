import api from "@/lib/api"

/* -------- DTO, приходящий из backend -------- */
export interface WishlistDto {
  id:        number          // внутренний id записи wish-листa
  contentId: number
  contentName: string
  contentType: "MOVIE" | "SERIES"
  posterUrl: string
  durationMin: number
  ageRating: string
  addedAt: string            // ISO-строка
}

/* -------- Параметры пейджинга/фильтров (как в swagger) -------- */
export interface WishlistParams {
  page?: number
  size?: number
  sortBy?: string
  isAsc?: boolean
  userId?: number
}

/* -------- Получить мой wish-лист -------- */
export async function getMyWishlist(params: WishlistParams = {}) {
  const { data } = await api.get<{
    data: WishlistDto[]
    totalElements: number
    totalPages: number
    currentPage: number
    pageSize: number
  }>("/wishlists/me", {
    params: { wishlistParamsDto: { ...params } },
  })
  return data
}

/* -------- Добавить запись -------- */
export async function addToWishlist(contentId: number) {
  await api.post("/wishlists", { contentId })
}

/* -------- Удалить запись -------- */
export async function removeFromWishlist(contentId: number) {
  await api.delete(`/wishlists/${contentId}`)
}
