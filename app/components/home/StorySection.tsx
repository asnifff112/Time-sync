"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const refs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    refs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-48 text-center px-6">
      <div className="mx-auto max-w-3xl space-y-16 text-3xl font-medium">
        {[
          "Time is not rushed.",
          "Time is not wasted.",
          "Time is intentional.",
        ].map((line, i) => (
          <p
            key={i}
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
            className="opacity-0"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
