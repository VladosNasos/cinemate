/* app/genres/[id]/page.tsx */
import Navbar         from "@/components/navbar";
import Footer         from "@/components/footer";
import GenreClientPage from "./page.client";

/* базовый адрес бэка (без /api/v1) */
const API_ROOT =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/i, "") ||
  "http://cinemate.ddns.net:8081";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const res  = await fetch(`${API_ROOT}/api/v1/genres/all`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("backend unavailable");

    const list = (await res.json()) as { id: number }[];
    return list.map((g) => ({ id: g.id.toString() }));
  } catch {
    return [];
  }
}

/* ──────────────────────────────────────────────
   Страница жанра
─────────────────────────────────────────────── */
export default async function GenrePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const gRes = await fetch(`${API_ROOT}/api/v1/genres/${id}`, {
    cache: "no-store",
  });

  if (!gRes.ok) {
    return (
      <>
        <Navbar />
        <div className="text-white p-20">Genre not found</div>
        <Footer />
      </>
    );
  }

  const genre = (await gRes.json()) as {
    id: number;
    name: string;
    imageUrl?: string;
  };

  /* контент жанра */
  const cRes = await fetch(
    `${API_ROOT}/api/v1/contents/search?genreId=${id}&size=100`,
    { cache: "no-store" },
  );
  const items = cRes.ok ? await cRes.json() : [];

  return (
    <>
      <Navbar />
      <GenreClientPage genre={genre} rawItems={items} />
      <Footer />
    </>
  );
}
