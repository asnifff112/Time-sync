"use client";
import React, { useEffect, useRef } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import gsap from "gsap";

export default function CheckoutPage() {
  const { items, getFormattedTotal, clearCart } = useCartStore();
  const router = useRouter();
  const formRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    // GSAP Entrance Animation
    gsap.fromTo([formRef.current, summaryRef.current], 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out" }
    );

    if (items.length === 0) {
      toast.error("Your cart is empty!");
      router.push("/products");
    }
  }, [items, router]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Processing your premium order...");
    
    // Simulate API Call
    setTimeout(() => {
      toast.dismiss();
      toast.success("Order Placed Successfully! 🥂");
      clearCart();
      router.push("/");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white py-28 px-6 selection:bg-cyan-500">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <p className="text-cyan-500 text-[10px] uppercase tracking-[0.4em] mb-2 font-bold">Secure Checkout</p>
          <h1 className="text-5xl font-light italic uppercase tracking-tighter">
            Finalize <span className="font-black text-white">Purchase</span>
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* LEFT: Shipping Form */}
          <div ref={formRef} className="lg:col-span-7 space-y-8">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <InputGroup label="First Name" placeholder="Lando" />
                <InputGroup label="Last Name" placeholder="Norris" />
              </div>
              <InputGroup label="Email Address" placeholder="lando@mclaren.com" type="email" />
              <InputGroup label="Shipping Address" placeholder="123 Racing Lane, Monaco" />
              
              <div className="pt-8">
                <h3 className="text-xs uppercase tracking-widest text-white/40 mb-6">Payment Method</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-between">
                    <span className="text-sm font-medium">Credit Card</span>
                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5 opacity-50 flex items-center justify-between grayscale">
                    <span className="text-sm font-medium">Crypto (Coming Soon)</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-10 bg-white text-black font-black py-5 rounded-full uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all active:scale-[0.98]"
              >
                Complete Transaction
              </button>
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div ref={summaryRef} className="lg:col-span-5">
            <div className="sticky top-32 rounded-[2.5rem] bg-[#0B1220] border border-white/5 p-10">
              <h3 className="text-lg font-bold mb-8 italic uppercase tracking-tighter">Order Summary</h3>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-[#020617] p-2 border border-white/5 overflow-hidden">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-[10px] text-white/40 uppercase">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-mono">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
                <div className="flex justify-between text-sm text-white/40">
                  <span>Shipping</span>
                  <span className="text-green-400 font-mono italic">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2">
                  <span className="italic uppercase tracking-tighter">Total</span>
                  <span className="text-yellow-200">{getFormattedTotal()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// Custom Input Component for Premium Feel
function InputGroup({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1 font-bold">{label}</label>
      <input 
        required
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#0B1220] border border-white/5 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/10"
      />
    </div>
  );
}