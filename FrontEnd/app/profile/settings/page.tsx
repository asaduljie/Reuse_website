"use client";

import { useRouter } from "next/navigation";
import AccountMenu from "../../../components/customer/AccountMenu";
import ChangePassword from "../../../components/customer/ChangePassword";
import { logout } from "../../../utils/auth";
import { FaBell, FaLanguage, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

export default function AccountSettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("id");

  const handleChangePassword = async (current: string, newPwd: string) => {
    // Placeholder — will call backend API
    await new Promise((r) => setTimeout(r, 800));
    console.log("Change password request:", { current, newPwd });
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Akun Saya</p>
          <h1 className="text-3xl font-black text-gray-900 mt-1">Pengaturan Akun</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-56 shrink-0"><AccountMenu /></div>

          <div className="flex-1 min-w-0 space-y-6">
            <ChangePassword onSave={handleChangePassword} />

            {/* Notification preference */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-4">
              <h3 className="text-lg font-extrabold text-gray-800">Preferensi</h3>

              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <FaBell className="text-[#145A3B]" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Notifikasi Email</p>
                    <p className="text-xs text-gray-400">Update pesanan dan promo via email</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications((p) => !p)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${notifications ? "bg-[#145A3B]" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifications ? "translate-x-7" : "translate-x-1"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <FaLanguage className="text-[#145A3B] text-lg" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Bahasa</p>
                    <p className="text-xs text-gray-400">Bahasa tampilan antarmuka</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-300 transition"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-8">
              <h3 className="text-lg font-extrabold text-red-600 mb-4">Zona Bahaya</h3>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-6 py-3 rounded-2xl text-sm font-bold transition"
              >
                <FaSignOutAlt /> Keluar dari Akun
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
