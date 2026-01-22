"use client";
import React from "react";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/product/${product.id}`} className="group block w-full">
      <div className="mb-3 flex justify-between items-center px-1">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-medium">Precision</span>
        <span className="text-[9px] text-cyan-500/60 font-mono">0{product.id}</span>
      </div>

      <div className="relative aspect-square overflow-hidden bg-[#0B1220] border border-white/5 transition-all duration-500 
                      rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl
                      group-hover:border-cyan-500/40 group-hover:bg-[#0E1729]">
        
        <img src={product.image} alt={product.name} className="h-full w-full object-cover p-8 opacity-90 group-hover:opacity-100 transition-opacity" />

        <div className="absolute bottom-4 left-5">
          <h3 className="text-sm font-medium text-white/80">{product.name}</h3>
          <p className="text-xs text-yellow-200/80 mt-0.5">₹{product.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}