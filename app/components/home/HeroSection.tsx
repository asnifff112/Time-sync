"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextType from "@/app/effects/TextType"; 

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0F172A]">
      
      {/* CENTER CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">

        {/* 🔥 TYPING TEXT (ABOVE TIMESYNC) */}
        <div className="mb-6 text-sm md:text-base text-[#9CA3AF] tracking-widest uppercase">
          <TextType
           text={[
  "Time is measured.",
  "Time is crafted.",
  "Time is remembered.",
]}

            typingSpeed={75}
            deletingSpeed={50}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
          />
        </div>

        {/* 🕰️ BIG BRAND TEXT */}
        <h1
          ref={titleRef}
          className="text-[16vw] leading-none font-extrabold uppercase tracking-tight text-white select-none"
          style={{
            WebkitTextStroke: "2px white",
          }}
        >
          TIME&nbsp;SYNC
        </h1>

        {/* SUB LINE (OPTIONAL BUT PREMIUM) */}
        <p className="mt-8 max-w-md text-[#9CA3AF]">
          A modern watch experience driven by precision and motion.
        </p>
      </div>
    </section>
  );
}
