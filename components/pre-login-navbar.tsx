// src/components/pre-login-navbar.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import CinemateLogo from "./cinemate-logo"
import { motion, AnimatePresence, color } from "framer-motion"
import LanguageIcon from "./ui/LanguageIcon"

export default function PreLoginNavBar() {
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

          {/* Login button */}
          <Link href="/login">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-sm flex items-center space-x-2 transition-colors" style={{ backgroundColor: "#1E8E95" }}>
                Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}