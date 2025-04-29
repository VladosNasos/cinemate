// src/components/navbar.tsx
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import CinemateLogo from "./cinemate-logo";
import { Button } from "@/components/ui/button";
import NotificationMenu from "./NotificationMenu";
import { AvatarMenu } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <header className="w-full transparent backdrop-blur-sm fixed top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <CinemateLogo className="h-8 w-auto" />
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-900/60 border border-gray-700 rounded-sm px-4 py-1.5 text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Right: Language, Notifications, Profile */}
        <div className="flex items-center gap-6">
          {/* Language selector */}
          <Button
            variant="ghost"
            className="text-white flex items-center gap-1 text-sm hover:bg-gray-800"
          >
            <span>English</span>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Notifications popover */}
          <NotificationMenu />

          {/* Avatar with account menu */}
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}
