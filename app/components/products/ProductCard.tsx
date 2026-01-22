"use client";
import React from "react";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className="group relative block w-full max-w-[260px] mx-auto"
    >
      {/* Top Caption - Tiny and Premium */}
      <div className="mb-3 flex justify-between items-center px-1">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-medium">
          Precision / {product.category || "Timepiece"}
        </span>
        <span className="text-[9px] text-cyan-500/60 font-mono">0{product.id}</span>
      </div>

      {/* The Main Card with Lando-style Curves */}
      <div className="relative aspect-square overflow-hidden bg-[#0B1220] border border-white/5 transition-all duration-500 
                      rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl
                      group-hover:border-cyan-500/40 group-hover:bg-[#0E1729]">
        
        {/* Product Image - Clean, no hover scale */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover p-8 opacity-90 group-hover:opacity-100 transition-opacity"
        />

        {/* Price & Name Tag - Bottom Left Style */}
        <div className="absolute bottom-4 left-5">
          <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-yellow-200/80 mt-0.5">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
        
        {/* Subtle Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </Link>
  );
}