import WishlistHeader from "@/app/components/Wishlist/WishlistHeader";
import WishlistItems from '@/app/components/Wishlist/WishlistItems';

export default function WishlistPage() {
  return (
    <main className="bg-buttercream pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <WishlistHeader />
        <WishlistItems />
      </div>
    </main>
  );
}
