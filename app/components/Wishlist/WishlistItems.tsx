"use client";
import { useWishlistStore } from "@/app/store/wishlistStore";
import WishlistItem from "./WishlistItem";

export default function WishlistItems() {
  const wishlist = useWishlistStore((state: any) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-32 bg-[#0B1220] rounded-[3rem] border border-dashed border-white/10">
        <p className="text-white/20 uppercase tracking-[0.4em] text-xs font-bold">Your wishlist is currently empty</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {wishlist.map((item: any) => (
        <WishlistItem key={item.id} product={item} />
      ))}
    </div>
  );
}