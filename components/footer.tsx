// src/components/footer.tsx
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react"
import CinemateLogo from "./cinemate-logo"

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t-8 border-gray-700 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto ">
        <p className="mb-4">Questions? Call 1-844-505-2993</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm ">
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
  )
}
