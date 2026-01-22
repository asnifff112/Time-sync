"use client";
import React, { useState, useEffect } from "react";
import { productApi } from "@/app/lib/product.api";
import ProductsHeader from "@/app/components/products/ProductsHeader";
import ProductsGrid from "@/app/components/products/ProductsGrid";

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

  const handleFilter = () => {
    if (isFiltered) {
      setDisplayItems(products);
    } else {
      setDisplayItems(products.filter(p => p.price < 50000));
    }
    setIsFiltered(!isFiltered);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500">
      <section className="mx-auto max-w-[1400px] px-8 py-32">
        <ProductsHeader onFilter={handleFilter} isFiltered={isFiltered} />
        <ProductsGrid products={displayItems} />
        
        {displayItems.length === 0 && (
          <div className="text-center py-20 text-white/20 uppercase tracking-widest text-xs">
            No products match your criteria
          </div>
        )}
      </section>
    </main>
  );
}