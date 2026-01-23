"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function AddressManager({ user }: any) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [form, setForm] = useState({
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    setAddresses(user?.addresses || []);
  }, [user]);

  // Animate Form Open/Close
  useEffect(() => {
    if (showForm && formRef.current) {
      gsap.fromTo(formRef.current, 
        { height: 0, opacity: 0 }, 
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [showForm]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    if (!form.line1 || !form.city || !form.state || !form.pincode) return;

    const updatedAddresses = [...addresses, form];
    setAddresses(updatedAddresses);

    // Update LocalStorage (Replace with API Call in real app)
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    storedUser.addresses = updatedAddresses;
    localStorage.setItem("user", JSON.stringify(storedUser));

    setForm({ line1: "", city: "", state: "", pincode: "" });
    setShowForm(false);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Saved Addresses</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="group relative rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-white hover:text-black"
        >
          {showForm ? "Cancel" : "+ Add New"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {addresses.length === 0 && !showForm && (
           <p className="text-white/40 text-sm italic">No addresses saved.</p>
        )}
        
        {addresses.map((address, index) => (
          <div key={index} className="relative rounded-2xl border border-white/10 bg-black/20 p-5 transition-transform hover:-translate-y-1">
            <p className="font-medium text-white">{address.line1}</p>
            <p className="text-white/60 text-sm mt-1">
              {address.city}, {address.state} - <span className="text-white/80">{address.pincode}</span>
            </p>
          </div>
        ))}
      </div>

      {/* FORM */}
      {showForm && (
        <div ref={formRef} className="overflow-hidden mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <input
              name="line1"
              placeholder="House / Flat / Street"
              value={form.line1}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition-colors"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none"
              />
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none"
              />
            </div>
            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/40 focus:outline-none"
            />
            <button
              onClick={handleAddAddress}
              className="w-full rounded-xl bg-white py-3 text-sm font-bold text-black transition-transform active:scale-95 hover:bg-gray-200"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </section>
  );
}