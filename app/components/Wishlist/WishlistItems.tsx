import WishlistItem from "@/app/components/Wishlist/WishlistItem";

const mockWishlist = [
  {
    id: 1,
    name: "TimeSync Classic",
    price: 12999,
  },
  {
    id: 2,
    name: "TimeSync Elite",
    price: 24999,
  },
];

export default function WishlistItems() {
  if (mockWishlist.length === 0) {
    return (
      <p className="text-sm text-midnight/70">
        Your wishlist is empty.
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      {mockWishlist.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </div>
  );
}
