"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="bg-buttercream pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold text-midnight">
          Featured Watches
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="rounded-lg border border-border bg-white p-6"
            >
              <div className="mb-6 h-44 rounded-md bg-gray-100" />
              <h3 className="text-sm font-medium text-midnight">
                TimeSync Classic
              </h3>
              <p className="mt-1 text-sm text-midnight/70">
                ₹12,999
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
