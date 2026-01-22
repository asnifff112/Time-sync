"use client";
import React from "react";
import { useWishlistStore } from "@/app/store/wishlistStore";
import { useCartStore } from "@/app/store/cartStore";
import ProductCard from "@/app/components/products/ProductCard";
import toast from "react-hot-toast";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlistStore();
    const addItem = useCartStore((state) => state.addItem);

    const moveToCart = (product: any) => {
        addItem(product);
        removeFromWishlist(product.id);
        toast.success("Moved to cart! 🛒");
    };

    return (
        <main className="min-h-screen bg-[#020617] text-white py-28 px-8">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-20 border-b border-white/5 pb-10">
                    <p className="text-cyan-500 text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">Saved Items</p>
                    <h1 className="text-6xl md:text-7xl font-light uppercase tracking-tighter italic">
                        Your <span className="font-black text-white">Wishlist</span>
                    </h1>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-[#0B1220] rounded-[3rem] border border-dashed border-white/10">
                        <p className="text-white/40 uppercase tracking-widest text-xs">No items saved yet</p>
                    </div>
                ) : (
                    <div className="grid gap-x-8 gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {wishlist.map((product) => (
                            <div key={product.id} className="relative group">
                                <ProductCard product={product} />
                                
                                {/* Wishlist Specific Actions */}
                                <div className="mt-4 flex flex-col gap-2 px-2">
                                    <button 
                                        onClick={() => moveToCart(product)}
                                        className="w-full py-2 bg-cyan-500 text-black text-[10px] font-bold uppercase rounded-lg hover:bg-cyan-400 transition"
                                    >
                                        Move to Cart
                                    </button>
                                    <button 
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="w-full py-2 bg-white/5 text-white/40 text-[10px] font-bold uppercase rounded-lg hover:text-red-400 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}