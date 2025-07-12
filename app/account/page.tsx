"use client"

import { useState, useEffect, ChangeEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import {
  getMyProfile,
  updateMyProfile,
  UserProfile,
  UpdateProfileMetadata,
} from "@/lib/user"

export default function AccountPage() {
  /* ---------- state ---------- */
  const [user, setUser]          = useState<UserProfile | null>(null)
  const [avatarFile, setAvatar]  = useState<File | null>(null)
  const [previewUrl, setPreview] = useState<string | null>(null)
  const [saving, setSaving]      = useState(false)
  const [error, setError]        = useState<string | null>(null)

  /* ---------- fetch profile ---------- */
  useEffect(() => {
    ;(async () => {
      try {
        setUser(await getMyProfile())
      } catch {
        setError("Could not load your profile. Please refresh the page.")
      }
    })()
  }, [])

  /* ---------- avatar picker ---------- */
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setAvatar(file)
    if (file) setPreview(URL.createObjectURL(file))
  }

  /* ---------- save handler ---------- */
  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setError(null)

    const metadata: UpdateProfileMetadata = {
      username:  user.username.trim(),
      firstname: user.firstName.trim(),
      surname:   user.lastName.trim(),
      email:     user.email.trim(),
      phoneNum:  user.phone.trim(),
    }

    try {
      const updated = await updateMyProfile(metadata, avatarFile)
      setUser(updated)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setAvatar(null)
      setPreview(null)
    } catch {
      setError("Saving failed. Try again later.")
    } finally {
      setSaving(false)
    }
  }

  /* ---------- loading / error screen ---------- */
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-20">
          <p className={`text-lg ${error ? "text-red-400" : "text-white"}`}>
            {error ?? "Loading your account…"}
          </p>
        </main>
      </div>
    )
  }

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />

      <main
        className="flex-1 px-6 py-12 bg-cover bg-center pt-20"
        style={{ backgroundImage: "url('/images/account_background.png')" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-4xl font-bold mb-16">
            Your account details
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[872px] mx-auto overflow-hidden rounded-lg
                       bg-[rgba(22,22,22,0.7)] border border-[rgba(128,128,128,0.7)]"
          >
            <div className="p-8">
              {/* ---- Header with avatar ---- */}
              <div className="flex items-center mb-12">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={previewUrl || user.avatarUrl || "/images/avatar_placeholder.png"}
                    alt="Avatar"
                    fill
                    sizes="96px"    /* avoids CLS in the fixed 96×96 container */
                    className="object-cover"
                    unoptimized     /* ⬅ bypass Next.js optimisation for odd filename */
                  />
                </div>
                <div className="ml-6">
                  <h2 className="text-white text-3xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-400 text-xl">{user.username}</p>
                </div>
              </div>

              {/* ---- Avatar picker ---- */}
              <div className="mb-10">
                <label className="block text-white mb-2">Change avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="text-gray-300 file:mr-4 file:py-2 file:px-4
                             file:rounded file:border-0 file:text-sm
                             file:bg-[#1CA2AA] file:text-white
                             hover:file:bg-[#189aa1]"
                />
              </div>

              {/* ---- Editable fields ---- */}
              <div className="space-y-6">
                {/* prettier-ignore */}
                {[
                  { id:"username",  label:"Username",   type:"text",  key:"username"  },
                  { id:"firstName", label:"First name", type:"text",  key:"firstName" },
                  { id:"lastName",  label:"Surname",    type:"text",  key:"lastName"  },
                  { id:"email",     label:"E-mail",     type:"email", key:"email"     },
                  { id:"phone",     label:"Phone",      type:"tel",   key:"phone"     },
                ].map(({ id, label, type, key }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-white mb-2">
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      value={(user as any)[key] ?? ""}
                      onChange={(e) =>
                        setUser({ ...user, [key]: e.target.value })
                      }
                      className="w-full bg-[#131313] border border-[#161616]
                                 rounded px-4 py-3 text-white"
                    />
                  </div>
                ))}

                {error && (
                  <p className="text-center text-red-400 pt-2">{error}</p>
                )}

                <div className="pt-8 flex justify-center">
                  <button
                    disabled={saving}
                    onClick={handleSave}
                    className="bg-[#1CA2AA] hover:bg-[#189aa1] disabled:opacity-60
                               text-white font-medium px-8 py-3 rounded w-[350px]
                               transition-colors"
                  >
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ---- Footer (unchanged) ---- */}
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
  )
}
