"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TimeStorySection() {
  const lines = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    lines.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          duration: 1,
          ease: "power3.out",
        }
      );
    });
  }, []);

  return (
    <section className="py-40 px-6">
      <div className="mx-auto max-w-3xl text-center space-y-10 text-3xl font-medium">
        {[
          "Time is not fast.",
          "Time is not slow.",
          "Time is personal.",
        ].map((text, i) => (
          <p
            key={i}
            ref={(el) => {
              if (el) lines.current[i] = el;
            }}
            className="opacity-0"
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
