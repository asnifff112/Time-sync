"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/app/components/products/ProductCard";
import { productApi } from "@/app/lib/product.api";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [displayItems, setDisplayItems] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await productApi.getAllProducts();
      setProducts(data);
      setDisplayItems(data);
    }
    load();
  }, []);

  const toggleFilter = () => {
    if (isFiltered) {
      setDisplayItems(products);
    } else {
      setDisplayItems(products.filter(p => p.price < 50000));
    }
    setIsFiltered(!isFiltered);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="mx-auto max-w-[1400px] px-8 py-32">
        
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-10">
          <div className="max-w-xl">
            <p className="text-cyan-500 text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">Chronos Sync v1.0</p>
            <h1 className="text-6xl md:text-7xl font-light uppercase tracking-tighter italic leading-none">
              Movement <span className="font-black text-white">Defined</span>
            </h1>
          </div>
          
          <button 
            onClick={toggleFilter}
            className={`mt-8 md:mt-0 px-10 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all duration-300
              ${isFiltered 
                ? "bg-cyan-500 border-cyan-500 text-black" 
                : "border-white/20 text-white/60 hover:border-white hover:text-white"}`}
          >
            {isFiltered ? "Viewing: Under 50k" : "Filter: All Products"}
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid gap-x-8 gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {displayItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}