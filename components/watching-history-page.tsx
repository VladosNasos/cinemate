/* components/watching-history-page.tsx */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { ContentRow } from "@/components/ui/content-row";
import {
  getMyHistory,
  ContentViewHistoryDto,
} from "@/lib/watching-history";

export default function WatchingHistoryPage() {
  /* ---------------- state ---------------- */
  const [thisWeek, setWeek] = useState<ContentViewHistoryDto[]>([]);
  const [loading, setLoad] = useState(true);

  /* ---------------- fetch ---------------- */
  useEffect(() => {
    (async () => {
      try {
        setLoad(true);
        const page1 = await getMyHistory({
          page: 1,
          size: 30,
          sortBy: "viewedAt",
          isAsc: false,
        });
        const items = page1.data;

        /* keep only items viewed within the last 7 days */
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        setWeek(
          items.filter(
            (i) => new Date(i.viewedAt).getTime() >= weekAgo
          )
        );
      } catch (e) {
        console.error("watch-history:", e);
        setWeek([]);
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
          <div className="text-white text-xl">
            Loading your watching history…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div
          className="relative h-96 flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.7)),url('/images/watching-history-back.png')",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white"
          >
            Your watching history
          </motion.h1>
        </div>

        <div className="container mx-auto px-6 py-12">
          {thisWeek.length === 0 ? (
            /* empty state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-20 text-center"
            >
              <div className="text-6xl mb-6">🎬</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                You haven't watched anything this week!
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Start exploring our catalogue to build your personal history.
              </p>
              <Link
                href="/"
                className="bg-[#1CA2AA] hover:bg-[#189aa1] text-white px-8 py-3 rounded"
              >
                Browse content
              </Link>
            </motion.div>
          ) : (
            /* single row */
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                This week
              </h2>
              <ContentRow
                content={thisWeek}
                onContentClick={handleClick}
              />
            </motion.section>
          )}
        </div>
      </main>

      {/* footer */}
      <footer className="bg-black text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">Questions? Call 1-844-505-2993</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">FAQ</Link>
              <Link href="#" className="block hover:underline">Investor Relations</Link>
              <Link href="#" className="block hover:underline">Buy Gift Cards</Link>
              <Link href="#" className="block hover:underline">Cookie Preferences</Link>
              <Link href="#" className="block hover:underline">Legal Notices</Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">Help Center</Link>
              <Link href="#" className="block hover:underline">Jobs</Link>
              <Link href="#" className="block hover:underline">Ways to Watch</Link>
              <Link href="#" className="block hover:underline">Corporate Information</Link>
              <Link href="#" className="block hover:underline">Only on Netflix</Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">Account</Link>
              <Link href="#" className="block hover:underline">Netflix Shop</Link>
              <Link href="#" className="block hover:underline">Terms of Use</Link>
              <Link href="#" className="block hover:underline">Contact Us</Link>
              <Link href="#" className="block hover:underline">Do Not Sell or Share My Personal Information</Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">Media Center</Link>
              <Link href="#" className="block hover:underline">Redeem Gift Cards</Link>
              <Link href="#" className="block hover:underline">Privacy</Link>
              <Link href="#" className="block hover:underline">Speed Test</Link>
              <Link href="#" className="block hover:underline">Ad Choices</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
