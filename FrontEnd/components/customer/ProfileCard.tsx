"use client";

import { useRef, ChangeEvent } from "react";
import { FaCalendarAlt, FaEnvelope, FaPhone, FaUser, FaPen } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
}

interface Props { 
  user: User; 
  onAvatarChange?: (avatar: string) => void;
}

export default function ProfileCard({ user, onAvatarChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const initials = user.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran gambar maksimal 2MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onAvatarChange?.(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#145A3B] to-[#1e7a50] rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-4 right-20 w-24 h-24 rounded-full bg-white/5" />

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Hidden Input File */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Avatar Container with Hover Pen Overlay */}
        <div 
          onClick={handleAvatarClick}
          className="group relative w-24 h-24 rounded-3xl overflow-hidden border-4 border-white/20 shrink-0 cursor-pointer shadow-md active:scale-95 transition-all duration-200"
          title="Klik untuk ubah foto profil"
        >
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/20 flex items-center justify-center text-3xl font-black text-white">
              {initials}
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaPen className="text-white text-base" />
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <p className="text-emerald-200 text-xs font-extrabold uppercase tracking-widest">Customer</p>
          <h2 className="text-2xl font-black mt-1">{user.name}</h2>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4">
            <span className="flex items-center gap-2 text-sm text-emerald-200 font-semibold">
              <FaEnvelope className="shrink-0" /> {user.email}
            </span>
            {user.phone && (
              <span className="flex items-center gap-2 text-sm text-emerald-200 font-semibold">
                <FaPhone className="shrink-0" /> {user.phone}
              </span>
            )}
            <span className="flex items-center gap-2 text-sm text-emerald-200 font-semibold">
              <FaCalendarAlt className="shrink-0" /> Bergabung {joined}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
