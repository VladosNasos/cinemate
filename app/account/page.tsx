// app/account/page.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"

export default function AccountPage() {
  const [user, setUser] = useState({
    username: "@newuser245",
    firstName: "Nicolas",
    lastName: "Tetcher",
    email: "newuser245@gmail.com",
    phone: "+44 078 975 88 96",
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Reusable Navbar */}
      <Navbar />

      {/* Main Content with background image */}
      <main
        className="flex-1 px-6 py-12 bg-cover bg-center pt-20"
        style={{ backgroundImage: "url('/images/account_background.png')" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-4xl font-bold mb-16">Your account details</h1>

          {/* Account Card with transparent bg and translucent border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[872px] mx-auto overflow-hidden rounded-lg
                       bg-[rgba(22,22,22,0.7)] border border-[rgba(128,128,128,0.7)]"
          >
            <div className="p-8">
              {/* Profile Section - Top */}
              <div className="flex items-center mb-12">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/images/tyler_durden.jpg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <div className="ml-6">
                  <h2 className="text-white text-3xl font-semibold">
                    {`${user.firstName} ${user.lastName}`}
                  </h2>
                  <p className="text-gray-400 text-xl">{user.username}</p>
                </div>
              </div>

              {/* Form Fields - Stacked Vertically */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-white mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="w-full bg-[#131313] border border-[#161616] rounded px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="firstName" className="block text-white mb-2">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    className="w-full bg-[#131313] border border-[#161616] rounded px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-white mb-2">
                    Surname
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    className="w-full bg-[#131313] border border-[#161616] rounded px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full bg-[#131313] border border-[#161616] rounded px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white mb-2">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full bg-[#131313] border border-[#161616] rounded px-4 py-3 text-white"
                  />
                </div>

                <div className="pt-8 flex justify-center">
                  <button className="bg-[#1CA2AA] hover:bg-[#189aa1] text-white font-medium px-8 py-3 rounded transition-colors w-[350px]">
                    Edit your personal details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#000000] text-gray-400 py-12 px-6">
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
  )
}
