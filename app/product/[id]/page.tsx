"use client";
import React, { use, useEffect, useState, useRef } from "react";
import { notFound } from "next/navigation";
import { productApi } from "@/app/lib/product.api";
import { cartApi } from "@/app/lib/cart.api";
import { useCartStore } from "@/app/store/cartStore";
import toast from "react-hot-toast";
import gsap from "gsap";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: Props) {
  const { id } = use(params);
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<any>(null);
  
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      const data = await productApi.getProductById(id);
      setProduct(data);
      
      // GSAP Animation
      if (data) {
        gsap.fromTo(imgRef.current, 
          { opacity: 0, x: -50 }, 
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        );
        gsap.fromTo(textRef.current, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
        );
      }
    }
    loadData();
  }, [id]);

  if (!product) return <div className="min-h-screen bg-[#0B1220] flex items-center justify-center text-white">Loading...</div>;

  const handleAddToCart = async () => {
    try {
      await cartApi.addToCart({ productId: product.id, quantity: 1 });
      addItem(product);
      toast.success(`${product.name} added to cart! 🛒`, {
        style: { background: '#1E293B', color: '#fff', border: '1px solid #334155' }
      });
    } catch (error) {
      toast.error("Could not sync with database");
    }
  };

  const handleAddToWishlist = () => {
    toast.success("Added to Wishlist! ❤️");
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white py-24 px-6">
      <div className="mx-auto max-w-6xl grid gap-16 md:grid-cols-2 items-center">
        
        {/* LEFT: Image Section with GSAP */}
        <div ref={imgRef} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[550px] object-cover transition-transform duration-700 hover:scale-110" 
            />
          </div>
        </div>

        {/* RIGHT: Details Section */}
        <div ref={textRef} className="space-y-8">
          <div>
            <span className="text-cyan-400 font-medium tracking-widest uppercase text-sm">Premium Collection</span>
            <h1 className="text-5xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-3xl font-semibold text-yellow-200">₹{product.price.toLocaleString("en-IN")}</p>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">In Stock</span>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed">
            {product.description || "Expertly crafted with precision and elegance, this timepiece represents the pinnacle of watchmaking technology."}
          </p>

          {/* COLOR SELECTION */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/60">Available Finishes</h4>
            <div className="flex gap-3">
              {["Silver Steel", "Midnight Black", "Rose Gold"].map((color) => (
                <button key={color} className="px-4 py-2 rounded-lg border border-white/10 hover:border-cyan-500 transition text-sm bg-white/5">
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleAddToWishlist}
              className="flex-1 bg-transparent border border-white/20 font-bold py-4 rounded-xl hover:bg-white/5 transition-all active:scale-95"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}