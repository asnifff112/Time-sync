"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import Link from "next/link";
import { useAuth } from "@/app/context/authcontext"; 

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(email, password);
      
      
      login(user); 
      
     
      router.push("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.85)] backdrop-blur-xl p-8 shadow-2xl"
      >
        <h1 className="text-2xl font-semibold text-white text-center">Login</h1>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400 text-center">{error}</p>
          </div>
        )}

        <div className="space-y-4 mt-6">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-white/5 border border-white/10 focus:border-white/30 outline-none px-4 py-3 rounded-xl text-white transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-white/5 border border-white/10 focus:border-white/30 outline-none px-4 py-3 rounded-xl text-white transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="mt-8 w-full bg-white text-[#0F172A] py-3 rounded-full font-bold hover:bg-gray-200 transition-all active:scale-95">
          Login
        </button>

        <p className="mt-6 text-center text-sm text-white/60">
          No account?{" "}
          <Link href="/auth/register" className="text-white hover:underline transition">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}