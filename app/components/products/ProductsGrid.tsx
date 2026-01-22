"use client";
import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import gsap from "gsap";

export default function ProductsGrid({ products }: { products: any[] }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = (gridRef.current as any).children;
    gsap.fromTo(cards, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, [products]);

  return (
    <div ref={gridRef} className="grid gap-x-8 gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}