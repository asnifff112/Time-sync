"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeroScene from "@/app/components/three/HeroScene";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollWatchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        // later connect this progress to watch rotation
        // self.progress = 0 → 1
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="h-[520px] w-[520px] rounded-full border border-white/10 bg-white/5">
        <HeroScene />
      </div>
    </section>
  );
}
