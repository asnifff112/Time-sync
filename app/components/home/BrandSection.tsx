"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-buttercream py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-2xl font-semibold text-midnight">
          Designed for Timeless Living
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-midnight/70">
          Every TimeSync watch blends precision engineering with refined design.
        </p>
      </div>
    </section>
  );
}
