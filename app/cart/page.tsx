"use client";
import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";

export default function CartPage() {
    // Zustand-ൽ നിന്ന് ഡാറ്റയും ഫങ്ക്ഷനും എടുക്കുന്നു
    const { items, removeItem, getFormattedTotal } = useCartStore();

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#020617] text-white">
            <div className="mx-auto max-w-5xl px-6 py-24">
                <h1 className="mb-12 text-4xl font-semibold">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-white/60 mb-6">Your cart is empty.</p>
                        <Link href="/products" className="text-blue-400 underline">Continue Shopping</Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6"
                                >
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                        <div>
                                            <h3 className="text-lg font-medium">{item.name}</h3>
                                            <p className="text-white/60">
                                                ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-sm text-red-400 hover:text-red-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL */}
                        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
                            <span className="text-xl">Total</span>
                            <span className="text-2xl font-semibold text-yellow-200">
                                {getFormattedTotal()}
                            </span>
                        </div>

                        <Link href="/checkout" className="block w-full">
  <button className="mt-8 w-full rounded-full bg-white py-4 text-black font-medium transition hover:scale-[1.02]">
    Proceed to Checkout
  </button>
</Link>
                    </>
                )}
            </div>
        </main>
    );
}