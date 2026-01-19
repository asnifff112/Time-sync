"use client";

import { useState } from "react";
import Link from "next/link";
import { Watch } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border bg-midnight/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-6">

        {/* LOGO – FIXED LEFT */}
        <Link
          href="/"
          className="z-10 text-xl font-semibold text-buttercream"
        >
          Time<span className="text-white">Sync</span>
        </Link>

        {/* LEFT NAV */}
        <div
          className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-8 text-sm text-buttercream transition-all duration-500 ${
            open ? "-translate-x-[260px] opacity-100" : "opacity-0"
          }`}
        >
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-white transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
        </div>

        {/* CENTER WATCH BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="absolute left-1/2 -translate-x-1/2 rounded-full border border-buttercream/40 bg-midnight p-3 text-buttercream hover:bg-buttercream hover:text-midnight transition"
          aria-label="Toggle navigation"
        >
          <Watch className="h-6 w-6" />
        </button>

        {/* RIGHT NAV – SAME LINKS */}
        <div
          className={`absolute right-6 flex items-center gap-8 text-sm text-buttercream transition-all duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-white transition">
            Products
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
        </div>
      </div>
    </header>
  );
}
