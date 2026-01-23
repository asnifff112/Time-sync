"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function ProfileHeader({ user }: any) {
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const containerRef = useRef(null);
  const infoRef = useRef(null);

  // GSAP Animation on Load
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(infoRef.current, 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.5 }, 
      "-=0.4"
    );
  }, []);

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      // Ideally, upload this image to your backend/cloud storage here
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      storedUser.avatar = reader.result;
      localStorage.setItem("user", JSON.stringify(storedUser));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="flex items-center gap-6 mb-12">
      {/* AVATAR */}
      <div ref={containerRef} className="relative group">
        <div className="h-24 w-24 rounded-full border-4 border-white/5 bg-white/10 overflow-hidden flex items-center justify-center text-3xl font-bold shadow-2xl">
          {avatar ? (
            <img src={avatar as string} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <span className="text-white/80">{user?.name?.[0]?.toUpperCase()}</span>
          )}
        </div>

        <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-2 text-[#0F172A] shadow-lg transition-transform hover:scale-110 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
          </svg>
          <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
        </label>
      </div>

      {/* USER INFO */}
      <div ref={infoRef}>
        <h2 className="text-2xl font-bold tracking-tight text-white">{user?.name}</h2>
        <p className="text-white/50 text-sm mt-1">{user?.email}</p>
        <div className="mt-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs text-emerald-400 border border-emerald-500/20">
          Active Member
        </div>
      </div>
    </section>
  );
}