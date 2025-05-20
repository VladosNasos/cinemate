"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const notifications = [
  { text: "New series of Stranger Things already at our website!", href: "#" },
  { text: "Saw 11 is already on our website!", href: "#" },
  { text: "Take test to find out your preferencies!", href: "/testing" },
];

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // close dropdown on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
      >
        <Bell className="h-5 w-5 text-white" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-72 bg-[#161616] border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
          >
            {notifications.map(({ text, href }, i) => (
              <Link href={href} key={i}>
                <div
                  className={`px-4 py-3 text-white text-sm hover:bg-gray-700 transition-colors cursor-pointer ${
                    i + 1 < notifications.length ? "border-b border-gray-700" : ""
                  }`}
                >
                  {text}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
