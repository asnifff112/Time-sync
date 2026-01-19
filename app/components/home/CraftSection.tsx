"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CraftSection() {
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(leftRef.current, {
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 75%",
      },
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="bg-midnight py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
        <div ref={leftRef}>
          <h2 className="text-2xl font-semibold text-white">
            Precision in Every Detail
          </h2>
          <p className="mt-6 text-buttercream/80">
            Crafted movements, refined cases, and timeless durability.
          </p>
        </div>

        <div className="h-64 rounded-lg border border-white/10 bg-white/5" />
      </div>
    </section>
  );
}
