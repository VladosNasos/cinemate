// lib/contents.ts
import api from "./api"

/* --------------------------------------------------------
   Типы DTO (упрощённые до полей, которые реально нужны UI)
---------------------------------------------------------*/

// для карточек в каруселях
export interface Content {
  id: number
  title: string
  image: string
  genre?: string
  year?: number | string
  rating?: number | string

  // опционально, если вы хотите сразу подтягивать детали в карточке
  description?: string
  duration?: string
}

// параметры поиска/фильтрации
export interface ContentSearchParams {
  page?: number
  size?: number
  sortBy?: string
  isAsc?: boolean
  typeId?: number
  genreId?: number
  searchStr?: string
  isActive?: boolean
}

/* --------------------------------------------------------
   DTO для деталей контента (MovieDetailModal)
---------------------------------------------------------*/

// простые DTO для жанра и актёра
export interface GenreDto {
  id: number
  name: string
}
export interface ActorDto {
  id: number
  name: string
}

// подробная инфа по одному контенту
export interface ContentDetailsDto {
  id: number
  name: string
  posterUrl: string
  contentType: string
  releaseDate: string        // ISO-строка, например "1984-08-06"
  ageRating: string          // например "18+" или ""
  description: string
  durationMin: number        // продолжительность в минутах
  genres: GenreDto[]         // массив объектов { id, name }
  actors: ActorDto[]         // массив объектов { id, name }
  trailerUrl?: string
  videoUrl?: string
  warnings?: number[]        // например [176]
}

/* --------------------------------------------------------
   1. Случайная подборка ("count" записей)
---------------------------------------------------------*/
export async function getRandom(count = 10): Promise<Content[]> {
  console.log(`Fetching ${count} random contents...`);
  const { data } = await api.get<Content[]>("/contents/random", {
    params: { count },
  })
  console.log(`Fetched ${data.length} contents.`);
  return data
}

/* --------------------------------------------------------
   2. По типу (movie / series / cartoon …)
---------------------------------------------------------*/
export async function getByType(params: ContentSearchParams): Promise<Content[]> {
  const { data } = await api.get<{ items: Content[] }>("/contents/type", {
    params: { contentSearchParamsDto: params },
  })
  return data.items
}

/* --------------------------------------------------------
   3. По жанру
---------------------------------------------------------*/
export async function getByGenre(params: ContentSearchParams): Promise<Content[]> {
  const { data } = await api.get<{ items: Content[]; total: number }>("/contents/genre", {
    params,
  })
  return data.items
}

/* --------------------------------------------------------
   4. Рекомендации для пользователя (auth required)
---------------------------------------------------------*/
export async function getRecommendations(
  params: Omit<ContentSearchParams, "searchStr">
): Promise<Content[]> {
  const { data } = await api.get<{ items: Content[]; total: number }>("/contents/recommendations", {
    params,
  })
  return data.items
}

/* --------------------------------------------------------
   5. Детали одного контента (для MovieDetailModal)
---------------------------------------------------------*/
export async function getDetails(id: number): Promise<ContentDetailsDto> {
  const { data } = await api.get<ContentDetailsDto>(`/contents/${id}`)
  return data
}
