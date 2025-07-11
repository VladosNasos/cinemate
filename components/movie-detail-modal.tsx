/* components/movie-detail-modal.tsx */
"use client"

import { useState, useEffect, Fragment } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Play, Plus, ThumbsUp, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import VideoPlayerModal from "./video-player-modal"
import api from "@/lib/api"
import { getEpisodes, EpisodeDto } from "@/lib/episodes"

/* ─────────────────── reference dictionaries ─────────────────── */
interface RefDto { id: number; name: string }

let actorsMap:   Record<number, string> | null = null
let genresMap:   Record<number, string> | null = null
let warningsMap: Record<number, string> | null = null

async function loadRefs() {
  if (actorsMap && genresMap && warningsMap) return
  try {
    /* disableAuth – убирает Authorization, иначе бэкенд даёт 400 */
    const opt = { headers: { disableAuth: true } } as const

    const [actors, genres, warnings] = await Promise.all([
      api.get<RefDto[]>("/actors/all",   opt).then(r => r.data),
      api.get<RefDto[]>("/genres/all",   opt).then(r => r.data),
      api.get<RefDto[]>("/warnings/all", opt).then(r => r.data),
    ])

    actorsMap   = Object.fromEntries(actors  .map(a => [a.id, a.name]))
    genresMap   = Object.fromEntries(genres  .map(g => [g.id, g.name]))
    warningsMap = Object.fromEntries(warnings.map(w => [w.id, w.name]))
  } catch (e) {
    console.warn("⚠️ loadRefs():", e)
    actorsMap   = actorsMap   ?? {}
    genresMap   = genresMap   ?? {}
    warningsMap = warningsMap ?? {}
  }
}

/* ─────────────────── types ─────────────────── */
export interface Movie {
  id: number
  image: string
  title: string

  /* details that might be absent on first render */
  description?: string
  durationMin?: number
  ageRating?: string
  year?: string
  genre?: string
  rating?: string | number
  videoUrl?: string
  trailerUrl?: string
  contentType?: string

  /* relations */
  actors?:   number[]
  genres?:   number[]
  warnings?: number[]

  /* names if they already came from the backend */
  actorNames?:   string[]
  genreNames?:   string[]
  warningNames?: string[]
}

interface SimilarDto { id: number; name: string; posterUrl: string }

/* ─────────────────── fetch full details ─────────────────── */
async function fetchDetails(id: number): Promise<Partial<Movie>> {
  const { data } = await api.get(`/contents/${id}`)
  return {
    description:  data.description,
    durationMin:  data.durationMin,
    ageRating:    data.ageRating,
    year:         data.releaseDate ? new Date(data.releaseDate).getFullYear().toString() : undefined,
    rating:       data.rating,
    videoUrl:     data.videoUrl,
    trailerUrl:   data.trailerUrl,
    actors:       data.actors?.map((a: RefDto) => a.id),
    genres:       data.genres?.map((g: RefDto) => g.id),
    warnings:     data.warnings?.map((w: RefDto) => w.id),
    actorNames:   data.actors?.map((a: RefDto) => a.name),
    genreNames:   data.genres?.map((g: RefDto) => g.name),
    warningNames: data.warnings?.map((w: RefDto) => w.name),
  }
}

/* ─────────────────── component ─────────────────── */
interface Props {
  movie?: Movie
  isOpen: boolean
  onClose: () => void
}

