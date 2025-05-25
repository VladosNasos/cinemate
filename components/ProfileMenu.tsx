// src/components/ProfileMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Newspaper,
  Bell,
  Clock,
  Settings,
  UserPlus,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const MENU_ITEMS = [
  { href: "/news",        icon: <Newspaper className="h-5 w-5" />,      label: "News" },
  { href: "/notifications", icon: <Bell className="h-5 w-5" />,         label: "Notifications" },
  { href: "/watching-history",     icon: <Clock className="h-5 w-5" />,          label: "Watch history" },
  { divider: true },
  { href: "/account",     icon: <Settings className="h-5 w-5" />,       label: "Manage account" },
  { href: "/account/add", icon: <UserPlus className="h-5 w-5" />,       label: "Add new account" },
  { href: "/logout",      icon: <LogOut className="h-5 w-5" />,         label: "Sign out" },
];

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full overflow-hidden hover:bg-gray-800 p-1 transition-colors"
      >
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-[#161616] border border-gray-700 rounded-lg overflow-hidden z-50"
          >
            {MENU_ITEMS.map((item, i) => {
              if (item.divider) {
                return (
                  <div key={`div-${i}`} className="border-t border-gray-700 my-1" />
                );
              }
              return (
                  <Link
                  key={item.href}
                  href={item.href!}    // ← assert it’s not undefined
                  className="flex items-center px-4 py-3 gap-3 text-gray-300 hover:bg-gray-800 transition-colors text-sm"
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
