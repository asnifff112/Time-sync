"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // 1. പേജ് ലോഡ് ആവുമ്പോൾ ഡാറ്റ എടുക്കുന്നു
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // 2. Login Function
  const login = useCallback((userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    // ചെറിയൊരു ഡിലേ നൽകുന്നത് സ്റ്റേറ്റ് കറക്റ്റ് ആയി അപ്‌ഡേറ്റ് ആവാൻ സഹായിക്കും
    setTimeout(() => {
      router.push("/");
    }, 100);
  }, [router]);

  // 3. Logout Function
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    // window.location ഉപയോഗിക്കുന്നതിന് പകരം router.push ഉപയോഗിക്കുന്നത് സ്മൂത്ത് ആയിരിക്കും
    router.refresh(); // Navbar റീസെറ്റ് ചെയ്യാൻ ഇത് സഹായിക്കും
    router.push("/");
  }, [router]);

  // Hydration പ്രശ്നം ഒഴിവാക്കാൻ
  if (!isMounted) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};