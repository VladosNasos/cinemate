"use client";

import { useEffect } from "react";
import PreLoginNavBar from "@/components/pre-login-navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider"; // relative from /app/logout

export default function LogoutPage() {
  const { logout } = useAuth();

  // Выйти при монтировании страницы
  useEffect(() => {
    logout();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <PreLoginNavBar />

      {/* Hero */}
      <div className="relative flex items-center justify-center min-h-screen px-8">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/pre-login-background.png')",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 max-w-2xl text-center">
          <h3 className="text-3xl md:text-5xl font-bold mb-4">Unlimited movies, TV shows, and more</h3>
          <p className="text-lg md:text-xl mb-2">Watch anywhere and anytime.</p>
          <p className="text-md md:text-lg mb-6">Ready to watch? Let’s find your preferences!</p>
          <Link href="/login">
            <button
              className="text-white px-6 py-2 rounded-sm transition-colors"
              style={{ backgroundColor: "#24C0C9" }}
            >
              Get Started &gt;
            </button>
          </Link>
        </div>
      </div>

      {/* Enjoy on TV */}
      <div className="relative flex items-center justify-center min-h-screen px-8">
        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">Enjoy on your TV</h3>
          <p className="text-lg md:text-xl mb-2">
            Watch on Smart TVs, Playstation, Xbox,
            <br /> Chromecast, Apple TV, Blu‑ray players, and more.
          </p>
        </div>
        <div>
          <img src="/images/tv.png" alt="TV" />
        </div>
      </div>

      {/* Watch everywhere */}
      <div className="relative flex items-center justify-center min-h-screen px-8 bg-[#000] border-t-8 border-gray-700">
        <div>
          <img src="/images/device-pile.png" alt="Devices" />
        </div>
        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">Watch everywhere</h3>
          <p className="text-lg md:text-xl mb-2">
            Stream unlimited movies and TV shows on your
            <br /> phone, tablet, laptop, and TV.
          </p>
        </div>
      </div>

      {/* Kids */}
      <div className="relative flex items-center justify-center min-h-screen px-8 bg-[#000] border-t-8 border-gray-700">
        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">Create profiles for kids</h3>
          <p className="text-lg md:text-xl mb-2">
            Send kids on adventures with their favourite
            <br /> characters in a space made just for them—free.
          </p>
        </div>
        <div>
          <img src="/images/figures.png" alt="Kids" />
        </div>
      </div>

      {/* Download */}
      <div className="relative flex items-center justify-center min-h-screen px-8 bg-[#000] border-t-8 border-gray-700">
        <div>
          <img src="/images/download.png" alt="Download" />
        </div>
        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">Download your shows<br /> to watch offline</h3>
          <p className="text-lg md:text-xl mb-2">Watch on a plane, train, or submarine...</p>
        </div>
      </div>

      {/* CTA again */}
      <div className="relative flex items-center justify-center min-h-screen px-8 bg-[#000] border-t-8 border-gray-700">
        <div className="text-center z-10 max-w-2xl">
          <h3 className="text-3xl md:text-5xl font-bold mb-4">Let’s find your preferences!</h3>
          <Link href="/login">
            <button
              className="text-white px-6 py-2 my-8 rounded-sm transition-colors"
              style={{ backgroundColor: "#24C0C9" }}
            >
              Get Started &gt;
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
