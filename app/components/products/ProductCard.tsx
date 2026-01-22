"use client";
import React from "react";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className="group relative block w-full max-w-[280px] mx-auto" // സൈസ് കുറച്ചു
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#0B1220] border border-white/5 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-[#0f172a]">
        
        {/* Product Image - No more GSAP rotation/scale */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover p-6"
        />

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#0B1220] to-transparent">
          <div className="flex flex-col items-start">
            <h3 className="text-md font-medium text-white/90">
              {product.name}
            </h3>
            <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mt-1">
               2026 Edition
            </p>
            <p className="text-sm text-yellow-200 mt-1">₹{product.price.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}