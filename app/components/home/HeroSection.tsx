"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroScene from "@/app/components/three/HeroScene";
import RotatingText from "@/app/components/ui/RotatingText";

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
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

      {/* 🌑 GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/45 via-midnight/55 to-midnight/65" />

      {/* CONTENT */}
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">

        {/* LEFT – HERO TEXT */}
        <div ref={textRef}>
          <h1 className="flex flex-wrap items-center gap-3 text-4xl font-semibold text-white md:text-5xl leading-tight">

            <span>Time,</span>

            <RotatingText
              texts={[
                "Perfected.",
                "Crafted.",
                "Measured.",
                "Remembered."
              ]}
              mainClassName="text-buttercream"
              staggerFrom="center"
              staggerDuration={0.01}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 26,
                mass: 0.8,
              }}
              rotationInterval={2800}
            />
          </h1>

          <p className="mt-6 max-w-md text-buttercream/75">
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
