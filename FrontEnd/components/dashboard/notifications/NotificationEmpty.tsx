"use client";

import { FaBellSlash } from "react-icons/fa";

export default function NotificationEmpty() {
  return (
    <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-16 text-center max-w-xl mx-auto my-8">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 border border-gray-100">
        <FaBellSlash className="text-3xl text-gray-300" />
      </div>
      <h3 className="text-xl font-black text-gray-900 tracking-tight">Semua Bersih!</h3>
      <p className="text-gray-500 mt-2.5 text-sm font-semibold max-w-xs mx-auto leading-relaxed">
        Tidak ada notifikasi yang tersisa. Anda sudah membaca dan membersihkan semuanya.
      </p>
    </div>
  );
}
