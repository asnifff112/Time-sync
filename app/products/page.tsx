"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/app/components/products/ProductCard";
import { productApi } from "@/app/lib/product.api";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await productApi.getAllProducts();
      setAllProducts(data);
      setFilteredProducts(data);
    }
    load();
  }, []);

  // Filter Function: ₹50,000-ന് താഴെയുള്ളവ മാത്രം കാണിക്കാൻ
  const handleFilter = () => {
    if (isFiltered) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.price < 50000);
      setFilteredProducts(filtered);
    }
    setIsFiltered(!isFiltered);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="mx-auto max-w-[1400px] px-6 py-32">
        
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
              The <span className="text-cyan-500">Sync</span> Collection
            </h1>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleFilter}
              className={`rounded-full border border-white/20 px-8 py-3 uppercase text-xs font-bold transition-all ${
                isFiltered ? "bg-cyan-500 text-black border-cyan-500" : "hover:bg-white hover:text-black"
              }`}
            >
              {isFiltered ? "Show All" : "Under ₹50k"}
            </button>
          </div>
        </div>

        {/* Grid with smaller cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-20">No products found matching the criteria.</p>
        )}
      </section>
    </main>
  );
}