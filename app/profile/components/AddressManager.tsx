"use client";

import { useState, useEffect } from "react";

export default function AddressManager({ user }: any) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Load addresses safely
  useEffect(() => {
    setAddresses(user?.addresses || []);
  }, [user]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    if (!form.line1 || !form.city || !form.state || !form.pincode) return;

    const updatedAddresses = [...addresses, form];
    setAddresses(updatedAddresses);

    // Update localStorage user
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    storedUser.addresses = updatedAddresses;
    localStorage.setItem("user", JSON.stringify(storedUser));

    setForm({ line1: "", city: "", state: "", pincode: "" });
    setShowForm(false);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.6)] backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">Saved Addresses</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-full border border-white/20 px-4 py-1.5 text-sm hover:bg-white hover:text-[#0F172A] transition"
        >
          {showForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {/* ADDRESS LIST */}
      {addresses.length === 0 ? (
        <p className="text-white/60 text-sm">
          No addresses added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 p-4 text-sm"
            >
              <p>{address.line1}</p>
              <p className="text-white/70">
                {address.city}, {address.state}
              </p>
              <p className="text-white/70">{address.pincode}</p>
            </div>
          ))}
        </div>
      )}

      {/* ADD ADDRESS FORM */}
      {showForm && (
        <div className="mt-6 space-y-4">
          <input
            name="line1"
            placeholder="Address line"
            value={form.line1}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm text-white outline-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm text-white outline-none"
            />
            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm text-white outline-none"
            />
          </div>

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm text-white outline-none"
          />

          <button
            onClick={handleAddAddress}
            className="mt-2 w-full rounded-full bg-white py-2 text-sm text-[#0F172A] hover:opacity-90 transition"
          >
            Save Address
          </button>
        </div>
      )}
    </section>
  );
}
