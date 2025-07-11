import Navbar            from "@/components/navbar"
import Footer             from "@/components/footer"
import GenreClientPage    from "./page.client"

const API_ROOT =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/i, "") ||
  "http://cinemate.ddns.net:8081"

export async function generateStaticParams() {
  const res   = await fetch(`${API_ROOT}/api/v1/genres/all`, { next: { revalidate: 3600 } })
  const list  = res.ok ? await res.json() : []
  return list.map((g: { id: number }) => ({ id: g.id.toString() }))
}

export default async function GenrePage({ params }: { params: { id: string } }) {
  const { id } = params

  const gRes  = await fetch(`${API_ROOT}/api/v1/genres/${id}`, { cache: "no-store" })
  if (!gRes.ok) return <div className="text-white p-20">Genre not found</div>
  const genre = await gRes.json() as { id: number; name: string; imageUrl?: string }

  const cRes  = await fetch(`${API_ROOT}/api/v1/contents/search?genreId=${id}&size=100`, { cache: "no-store" })
  const items = cRes.ok ? await cRes.json() : []

  return (
    <>
      <Navbar />
      <GenreClientPage genre={genre} rawItems={items} />
      <Footer />
    </>
  )
}
