"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/authcontext"; // AuthContext ഇമ്പോർട്ട് ചെയ്തു
import { updateUserPassword } from "@/lib/auth"; // API ഫങ്ക്ഷൻ ഇമ്പോർട്ട് ചെയ്തു
import { toast } from "react-hot-toast";
import gsap from "gsap";

export default function AccountActions() {
  const { user, logout } = useAuth(); // Context-ൽ നിന്ന് ലോഗൗട്ടും യൂസറെയും എടുത്തു
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passForm, setPassForm] = useState({ old: "", new: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  // 1. ലോഗൗട്ട് ചെയ്യുമ്പോൾ സ്മൂത്ത് ആനിമേഷൻ
  const handleLogout = () => {
    gsap.to("body", { 
      opacity: 0, 
      duration: 0.4, 
      onComplete: () => logout() // Context-ലെ ഫ്രഷ് ലോഗൗട്ട് വിളിക്കുന്നു
    });
  };

  // 2. പാസ്‌വേഡ് മാറ്റം ഡാറ്റാബേസിൽ വരുത്തുന്നു
  const handleChangePassword = async () => {
    // സിമ്പിൾ വാലിഡേഷൻ
    if (!passForm.old || !passForm.new) {
      toast.error("Please fill all fields");
      return;
    }

    if (passForm.old !== user.password) {
      toast.error("Current password is incorrect");
      return;
    }

    if (passForm.new !== passForm.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // lib/auth.ts ലെ ഫങ്ക്ഷൻ വഴി DB അപ്‌ഡേറ്റ് ചെയ്യുന്നു
      await updateUserPassword(user.id, passForm.new);

      toast.success("Password updated! Logging out...");
      
      // പാസ്‌വേഡ് മാറിയാൽ വീണ്ടും ലോഗിൻ ചെയ്യിപ്പിക്കുന്നത് സെക്യൂരിറ്റിക്ക് നല്ലതാണ്
      setTimeout(() => {
        handleLogout();
      }, 2000);

    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8">
        <h3 className="mb-6 text-xl font-bold text-white">Account Settings</h3>

        <div className="space-y-4">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full rounded-xl border border-white/20 bg-transparent py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black hover:scale-[1.02]"
          >
            Change Password
          </button>

          <button
            onClick={handleLogout} // അപ്‌ഡേറ്റ് ചെയ്ത ലോഗൗട്ട്
            className="w-full rounded-xl border border-white/20 bg-transparent py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black hover:scale-[1.02]"
          >
            Logout
          </button>
          
          {/* Delete Account code remains same... */}
        </div>
      </section>

      {/* MODAL CODE... */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Update Password</h3>
            
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-white/50 focus:outline-none"
                value={passForm.old}
                onChange={(e) => setPassForm({ ...passForm, old: e.target.value })}
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-white/50 focus:outline-none"
                value={passForm.new}
                onChange={(e) => setPassForm({ ...passForm, new: e.target.value })}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-white/50 focus:outline-none"
                value={passForm.confirm}
                onChange={(e) => setPassForm({ ...passForm, confirm: e.target.value })}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 rounded-lg border border-white/10 py-2 text-sm text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="flex-1 rounded-lg bg-white py-2 text-sm font-bold text-black hover:bg-gray-200 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}