"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power2.out",
    });
  }, []);

  return (
    <section ref={ref} className="bg-buttercream py-24 text-center">
      <h2 className="text-2xl font-semibold text-midnight">
        Find Your Perfect Timepiece
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-midnight/70">
        Explore our premium collection built for every moment.
      </p>
      <button className="mt-10 rounded-full bg-midnight px-10 py-3 text-sm font-medium text-buttercream hover:opacity-90 transition">
        View Collection
      </button>
    </section>
  );
}
