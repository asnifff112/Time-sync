"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroScene from "@/app/components/three/HeroScene";

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="relative min-h-screen bg-midnight">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">

        {/* TEXT */}
        <div ref={textRef}>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Time, Perfected.
          </h1>

          <p className="mt-6 max-w-md text-buttercream/80">
            Premium watches engineered with precision and timeless design.
          </p>

          <button className="mt-10 rounded-full bg-buttercream px-8 py-3 text-sm font-medium text-midnight hover:opacity-90 transition">
            Explore Watches
          </button>
        </div>

        {/* THREE */}
        <div className="flex justify-center">
          <div className="h-[420px] w-[420px] rounded-full border border-white/10 bg-black/20">
            <HeroScene />
          </div>
        </div>

      </div>
    </section>
  );
}
