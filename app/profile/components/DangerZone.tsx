import { useRouter } from "next/navigation";

export default function DangerZone({ user }: any) {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const deleteAccount = () => {
    alert("Account deleted (mock)");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <section className="border-t border-white/10 pt-6">
      <h3 className="text-red-400 font-semibold mb-4">Danger Zone</h3>
      <button onClick={logout} className="btn-secondary mb-3">
        Logout
      </button>
      <button onClick={deleteAccount} className="btn-danger">
        Delete Account
      </button>
    </section>
  );
}
