"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Watch, UserCircle } from "lucide-react";
import gsap from "gsap";
import { useAuth } from "@/app/context/authcontext"; // പാത്ത് ഉറപ്പുവരുത്തുക

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Hydration error ഒഴിവാക്കാൻ
  const watchRef = useRef<SVGSVGElement | null>(null);
  
  // AuthContext-ൽ നിന്നുള്ള ഡാറ്റയും ലോഡിംഗ് സ്റ്റേറ്റും എടുക്കുന്നു
  const { user, loading } = useAuth(); 

  // ക്ലയന്റ് സൈഡിൽ മാത്രം റെൻഡർ ചെയ്യാൻ
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // മൗണ്ട് ആവുന്നത് വരെ ഒന്നും കാണിക്കില്ല (Hydration mismatch ഒഴിവാക്കാൻ)
  if (!mounted) return null;

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
        <button onClick={handleToggle} aria-label="Toggle navigation" className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F172A] border border-white/20 p-3 transition hover:scale-110 hover:shadow-[0_0_25_rgba(255,255,255,0.25)]">
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
            <Link href="/profile" className="flex items-center gap-2 group transition-all duration-300">
              <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/20 group-hover:border-white/40 transition-all overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <UserCircle className="h-5 w-5 text-white/70" />
                )}
              </div>
              <span className="hidden md:inline group-hover:text-white transition font-medium">
                {user.name?.split(" ")[0] || "Profile"}
              </span>
            </Link>
          ) : (
            <Link href="/auth/login" className="rounded-full border border-white/20 px-5 py-1.5 text-sm font-medium transition hover:bg-white hover:text-[#0F172A] active:scale-95">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}