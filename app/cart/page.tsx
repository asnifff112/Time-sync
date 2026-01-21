"use client";

import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const removeItem = (id: string) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#020617] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        <h1 className="mb-12 text-4xl font-semibold">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-white/60">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6"
                >
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-white/60">
                      ₹{item.price} × {item.qty}
                    </p>
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
              <span className="text-2xl font-semibold">
                ₹{total.toLocaleString()}
              </span>
            </div>

            <button className="mt-8 w-full rounded-full bg-white py-4 text-black font-medium transition hover:scale-[1.02]">
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </main>
  );
}
