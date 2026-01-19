"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Watch } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isLoggedIn = false; // temp auth
  const watchRef = useRef<SVGSVGElement | null>(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);

    // Rotate animation
    if (watchRef.current) {
      gsap.to(watchRef.current, {
        rotate: "+=180",
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border bg-midnight/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-6">

        {/* LOGO – ALWAYS FIXED */}
        <Link
          href="/"
          className="z-10 text-xl font-semibold text-buttercream"
        >
          Time<span className="text-white">Sync</span>
        </Link>

        {/* LEFT NAV */}
        <div
          className={`absolute left-1/2 top-1/2 flex -translate-y-1/2 items-center gap-8 text-sm text-buttercream transition-all duration-500 ${
            open
              ? "-translate-x-[320px] opacity-100 pointer-events-auto"
              : "-translate-x-1/2 opacity-0 pointer-events-none"
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

        {/* CENTER WATCH BUTTON (ROTATES) */}
        <button
          onClick={handleToggle}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-buttercream/40 bg-midnight p-3 text-buttercream hover:bg-buttercream hover:text-midnight transition"
          aria-label="Toggle navigation"
        >
          <Watch ref={watchRef} className="h-6 w-6" />
        </button>

        {/* RIGHT NAV */}
        <div
          className={`absolute left-1/2 top-1/2 flex -translate-y-1/2 items-center gap-8 text-sm text-buttercream transition-all duration-500 ${
            open
              ? "translate-x-[140px] opacity-100 pointer-events-auto"
              : "-translate-x-1/2 opacity-0 pointer-events-none"
          }`}
        >
          <Link href="/cart" className="hover:text-white transition">
            Cart
          </Link>
          <Link href="/wishlist" className="hover:text-white transition">
            Wishlist
          </Link>

          {isLoggedIn ? (
            <Link href="/profile" className="hover:text-white transition">
              Profile
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-full border border-buttercream/40 px-4 py-1.5 hover:bg-buttercream hover:text-midnight transition"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
