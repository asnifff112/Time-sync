"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ModelViewer from "@/app/components/three/ModelViewer";
import { getProductBySlug } from "@/app/lib/product.api";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  modelUrl: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const productId = Array.isArray(id) ? id[0] : id;
  if (!productId) return;

  setLoading(true);

  Promise.resolve(getProductBySlug(productId))
    .then((data) => {
      if (data) {
        setProduct({ ...data, modelUrl: "" } as Product);
      } else {
        setProduct(null);
      }
    })
    .catch(() => {
      setProduct(null);
    })
    .finally(() => {
      setLoading(false);
    });
}, [id]);


  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading product…
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Product not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* LEFT – 3D WATCH */}
        <div className="flex justify-center">
          <div className="rounded-full border border-white/10 bg-white/5 p-8 shadow-[0_0_80px_rgba(255,255,255,0.08)]">
            <ModelViewer
              url={product.modelUrl}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </div>
        </div>

        {/* RIGHT – DETAILS */}
        <div>
          <p className="text-sm tracking-widest text-white/60 mb-3">
            TIME SYNC COLLECTION
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            {product.name}
          </h1>

          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            {product.description}
          </p>

          {/* FEATURES */}
          <ul className="mt-8 space-y-3 text-white/70">
            <li>• Automatic Mechanical Movement</li>
            <li>• Sapphire Crystal Glass</li>
            <li>• 42 Hour Power Reserve</li>
            <li>• Water Resistant – 50m</li>
          </ul>

          {/* PRICE + ACTIONS */}
          <div className="mt-10 flex items-center gap-6">
            <span className="text-3xl font-semibold">
              ₹{product.price.toLocaleString()}
            </span>

            <button
              className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition hover:scale-105"
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                cart.push({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  qty: 1,
                });
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>

          {/* WISHLIST */}
          <button
            className="mt-6 text-sm text-white/60 hover:text-white transition"
            onClick={() => {
              const wishlist = JSON.parse(
                localStorage.getItem("wishlist") || "[]"
              );
              wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
              });
              localStorage.setItem("wishlist", JSON.stringify(wishlist));
              alert("Added to wishlist");
            }}
          >
            ♡ Add to Wishlist
          </button>

        </div>
      </div>
    </main>
  );
}
