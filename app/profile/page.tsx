"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/auth/login");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.85)] backdrop-blur-xl p-8 text-white">
        <h1 className="text-xl font-semibold text-center">
          Profile
        </h1>

        <div className="mt-6 space-y-3 text-sm text-white/80">
          <p><span className="text-white">Name:</span> {user.name}</p>
          <p><span className="text-white">Email:</span> {user.email}</p>
        </div>

        <button
          onClick={() => {
            logoutUser();
            router.push("/");
          }}
          className="mt-8 w-full rounded-full bg-white py-2.5 text-[#0F172A] text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
