"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser({ name, email, password });
      router.push("/auth/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.85)] backdrop-blur-xl p-8"
      >
        <h1 className="text-2xl text-white text-center">Sign Up</h1>

        {error && (
          <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
        )}

        <input
          placeholder="Name"
          className="mt-6 w-full bg-transparent border border-white/20 px-4 py-2.5 rounded-lg text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="mt-4 w-full bg-transparent border border-white/20 px-4 py-2.5 rounded-lg text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full bg-transparent border border-white/20 px-4 py-2.5 rounded-lg text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-6 w-full bg-white text-[#0F172A] py-2.5 rounded-full">
          Create Account
        </button>

        <p className="mt-4 text-center text-sm text-white/60">
          Already have account?{" "}
          <Link href="/auth/login" className="text-white underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