export default function MovieDetailModal({ movie, isOpen, onClose }: Props) {
  const [current, setCurrent] = useState<Movie | null>(movie ?? null)
  useEffect(() => setCurrent(movie ?? null), [movie])

  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  const [playerSrc, setPlayerSrc] = useState("")
  const [playerOpen, setPlayerOpen] = useState(false)

  /* load dictionaries once per session */
  const [refsReady, setRefsReady] = useState(false)
  useEffect(() => { isOpen && loadRefs().then(() => setRefsReady(true)) }, [isOpen])

  /* lazy-load full details */
  useEffect(() => {
    if (!isOpen || !current) return
    if (current.videoUrl || current.trailerUrl) return       // already detailed
    fetchDetails(current.id).then(more => setCurrent(p => p ? { ...p, ...more } : p))
  }, [isOpen, current])

  /* episodes & similar */
  const [episodes, setEpisodes] = useState<EpisodeDto[]>([])
  const [epsReady, setEpsReady] = useState(false)
  const [similar, setSimilar]   = useState<SimilarDto[]>([])
  const [simReady, setSimReady] = useState(false)

  useEffect(() => {
    if (!isOpen || !current) return
    setEpisodes([]); setEpsReady(false)
    setSimilar([]);  setSimReady(false)

    getEpisodes(current.id)
      .then(eps => { setEpisodes(eps); setEpsReady(true) })
      .catch(() => setEpsReady(true))

    /* random suggestions – without auth header */
    api.get<SimilarDto[]>("/contents/random", { params: { count: 6 }, headers: { disableAuth: true } })
       .then(r => setSimilar(r.data))
       .finally(() => setSimReady(true))
  }, [isOpen, current])

  if (!isOpen || !current) return null

  /* human-readable helpers */
  const dur = current.durationMin ? `${Math.floor(current.durationMin / 60)}h ${current.durationMin % 60}m` : "—"

  const cast    = current.actorNames   ?? (refsReady && current.actors   ? current.actors  .map(id => actorsMap!  [id] ?? id).filter(Boolean) : [])
  const genres  = current.genreNames   ?? (refsReady && current.genres   ? current.genres  .map(id => genresMap!  [id] ?? id).filter(Boolean) : [])
  const warns   = current.warningNames ?? (refsReady && current.warnings ? current.warnings.map(id => warningsMap![id] ?? id).filter(Boolean) : [])

  const castStr   = cast  .length ? cast  .join(", ") : "—"
  const genresStr = genres.length ? genres.join(", ") : "—"
  const warnStr   = warns .length ? warns .join(", ") : "None"

  const playSrc = current.videoUrl || current.trailerUrl || ""

  /* ─────────────────── UI ─────────────────── */
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80" onClick={onClose} />

          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide bg-[rgb(32,64,67)] rounded-lg shadow-xl"
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* close */}
            <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-[rgb(18,17,19)] rounded-full p-1 hover:bg-[rgb(107,41,35)] transition-colors">
              <X className="h-6 w-6 text-[rgb(240,241,238)]" />
            </button>

            {/* poster */}
            <div className="relative w-full h-[40vh]">
              <Image src={current.image || "/placeholder.svg"} alt={current.title} fill className="object-cover" priority />
            </div>

            {/* body */}
            <div className="p-8 bg-[rgb(32,64,67)]">
              {/* controls */}
              <div className="flex items-center gap-4 mb-6">
                <Button disabled={!playSrc} onClick={() => { setPlayerSrc(playSrc); setPlayerOpen(true) }}
                  className="flex items-center gap-2 bg-[rgb(240,241,238)] hover:bg-[rgb(240,241,238)]/90 text-[rgb(32,64,67)] disabled:opacity-40">
                  <Play className="h-5 w-5 fill-current" /> Play
                </Button>

                <Button variant="outline" size="icon"
                  className={`rounded-full border-2 ${added ? "bg-[rgb(198,37,31)]/20 border-[rgb(198,37,31)]" : "bg-transparent border-[rgb(240,241,238)]/70 hover:bg-[rgb(107,41,35)]/20"}`}
                  onClick={() => setAdded(v => !v)}>
                  <Plus className={`h-5 w-5 ${added ? "text-[rgb(198,37,31)]" : "text-[rgb(240,241,238)]"}`} />
                </Button>

                <Button variant="outline" size="icon"
                  className={`rounded-full border-2 ${liked ? "bg-[rgb(198,37,31)]/20 border-[rgb(198,37,31)]" : "bg-transparent border-[rgb(240,241,238)]/70 hover:bg-[rgb(107,41,35)]/20"}`}
                  onClick={() => setLiked(v => !v)}>
                  <ThumbsUp className={`h-5 w-5 ${liked ? "text-[rgb(198,37,31)]" : "text-[rgb(240,241,238)]"}`} />
                </Button>

                <div className="ml-auto">
                  <Button variant="outline" size="icon" className="rounded-full border-2 bg-transparent border-[rgb(240,241,238)]/70 hover:bg-[rgb(107,41,35)]/20">
                    <ChevronDown className="h-5 w-5 text-[rgb(240,241,238)]" />
                  </Button>
                </div>
              </div>

              {/* headline */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[rgb(240,241,238)] font-medium">{dur}</span>
                  {current.year && <span className="text-[rgb(240,241,238)]/70">{current.year}</span>}
                  {current.ageRating && (
                    <span className="px-1.5 py-0.5 text-xs bg-[rgb(18,17,19)] text-[rgb(240,241,238)]/70 rounded">
                      {current.ageRating}
                    </span>
                  )}
                  {current.rating && <span className="text-[rgb(240,241,238)]/70">⭐ {current.rating}</span>}
                </div>

                <h1 className="text-2xl font-bold text-[rgb(240,241,238)] mb-2">{current.title}</h1>

                {current.genre && <div className="text-[rgb(240,241,238)] mb-4 uppercase tracking-wide">{current.genre}</div>}

                {current.description && <p className="text-[rgb(240,241,238)]">{current.description}</p>}
              </div>

              {/* lists */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-x-8 text-[rgb(240,241,238)]">
                  <div><span className="text-[rgb(240,241,238)]/70 block mb-1">Cast:</span>{castStr}</div>
                  <div><span className="text-[rgb(240,241,238)]/70 block mb-1">Genres:</span>{genresStr}</div>
                  <div><span className="text-[rgb(240,241,238)]/70 block mb-1">Warnings:</span>{warnStr}</div>
                </div>
              </div>

              {/* episodes OR similar */}
              {epsReady && episodes.length > 0 ? (
                <div>
                  <h2 className="text-xl font-bold text-[rgb(240,241,238)] mb-4">Episodes</h2>
                  <div className="space-y-4">
                    {Array.from(new Map(episodes.map(e => [e.seasonNumber, true])).keys()).map(season => (
                      <Fragment key={season}>
                        <h3 className="text-lg font-semibold text-[rgb(240,241,238)]">Season {season}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {episodes.filter(e => e.seasonNumber === season).map(ep => (
                            <div key={ep.id} className="flex bg-[rgb(18,17,19)] rounded-lg overflow-hidden">
                              <div className="relative w-40 aspect-video shrink-0">
                                <Image
                                  src={ep.thumbnailUrl || "/placeholder.svg"}
                                  alt={ep.title || `Episode ${ep.episodeNumber}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-1 flex-col p-3">
                                <div className="flex items-start justify-between mb-1 gap-2">
                                  <span className="font-medium text-[rgb(240,241,238)]">
                                    E{ep.episodeNumber}. {ep.title}
                                  </span>
                                  <Button variant="ghost" size="icon"
                                    className="shrink-0 h-7 w-7 hover:bg-[rgb(107,41,35)]/20"
                                    onClick={() => { setPlayerSrc(ep.videoUrl); setPlayerOpen(true) }}>
                                    <Play className="h-4 w-4 text-[rgb(240,241,238)]" />
                                  </Button>
                                </div>
                                <p className="text-xs text-[rgb(240,241,238)]/70 line-clamp-2">{ep.description}</p>
                                <span className="mt-auto text-xs text-[rgb(240,241,238)]/50">{ep.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold text-[rgb(240,241,238)] mb-4">More like this</h2>

                  {!simReady && <p className="text-[rgb(240,241,238)]/70">Loading…</p>}
                  {simReady && similar.length === 0 && <p className="text-[rgb(240,241,238)]/70">No suggestions.</p>}

                  {simReady && similar.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {similar.map(sm => (
                        <div key={sm.id}
                          className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                          onClick={() => setCurrent({ id: sm.id, image: sm.posterUrl, title: sm.name })}>
                          <Image src={sm.posterUrl || "/placeholder.svg"} alt={sm.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs text-white">{sm.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <VideoPlayerModal src={playerSrc} isOpen={playerOpen} onClose={() => setPlayerOpen(false)} contentId={current.id} />
    </>
  )
}
