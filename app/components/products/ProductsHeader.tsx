"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onFilter: () => void;
  isFiltered: boolean;
}

export default function ProductsHeader({ onFilter, isFiltered }: Props) {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  return (
    <div ref={headerRef} className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-10">
      <div className="max-w-xl">
        <p className="text-cyan-500 text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Chronos Sync v1.0</p>
        <h1 className="text-6xl md:text-7xl font-light uppercase tracking-tighter italic leading-none">
          Movement <span className="font-black text-white">Defined</span>
        </h1>
      </div>
      
      <button 
        onClick={onFilter}
        className={`mt-8 md:mt-0 px-10 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all duration-300
          ${isFiltered ? "bg-cyan-500 border-cyan-500 text-black" : "border-white/20 text-white/60 hover:border-white hover:text-white"}`}
      >
        {isFiltered ? "Viewing: Under 50k" : "Filter: All Products"}
      </button>
    </div>
  );
}