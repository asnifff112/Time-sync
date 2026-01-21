"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.85)] backdrop-blur-xl p-8 shadow-2xl">
        
        <h1 className="text-2xl font-semibold text-white text-center">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-sm text-white/60">
          Login to continue with TimeSync
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg bg-transparent border border-white/20 px-4 py-2.5 text-white outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg bg-transparent border border-white/20 px-4 py-2.5 text-white outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-white py-2.5 text-sm font-medium text-[#0F172A] transition hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-white hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
