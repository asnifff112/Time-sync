type WishlistItemType = {
  id: number;
  name: string;
  price: number;
};

export default function WishlistItem({
  item,
}: {
  item: WishlistItemType;
}) {
  return (
    <div className="rounded-lg border border-border bg-white p-6 transition hover:shadow-md">
      
      {/* Image placeholder */}
      <div className="mb-6 h-44 rounded-md bg-gray-100" />

      <h3 className="text-sm font-medium text-midnight">
        {item.name}
      </h3>

      <p className="mt-1 text-sm text-midnight/70">
        ₹{item.price.toLocaleString()}
      </p>

      <div className="mt-6 flex gap-4">
        <button className="flex-1 rounded-full bg-midnight py-2 text-sm font-medium text-buttercream hover:opacity-90 transition">
          Add to Cart
        </button>

        <button className="flex-1 rounded-full border border-border py-2 text-sm text-midnight hover:bg-gray-100 transition">
          Remove
        </button>
      </div>
    </div>
  );
}
