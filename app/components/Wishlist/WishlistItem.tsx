"use client";
import { useWishlistStore } from "@/app/store/wishlistStore";
import { useCartStore } from "@/app/store/cartStore";
import toast from "react-hot-toast";

export default function WishlistItem({ product }: { product: any }) {
  
  const wishlist = useWishlistStore((state: any) => state);
  const addItem = useCartStore((state: any) => state.addItem);

  
  const removeFn = wishlist.removeFromWishlist || wishlist.removeItem || wishlist.remove;

  const handleMoveToCart = () => {
    if (!product) return;

 
    addItem(product);

  
    if (typeof removeFn === "function") {
      removeFn(product.id);
      toast.success("Moved to cart! 🛒");
    } else {
      console.error("Wishlist remove function not found in store!");
      toast.error("Could not remove from wishlist");
    }
  };

  const handleRemoveOnly = () => {
    if (typeof removeFn === "function") {
      removeFn(product.id);
      toast.success("Removed from wishlist");
    }
  };

  return (
    <div className="group relative bg-[#0B1220] rounded-[2rem] p-6 border border-white/5 hover:border-cyan-500/30 transition-all">
      <div className="aspect-square mb-6 overflow-hidden rounded-xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <h3 className="text-lg font-medium mb-1">{product.name}</h3>
      <p className="text-yellow-200 text-sm mb-6">₹{product.price.toLocaleString()}</p>
      
      <div className="flex flex-col gap-2">
        <button 
          onClick={handleMoveToCart} 
          className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase rounded-xl hover:bg-cyan-400 transition"
        >
          Move to Cart
        </button>
        <button 
          onClick={handleRemoveOnly} 
          className="w-full py-3 bg-white/5 text-white/40 text-[10px] font-bold uppercase rounded-xl hover:text-red-400 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}