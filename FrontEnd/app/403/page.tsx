"use client";

import Link from "next/link";
import { FaLock, FaHome, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6">
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl p-10 max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-4xl mx-auto border border-red-100 animate-bounce">
          <FaLock />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900">Akses Ditolak (403)</h1>
          <p className="text-sm text-gray-500 font-semibold leading-relaxed">
            Maaf, akun Anda tidak memiliki hak akses / permission yang cukup untuk melihat halaman ini.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => router.back()}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl text-sm font-bold transition"
          >
            <FaArrowLeft /> Kembali
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white py-3.5 rounded-2xl text-sm font-bold shadow-sm transition"
          >
            <FaHome /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
