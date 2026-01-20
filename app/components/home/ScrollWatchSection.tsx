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
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        // you can connect this to Three.js rotation later
        // self.progress = scroll control value
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="h-[480px] w-[480px] rounded-full border border-white/10">
        <HeroScene />
      </div>
    </section>
  );
}
