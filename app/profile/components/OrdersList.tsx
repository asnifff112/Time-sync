"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OrdersList({ user }: any) {
  const orders = user?.orders || [];
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      // Stagger animation: Elements appear one after another
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [orders]);

  return (
    <section className="h-full">
      <h3 className="mb-6 text-xl font-bold text-white">Recent Orders</h3>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center backdrop-blur-sm">
          <p className="text-white/40">No orders placed yet.</p>
        </div>
      ) : (
        <div ref={listRef} className="space-y-4">
          {orders.map((o: any) => (
            <div
              key={o.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Order ID</p>
                  <p className="font-mono text-white">#{o.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Total Amount</p>
                  <p className="text-lg font-semibold text-emerald-400">₹{o.total}</p>
                </div>
              </div>
              {/* Decorative gradient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}