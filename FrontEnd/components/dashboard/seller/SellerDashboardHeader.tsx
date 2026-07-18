"use client";

import { FaCheckCircle, FaClock, FaStar, FaUsers } from "react-icons/fa";

interface Props {
  storeName: string;
  verified: boolean;
  rating: number;
  followers: number;
}

export default function SellerDashboardHeader({ storeName, verified, rating, followers }: Props) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Selamat Pagi" : hour < 17 ? "Selamat Siang" : "Selamat Malam";

  return (
    <div className="bg-gradient-to-r from-[#145A3B] to-[#1e7a50] rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 right-24 w-32 h-32 rounded-full bg-white/5" />

      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-emerald-200 text-sm font-semibold">{greeting}</p>
          <h1 className="text-3xl font-black mt-1">{storeName}</h1>
          <div className="flex items-center gap-3 mt-2">
            {verified ? (
              <span className="inline-flex items-center gap-1.5 text-xs bg-white/20 px-3 py-1.5 rounded-full font-bold">
                <FaCheckCircle className="text-emerald-200" /> Toko Terverifikasi
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-400/30 text-amber-200 px-3 py-1.5 rounded-full font-bold">
                <FaClock /> Menunggu Verifikasi
              </span>
            )}
            <span className="flex items-center gap-1 text-emerald-200 text-xs font-semibold">
              <FaStar className="text-amber-300 text-[10px]" /> {rating.toFixed(1)} Rating
            </span>
            <span className="flex items-center gap-1 text-emerald-200 text-xs font-semibold">
              <FaUsers className="text-emerald-200 text-xs" /> {followers} Pengikut
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-emerald-200 text-xs font-semibold">
            {now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}
