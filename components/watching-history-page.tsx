/* components/watching-history-page.tsx */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WatchingHistoryGrid } from "@/components/watching-history-grid";
import { ContentRow } from "@/components/ui/content-row";
import Navbar from "@/components/navbar";
import {
  getMyHistory,
  ContentViewHistoryDto,
} from "@/lib/watching-history";

export default function WatchingHistoryPage() {
  /* ---------------- state ---------------- */
  const [thisWeek, setWeek]   = useState<ContentViewHistoryDto[]>([]);
  const [allItems, setAll]    = useState<ContentViewHistoryDto[]>([]);
  const [recs,     setRecs]   = useState<ContentViewHistoryDto[]>([]);
  const [loading,  setLoad]   = useState(true);
  const [showMore, setMore]   = useState(false);

  /* ---------------- fetch ---------------- */
  useEffect(() => {
    (async () => {
      try {
        setLoad(true);
        const page1 = await getMyHistory({ page: 1, size: 30, sortBy: "viewedAt", isAsc: false });
        const items = page1.data;

        /** условное деление контента на «за неделю» и «остальное» */
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        setWeek(items.filter(i => new Date(i.viewedAt).getTime() >= weekAgo));
        setAll(items);
        /* рекомендации можно формировать иначе; пока берём 3 последних */
        setRecs(items.slice(0, 3));
      } catch (e) {
        console.error("watch-history:", e);
        setWeek([]); setAll([]); setRecs([]);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  /* ---------------- helpers ---------------- */
  const handleClick = (c: ContentViewHistoryDto) =>
    console.log("open content:", c);

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-white text-xl">Loading your watching history…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="relative h-96 flex items-center justify-center bg-cover bg-center"
             style={{ backgroundImage: "linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.7)),url('/placeholder.svg')" }}>
          <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
            className="text-5xl md:text-6xl font-bold text-white">
            Your watching history
          </motion.h1>
        </div>

        <div className="container mx-auto px-6 py-12">
          {allItems.length === 0 ? (
            /* empty state */
            <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
              className="flex flex-col items-center py-20 text-center">
              <div className="text-6xl mb-6">🎬</div>
              <h2 className="text-3xl font-bold text-white mb-4">You haven't watched anything yet!</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Start exploring our catalogue to build your personal history.
              </p>
              <Link href="/" className="bg-[#1CA2AA] hover:bg-[#189aa1] text-white px-8 py-3 rounded">
                Browse content
              </Link>
            </motion.div>
          ) : (
            <>
              {thisWeek.length > 0 && (
                <motion.section initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}>
                  <h2 className="text-3xl font-bold mb-6 text-white">This week</h2>
                  <ContentRow content={thisWeek} onContentClick={handleClick} />
                </motion.section>
              )}

              {/* GRID */}
              <motion.section initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} className="mt-12">
                <WatchingHistoryGrid
                  content={allItems}
                  onContentClick={handleClick}
                  showMore={showMore}
                />

                {allItems.length > 12 && (
                  <div className="flex justify-center mt-8">
                    <Button variant="ghost" onClick={() => setMore(!showMore)}
                      className="text-white hover:text-[#1CA2AA] border border-gray-600 hover:border-[#1CA2AA]">
                      <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${showMore ? "rotate-180":""}`} />
                      {showMore ? "Show less" : "Show more"}
                    </Button>
                  </div>
                )}
              </motion.section>

              {recs.length > 0 && (
                <motion.section initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} className="mt-12">
                  <h2 className="text-3xl font-bold mb-6 text-white">Recommendations for you</h2>
                  <ContentRow content={recs} onContentClick={handleClick} />
                </motion.section>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
