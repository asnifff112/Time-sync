"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WatchScene from "../three/WatchScene";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function MechanicsOfTime() {
 const sectionRef = useRef<HTMLElement | null>(null);
const textRefs = useRef<(HTMLDivElement | null)[]>([]);
const watchObj = useRef<THREE.Object3D | null>(null);
const timeline = useRef<gsap.core.Timeline | null>(null);

  // 🔑 INIT GSAP ONLY AFTER MODEL LOADS
  const initAnimation = () => {
    if (!sectionRef.current || !watchObj.current) return;

    // Initial states
    gsap.set(textRefs.current, {
      opacity: 0,
      y: 40,
    });

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    timeline.current
      // STEP 1 – Precision
      .to(watchObj.current.rotation, { y: Math.PI * 0.5, duration: 1 })
      .to(textRefs.current[0], { opacity: 1, y: 0, duration: 0.5 }, "<")

      // STEP 2 – Micro Engineering
      .to(watchObj.current.rotation, { y: Math.PI, x: 0.3, duration: 1 })
      .to(textRefs.current[1], { opacity: 1, y: 0, duration: 0.5 }, "<")

      // STEP 3 – Power Reserve
      .to(watchObj.current.position, { z: -0.6, duration: 1 })
      .to(watchObj.current.rotation, { y: Math.PI * 2, duration: 1 })
      .to(textRefs.current[2], { opacity: 1, y: 0, duration: 0.5 }, "<");
  };

  // Cleanup
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      timeline.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-midnight text-white"
    >
      <div className="sticky top-0 mx-auto flex h-screen max-w-7xl items-center px-6">
        
        {/* LEFT TEXT */}
        <div className="w-1/2 space-y-28">
          {[
            {
              title: "Precision Movement",
              desc: "Automatic mechanical movement engineered for accuracy.",
            },
            {
              title: "Micro Engineering",
              desc: "Built with over 200 finely crafted components.",
            },
            {
              title: "Power Reserve",
              desc: "42 hours of uninterrupted performance.",
            },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) textRefs.current[i] = el;
              }}
            >
              <h2 className="text-4xl font-semibold text-buttercream">
                {item.title}
              </h2>
              <p className="mt-4 max-w-md text-white/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT – 3D WATCH */}
        <div className="flex w-1/2 justify-center">
          <div className="rounded-full border border-white/10 bg-black/20 p-8 backdrop-blur">
            <WatchScene
              onUpdate={(watch) => {
                if (!watchObj.current) {
                  watchObj.current = watch;
                  initAnimation(); // 🚀 start GSAP here
                }
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
