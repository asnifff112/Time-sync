"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useAuth } from "../context/authcontext"; 

// Components
import ProfileHeader from "./components/ProfileHeader";
import OrdersList from "./components/OrdersList";
import AddressManager from "./components/AddressManager";
import AccountActions from "./components/AccountActions";

export default function ProfilePage() {
  const { user } = useAuth(); // Context-ൽ നിന്ന് യൂസറെ എടുക്കുന്നു
  const router = useRouter();
  const mainRef = useRef(null);

  useEffect(() => {
    // യൂസർ ലോഗിൻ അല്ലെങ്കിൽ ലോഗിൻ പേജിലേക്ക് വിടാം (Optional)
    // if (!user) {
    //   router.push("/login");
    // }

    // Page Load Animation (GSAP)
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [user, router]);

  // User load ആവുന്നത് വരെ ഒരു ലോഡിംഗ് കാണിക്കാം
  if (!user) {
    return (
      <main className="flex h-screen w-full items-center justify-center bg-[#0F172A] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          <p className="text-white/60 text-sm animate-pulse">Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main 
      ref={mainRef} 
      className="mx-auto max-w-3xl px-6 py-12 text-white min-h-screen opacity-0" // opacity-0 വെച്ചത് GSAP അത് 1 ആക്കാൻ വേണ്ടിയാണ്
    >
      {/* HEADER SECTION */}
      <ProfileHeader user={user} />

      <div className="space-y-10">
        {/* ORDERS SECTION */}
        <OrdersList user={user} />

        {/* ADDRESS MANAGER */}
        <AddressManager user={user} />

        {/* ACCOUNT SETTINGS (LOGOUT/DELETE) */}
        <AccountActions />
      </div>
    </main>
  );
}