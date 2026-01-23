"use client";
import React, { use, useEffect, useState, useRef } from "react";
import { productApi } from "@/app/lib/product.api";
import { cartApi } from "@/app/lib/cart.api";
import { wishlistApi } from "@/app/lib/wishlist.api"; // Wishlist API
import { useCartStore } from "@/app/store/cartStore";
import { useWishlistStore } from "@/app/store/wishlistStore"; // Wishlist Store
import toast from "react-hot-toast";
import gsap from "gsap";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: Props) {
  const { id } = use(params);
  const addItem = useCartStore((state) => state.addItem);
  
  // Wishlist Store Functions
  const { wishlist, addItem: addToWishStore, removeItem: removeFromWishStore } = useWishlistStore();
  
  const [product, setProduct] = useState<any>(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  // Check if product is already in wishlist
  const isFavorite = wishlist.some((item) => item.id === id);

  useEffect(() => {
    async function loadData() {
      const data = await productApi.getProductById(id);
      setProduct(data);
      
      if (data) {
        gsap.fromTo(imgRef.current, 
          { opacity: 0, scale: 0.9, x: -50 }, 
          { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power4.out" }
        );
        gsap.fromTo(textRef.current, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
        );
      }
    }
    loadData();
  }, [id]);

  if (!product) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // --- Add to Cart Logic ---
  const handleAddToCart = async () => {
    try {
      await cartApi.addToCart({ productId: product.id, quantity: 1 });
      addItem(product);
      toast.success(`${product.name} added to cart! 🛒`, {
        style: { background: '#0B1220', color: '#fff', border: '1px solid #1E293B' }
      });
    } catch (error) {
      toast.error("Cart sync failed, but added locally");
      addItem(product);
    }
  };

  // --- Wishlist Toggle Logic (DB + Store) ---
  const handleWishlistToggle = async () => {
    try {
      if (isFavorite) {
        await wishlistApi.removeFromWishlist(product.id);
        removeFromWishStore(product.id);
        toast.error("Removed from Wishlist");
      } else {
        await wishlistApi.addToWishlist(product.id);
        addToWishStore(product);
        toast.success("Saved to Wishlist! ❤️", {
          icon: '🔥',
          style: { background: '#0B1220', color: '#fff' }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Wishlist sync failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white py-28 px-6 selection:bg-cyan-500">
      <div className="mx-auto max-w-6xl grid gap-16 md:grid-cols-2 items-center">
        
        {/* LEFT: Image Section */}
        <div ref={imgRef} className="relative group">
          <div className="absolute -inset-4 bg-cyan-500/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0B1220] shadow-2xl">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* RIGHT: Details Section */}
        <div ref={textRef} className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-cyan-500"></span>
              <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[10px]">Premium Timepiece</span>
            </div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <p className="text-4xl font-mono text-yellow-200">₹{product.price.toLocaleString("en-IN")}</p>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-white/40 tracking-widest mb-1">Status</span>
              <span className="text-xs font-bold text-green-400">Available Now</span>
            </div>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed font-light border-l-2 border-white/5 pl-6">
            {product.description || "An uncompromising fusion of avant-garde design and mechanical perfection. Built for those who define time on their own terms."}
          </p>

          {/* COLOR SELECTION */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Select Finish</h4>
            <div className="flex gap-4">
              {["Midnight", "Titanium", "Gold"].map((color) => (
                <button key={color} className="px-6 py-2 rounded-full border border-white/10 hover:border-cyan-500/50 transition-all text-[10px] uppercase font-bold bg-white/5 tracking-widest">
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button 
              onClick={handleAddToCart}
              className="flex-[2] bg-white text-black font-black py-5 rounded-2xl hover:bg-cyan-400 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
            >
              Add to Bag
            </button>
            <button 
              onClick={handleWishlistToggle}
              className={`flex-1 font-bold py-5 rounded-2xl transition-all active:scale-95 border flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest ${
                isFavorite 
                ? "bg-red-500/10 border-red-500/50 text-red-500" 
                : "bg-transparent border-white/10 hover:bg-white/5 text-white"
              }`}
            >
              {isFavorite ? "Saved ❤️" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}