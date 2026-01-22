import WishlistHeader from "@/app/components/Wishlist/WishlistHeader";
import WishlistItems from "@/app/components/Wishlist/WishlistItems";

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white py-32 px-8">
      <div className="mx-auto max-w-[1400px]">
        <WishlistHeader />
        <WishlistItems />
      </div>
    </main>
  );
}