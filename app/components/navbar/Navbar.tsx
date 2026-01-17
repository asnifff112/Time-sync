"use client";

import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-midnight/90 backdrop-blur border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-buttercream">
          Time<span className="text-white">Sync</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-buttercream/80">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/products" className="hover:text-white transition">Products</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-5 text-buttercream">
          <Link href="/wishlist" aria-label="Wishlist">
            <Heart className="h-5 w-5 hover:text-white transition" />
          </Link>

          <Link href="/cart" aria-label="Cart">
            <ShoppingCart className="h-5 w-5 hover:text-white transition" />
          </Link>

          <Link
            href="/auth/login"
            className="rounded-full border border-buttercream/40 px-4 py-1.5 text-sm hover:bg-buttercream hover:text-midnight transition"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
