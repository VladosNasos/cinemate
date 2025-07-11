"use client"

import { useEffect, useState } from "react"
import Image          from "next/image"
import Link           from "next/link"
import { motion }     from "framer-motion"
import api            from "@/lib/api"

/** то, что приходит с /genres/all */
interface GenreDto {
  id:        number
  name:      string
  imageUrl?: string     
}

export default function GenreShowcase() {
  const [genres,  setGenres]  = useState<GenreDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<GenreDto[]>("/genres/all", {
        baseURL: "/api/v1",         
        headers: { disableAuth: true }
      })
      .then(r => setGenres(r.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading || genres.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {genres.map(g => (
          <Link key={g.id} href={`/genres/${g.id}`} className="group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg"
            >
              <Image
                src={g.imageUrl || "/placeholder.svg"}
                alt={g.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />

              {/* затемнение */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />

              {/* название */}
              <h3 className="absolute left-6 top-6 right-6 text-3xl font-extrabold text-white leading-snug">
                {g.name}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}
