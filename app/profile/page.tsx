"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import OrdersList from "./components/OrdersList";
import AddressManager from "./components/AddressManager";
import AccountActions from "./components/AccountActions";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 text-white">
        <p className="text-white/60">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-white">
      <ProfileHeader user={user} />

      <div className="space-y-10">
        <OrdersList user={user} />
        <AddressManager user={user} />
        <AccountActions />
      </div>
    </main>
  );
}
