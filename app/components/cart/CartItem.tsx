type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function CartItem({ item }: { item: CartItemType }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-white p-4">
      
      {/* LEFT */}
      <div>
        <h3 className="text-sm font-medium text-midnight">
          {item.name}
        </h3>
        <p className="mt-1 text-sm text-midnight/70">
          ₹{item.price.toLocaleString()}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <span className="text-sm text-midnight">
          Qty: {item.quantity}
        </span>

        <button className="text-sm text-red-500 hover:underline">
          Remove
        </button>
      </div>
    </div>
  );
}
