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
    <section className="relative min-h-screen overflow-hidden bg-midnight">

      {/* 🎥 BACKGROUND VIDEO */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/rolexx.mp4" type="video/mp4" />
      </video>

      {/* 🌑 DARK OVERLAY (FADE CONTROL) */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 via-midnight/60 to-midnight/70" />


      {/* CONTENT */}
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">

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

       

      </div>
    </section>
  );
}
