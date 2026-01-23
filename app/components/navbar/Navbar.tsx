"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Watch, UserCircle } from "lucide-react"; // User icon കൂടി എടുത്തു
import gsap from "gsap";
import { useAuth } from "@/app/context/authcontext"; // Context ലേക്ക് മാറ്റുക

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const watchRef = useRef<SVGSVGElement | null>(null);
  
  // AuthContext-ൽ നിന്നുള്ള ഡാറ്റ എടുക്കുന്നു
  const { user } = useAuth(); 

  const handleToggle = () => {
    setOpen((prev) => !prev);

    if (watchRef.current) {
      gsap.to(watchRef.current, {
        rotate: "+=180",
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div className="relative flex h-16 items-center px-8 rounded-full bg-[rgba(15,23,42,0.85)] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] text-[#E5E7EB]">
        
        {/* LEFT NAV */}
        <div className={`absolute left-1/2 top-1/2 flex -translate-y-1/2 items-center gap-8 text-sm transition-all duration-500 ${
            open ? "-translate-x-[300px] opacity-100 pointer-events-auto" : "-translate-x-1/2 opacity-0 pointer-events-none"
          }`}>
          {["Home", "Products", "About"].map((item) => (
            <Link key={item} href={`/${item === "Home" ? "" : item.toLowerCase()}`} className="relative group">
              <span className="group-hover:text-white transition">{item}</span>
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CENTER WATCH BUTTON */}
        <button onClick={handleToggle} aria-label="Toggle navigation" className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F172A] border border-white/20 p-3 transition hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]">
          <Watch ref={watchRef} className="h-6 w-6 text-white" />
        </button>

        {/* RIGHT NAV */}
        <div className={`absolute left-1/2 top-1/2 flex -translate-y-1/2 items-center gap-8 text-sm transition-all duration-500 ${
            open ? "translate-x-[140px] opacity-100 pointer-events-auto" : "-translate-x-1/2 opacity-0 pointer-events-none"
          }`}>
          {["Cart", "Wishlist"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="relative group">
              <span className="group-hover:text-white transition">{item}</span>
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all group-hover:w-full" />
            </Link>
          ))}

          {/* 🔄 CONDITIONAL LOGIN/PROFILE BUTTON */}
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/20 transition">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <UserCircle className="h-5 w-5" />
                )}
              </div>
              <span className="hidden md:inline group-hover:text-white transition">Profile</span>
            </Link>
          ) : (
            <Link href="/auth/login" className="rounded-full border border-white/20 px-5 py-1.5 text-sm font-medium transition hover:bg-white hover:text-[#0F172A]">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}