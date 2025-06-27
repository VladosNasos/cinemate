"use client"

import Link from "next/link"
import { ArrowLeft, Zap, Star, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "./navbar"

export function NotSponsoredPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <div className="relative bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-red-900/20 py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Not Sponsored Yet</h1>
                  <p className="text-gray-300 text-lg">This feature is coming soon to Cinemate</p>
                </div>
              </div>

              <Link
                href="/"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
          >
            {/* Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-yellow-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
            </div>

            {/* Main Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">This Feature Needs a Sponsor!</h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              We're working hard to bring you amazing new features. This particular page is still in development and
              wasn't included in our initial design specifications.
            </p>

            {/* Design Note */}
            <div className="bg-[#161616] border border-gray-700 rounded-lg p-6 mb-8 w-full">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold mb-2">Development Note</h3>
                  <p className="text-gray-400 text-sm">
                    This page was not included in the original Figma design specifications. We're currently working on
                    the design and functionality for this feature. Stay tuned for updates!
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/"
                className="bg-[#1CA2AA] hover:bg-[#189aa1] text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Browse Content</span>
              </Link>

              <Link
                href="/watching-history"
                className="bg-transparent border border-gray-600 hover:border-[#1CA2AA] text-gray-300 hover:text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>View History</span>
              </Link>

              <Link
                href="/wishlist"
                className="bg-transparent border border-gray-600 hover:border-pink-500 text-gray-300 hover:text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>My Wishlist</span>
              </Link>
            </div>

            {/* Coming Soon Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 w-full"
            >
              <h3 className="text-xl font-semibold text-white mb-6">What's Coming Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#161616] rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Premium Features</h4>
                  <p className="text-gray-400 text-sm">Exclusive content and advanced features</p>
                </div>

                <div className="bg-[#161616] rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">AI Recommendations</h4>
                  <p className="text-gray-400 text-sm">Personalized content suggestions</p>
                </div>

                <div className="bg-[#161616] rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Social Features</h4>
                  <p className="text-gray-400 text-sm">Share and discuss with friends</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#000000] text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">Questions? Call 1-844-505-2993</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">
                FAQ
              </Link>
              <Link href="#" className="block hover:underline">
                Investor Relations
              </Link>
              <Link href="#" className="block hover:underline">
                Buy Gift Cards
              </Link>
              <Link href="#" className="block hover:underline">
                Cookie Preferences
              </Link>
              <Link href="#" className="block hover:underline">
                Legal Notices
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">
                Help Center
              </Link>
              <Link href="#" className="block hover:underline">
                Jobs
              </Link>
              <Link href="#" className="block hover:underline">
                Ways to Watch
              </Link>
              <Link href="#" className="block hover:underline">
                Corporate Information
              </Link>
              <Link href="#" className="block hover:underline">
                Only on Netflix
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">
                Account
              </Link>
              <Link href="#" className="block hover:underline">
                Netflix Shop
              </Link>
              <Link href="#" className="block hover:underline">
                Terms of Use
              </Link>
              <Link href="#" className="block hover:underline">
                Contact Us
              </Link>
              <Link href="#" className="block hover:underline">
                Do Not Sell or Share My Personal Information
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="#" className="block hover:underline">
                Media Center
              </Link>
              <Link href="#" className="block hover:underline">
                Redeem Gift Cards
              </Link>
              <Link href="#" className="block hover:underline">
                Privacy
              </Link>
              <Link href="#" className="block hover:underline">
                Speed Test
              </Link>
              <Link href="#" className="block hover:underline">
                Ad Choices
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
