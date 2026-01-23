"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

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

  const login = useCallback((userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setTimeout(() => {
      router.push("/");
    }, 100);
  }, [router]);

  // --- UPDATED LOGOUT FUNCTION ---
  const logout = useCallback(() => {
    // 1. ഡാറ്റ ക്ലിയർ ചെയ്യുന്നു
    localStorage.removeItem("user");
    setUser(null);
    
    // 2. ബ്ലാങ്ക് സ്ക്രീൻ ഒഴിവാക്കാൻ വിൻഡോ ലൊക്കേഷൻ തന്നെ മാറ്റുന്നു
    // ഇത് ആപ്പിനെ ഒന്ന് ഫ്രഷ് ആയി ഹോം പേജിൽ എത്തിക്കും
    window.location.href = "/";
  }, []);

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