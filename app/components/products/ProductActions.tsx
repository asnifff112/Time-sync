"use client";

import { useState } from "react";
import { Product } from "@/app/types/product";
import { useCartStore } from "@/app/store/cartStore";
import { useWishlistStore } from "@/app/store/wishlistStore";
import { Heart } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductActions({ product }: Props) {
  const [isAdded, setIsAdded] = useState(false);
  const addItemToCart = useCartStore((state) => state.addItem);
  
  const { isInWishlist, toggleItem } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItemToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="mt-10 flex items-center gap-4">
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`flex-1 rounded-full px-10 py-3 font-medium transition duration-300 ${
          isAdded
            ? "bg-green-500 text-white"
            : "bg-buttercream text-midnight hover:opacity-90"
        }`}
      >
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </button>

      <button
        onClick={() => toggleItem(product)}
        className={`rounded-full border p-3 transition duration-300 ${
          isWishlisted
            ? "border-red-500 bg-red-500/10 text-red-500"
            : "border-white/20 hover:border-white/50 text-white"
        }`}
        aria-label="Add to Wishlist"
      >
        <Heart
          className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`}
        />
      </button>
    </div>
  );
}
