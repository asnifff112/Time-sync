"use client";
import React from "react";
import Link from "next/link";
import { useWishlistStore } from "@/app/store/wishlistStore";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: any }) {
  // Store-ൽ നിന്ന് വിഷ്‌ലിസ്റ്റും ടോഗിൾ ഫങ്ക്ഷനും എടുക്കുന്നു
  const { wishlist, toggleWishlist } = useWishlistStore() as any;
  
  // നിലവിൽ ഈ പ്രോഡക്റ്റ് വിഷ്‌ലിസ്റ്റിൽ ഉണ്ടോ എന്ന് നോക്കുന്നു
  const isFavorite = wishlist.some((item: any) => item.id === product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // കാർഡിൽ ക്ലിക്ക് ചെയ്യുമ്പോൾ പ്രോഡക്റ്റ് പേജിലേക്ക് പോകുന്നത് തടയാൻ
    
    toggleWishlist(product);

    // യൂസറിന് ടോസ്റ്റ് മെസ്സേജ് കാണിക്കാൻ
    if (!isFavorite) {
      toast.success(`${product.name} saved to wishlist ❤️`, {
        duration: 1500,
        style: { background: "#0B1220", color: "#fff", border: "1px solid #1E293B", fontSize: "12px" }
      });
    } else {
      toast.error(`Removed from wishlist`, {
        duration: 1500,
        style: { background: "#0B1220", color: "#fff", border: "1px solid #1E293B", fontSize: "12px" }
      });
    }
  };

  return (
    <Link href={`/product/${product.id}`} className="group block w-full">
      {/* Top Meta Info */}
      <div className="mb-3 flex justify-between items-center px-1">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-medium">Precision</span>
        <span className="text-[9px] text-cyan-500/60 font-mono">0{product.id}</span>
      </div>

      {/* Card Body */}
      <div className="relative aspect-square overflow-hidden bg-[#0B1220] border border-white/5 transition-all duration-500 
                      rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl
                      group-hover:border-cyan-500/40 group-hover:bg-[#0E1729]">
        
        {/* Wishlist Heart Icon Button */}
        <button 
          onClick={handleWishlistClick}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-90 group/heart"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "#ef4444" : "none"} 
            stroke={isFavorite ? "#ef4444" : "white"} 
            className={`w-4 h-4 transition-all duration-300 ${isFavorite ? 'scale-110' : 'opacity-60 group-hover/heart:opacity-100'}`}
            strokeWidth="2"
          >
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        
        {/* Product Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover p-8 opacity-90 group-hover:opacity-100 transition-opacity" 
        />

        {/* Bottom Info */}
        <div className="absolute bottom-5 left-6">
          <h3 className="text-sm font-medium text-white/80 group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-yellow-200/80 mt-1 font-mono tracking-tighter">
            ₹{product.price.toLocaleString()}
          </p>
        </div>

        {/* Subtle Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}