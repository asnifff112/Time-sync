"use client";

export default function AccountActions() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const deleteAccount = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <section className="rounded-2xl border border-white/10 p-6">
      <h3 className="mb-4 text-lg font-semibold">Account</h3>

      <div className="space-y-3">
        <button className="w-full rounded-full border border-white/20 py-2 text-sm hover:bg-white hover:text-black transition">
          Change Password
        </button>

        <button
          onClick={logout}
          className="w-full rounded-full border border-white/20 py-2 text-sm hover:bg-white hover:text-black transition"
        >
          Logout
        </button>

        <button
          onClick={deleteAccount}
          className="w-full rounded-full border border-red-500/40 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          Delete Account
        </button>
      </div>
    </section>
  );
}
