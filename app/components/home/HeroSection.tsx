"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroScene from "@/app/components/three/HeroScene";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div
        ref={ref}
        className="grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2"
      >
        {/* TEXT */}
        <div>
          <h1 className="text-5xl font-semibold leading-tight">
            Time,<br /> Engineered.
          </h1>
          <p className="mt-6 max-w-md text-[#9CA3AF]">
            A modern watch store built around precision,
            craftsmanship, and motion.
          </p>
        </div>

        {/* THREE */}
        <div className="h-[420px] w-[420px] rounded-full border border-white/10">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
