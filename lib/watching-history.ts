/* lib/watching-history.ts */
import api from "@/lib/api";

/* ---------- типы ---------- */
export interface ContentViewHistoryDto {
  contentId:    number;
  contentName:  string;
  contentType:  string;
  posterUrl:    string;
  durationMin:  number;
  ageRating:    string;
  viewedAt:     string;          // ISO-строка, может быть ""
}

export interface PageResponse<T> {
  data:         T[];
  currentPage:  number;
  totalPages:   number;
  pageSize:     number;
  totalItems:   number;
}

/* ---------- GET /api/v1/content-views/me ---------- */
export interface GetHistoryParams {
  page?:    number;
  size?:    number;
  sortBy?:  "contentId" | "contentName" | "durationMin" | "viewedAt";
  isAsc?:   boolean;
}

export async function getMyHistory(params: GetHistoryParams = {}) {
  const { data } = await api.get<PageResponse<ContentViewHistoryDto>>(
    "/content-views/me",          // ← путь из Swagger
    { params }
  );
  return data;
}

/* ---------- POST /api/v1/content-views ---------- */
export async function addToHistory(contentId: number) {
  // бэкэнд не возвращает тело, нам и не нужно
  await api.post("/content-views", { contentId });
}
