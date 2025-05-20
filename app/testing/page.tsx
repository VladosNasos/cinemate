"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useState } from "react"

export default function TestingPage() {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="relative flex items-center justify-center min-h-screen px-8">
        <div
            className="absolute inset-0 bg-center"
            style={{
                backgroundImage: `url('/images/central-cinema.jpg')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                maskImage: `linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)`,
                WebkitMaskImage: `linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)`,
            }}
        />

        <div className="absolute inset-0 bg-black opacity-60" />

        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            Take a quick quiz to tell us your preferences
          </h3>
        </div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-8">
        <div className="text-center z-10 max-w-2xl">
            <h3 className="text-3xl md:text-3xl font-bold mb-4 text-left">
                Let’s find your preferences!
            </h3>
            <ul className="grid grid-cols-3 gap-4 justify-items-center mb-6">
                {[
                    'Anime', 'Action', 'Comedy',
                    'Drama', 'Fantasy', 'Horror',
                    'Mystery', 'Romance', 'Thriller',
                    'Western', 'History', 'Cartoon',
                ].map((genre) => {
                    const isSelected = selectedGenres.includes(genre)
                    return (
                        <li key={genre}>
                            <button
                                onClick={() =>
                                    setSelectedGenres((prev) =>
                                    prev.includes(genre)
                                    ? prev.filter((g) => g !== genre)
                                    : [...prev, genre]
                                    )
                                }
                                className={`px-10 py-2 border rounded w-40 transition-colors ${
                                    isSelected
                                    ? 'bg-gray-700 border-gray-300 text-white'
                                    : 'border-gray-500 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {genre}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <button
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 my-8 rounded-sm flex items-center justify-center mx-auto transition-colors"
                style={{ backgroundColor: "#24C0C9" }}
            >
                Finish quiz &gt;
            </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}

