"use client";
import React, { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { productApi } from "@/app/lib/product.api";
import toast from "react-hot-toast";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const data = await productApi.getProductById(id);
      if (!data) {
        setProduct(null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (!product) return notFound();

  const handleAddToCart = () => {
    // 1. Show Toast
    toast.success(`${product.name} added to cart! 🛒`);
    
    // 2. Navigate to Cart page after a small delay
    setTimeout(() => {
      router.push("/cart");
    }, 1000);
  };

  const handleAddToWishlist = () => {
    toast.success(`${product.name} added to wishlist! ❤️`);
    
    // താല്പര്യമുണ്ടെങ്കിൽ വിഷ്‌ലിസ്റ്റ് പേജിലേക്കും നാവിഗേറ്റ് ചെയ്യാം
    // router.push("/wishlist");
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-white">
      <div className="grid gap-12 md:grid-cols-2">
        {/* IMAGE */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-[500px] w-full object-cover" 
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl text-yellow-200 font-semibold">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            {product.description}
          </p>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button 
              onClick={handleAddToCart}
              className="rounded-full bg-yellow-200 px-10 py-4 text-black font-bold hover:bg-yellow-300 transition-all active:scale-95"
            >
              Add to Cart
            </button>

            <button 
              onClick={handleAddToWishlist}
              className="rounded-full border border-white/30 px-10 py-4 font-semibold hover:bg-white/10 transition-all active:scale-95"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}