"use client";

import { useState } from "react";

export default function ProfileHeader({ user }: any) {
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      storedUser.avatar = reader.result;
      localStorage.setItem("user", JSON.stringify(storedUser));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="flex items-center gap-5 mb-10">
      {/* AVATAR */}
      <div className="relative">
        <div className="h-16 w-16 rounded-full bg-white/10 overflow-hidden flex items-center justify-center text-xl font-semibold">
          {avatar ? (
            <img src={avatar} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            user?.name?.[0]?.toUpperCase()
          )}
        </div>

        <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-white px-2 py-1 text-xs text-[#0F172A]">
          Edit
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </label>
      </div>

      {/* USER INFO */}
      <div>
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <p className="text-white/60 text-sm">{user?.email}</p>
      </div>
    </section>
  );
}
