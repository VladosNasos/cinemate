import api from "@/lib/api";

/* ---------- DTO returned by the backend ---------- */
export interface WishlistDto {
  id:          number;
  contentId:   number;
  contentName: string;
  contentType: "MOVIE" | "SERIES";
  posterUrl:   string;      // may be relative
  durationMin: number;
  ageRating:   string;
  addedAt:     string;
}

/* ---------- paging / filters ---------- */
export interface WishlistParams {
  page?: number;
  size?: number;
  sortBy?: string;
  isAsc?: boolean;
  userId?: number;
}

/* ---------- GET  /api/v1/wishlists/me ---------- */
export async function getMyWishlist(params: WishlistParams = {}) {
  /* ✅ 1. pass the params directly (backend does NOT need the wrapper) */
  const { data } = await api.get<{
    data: WishlistDto[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  }>("/wishlists/me", { params });

  /* ✅ 2. make every posterUrl absolute */
  const base = api.defaults.baseURL!;                        // e.g. http://cinemate.ddns.net:8081/api/v1
  const absolutised = data.data.map((w) => ({
    ...w,
    posterUrl: w.posterUrl && !w.posterUrl.startsWith("http")
      ? new URL(w.posterUrl, base).toString()                // joins correctly
      : w.posterUrl || "",                                   // keep empty string if missing
  }));

  return { ...data, data: absolutised };
}

/* ---------- POST /wishlists ---------- */
export async function addToWishlist(contentId: number) {
  await api.post("/wishlists", { contentId });
}

/* ---------- DELETE /wishlists/{contentId} ---------- */
export async function removeFromWishlist(contentId: number) {
  await api.delete(`/wishlists/${contentId}`);
}
