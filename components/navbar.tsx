// src/components/navbar.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Search } from "lucide-react"
import CinemateLogo from "./cinemate-logo"
import NotificationMenu from "./NotificationMenu"
import { AvatarMenu } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import LanguageIcon from "./ui/LanguageIcon"

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState("English")

  return (
    <header className="w-full fixed top-0 z-50"> 
      <div className="container mx-auto flex items-center h-16 px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <CinemateLogo className="h-8 w-auto" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end">
          {/* Search bar */}
          <div
            className="relative flex items-center mr-6" 
            onMouseEnter={() => setSearchOpen(true)}
            onMouseLeave={() => setSearchOpen(false)}
          >
            <Search className="h-5 w-5 text-gray-400 cursor-pointer" />
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  type="text"
                  placeholder="Search"
                  autoFocus
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border border-gray-700 rounded-sm px-4 py-1.5 text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 500, opacity: 1 }} 
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Language selector */}
          <div className="relative ml-4">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-white flex items-center gap-1 text-sm hover:bg-gray-800 p-1.5 rounded-md transition-colors"
            >
              <LanguageIcon />
              <span>{selectedLang}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-32 bg-black border border-gray-700 rounded-md shadow-lg z-10"
                >
                  {["English", "Spanish", "French", "German", "Russian"].map((lang) => (
                    <li
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang)
                        setLangOpen(false)
                      }}
                      className="px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer"
                    >
                      {lang}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications popover */}
          <div className="ml-6">
            <NotificationMenu />
          </div>

          {/* Avatar with account menu */}
          <div className="ml-6">
            <AvatarMenu />
          </div>
        </div>
      </div>
    </header>
  )
}