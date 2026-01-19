export default function CartSummary() {
  const subtotal = 12999 + 18999 * 2;

  return (
    <aside className="h-fit rounded-lg border border-border bg-white p-6">
      <h2 className="text-lg font-semibold text-midnight">
        Order Summary
      </h2>

      <div className="mt-6 space-y-3 text-sm text-midnight/80">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between border-t border-border pt-4 font-medium text-midnight">
        <span>Total</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>

      <button className="mt-6 w-full rounded-full bg-midnight py-3 text-sm font-medium text-buttercream hover:opacity-90 transition">
        Proceed to Checkout
      </button>
    </aside>
  );
}
