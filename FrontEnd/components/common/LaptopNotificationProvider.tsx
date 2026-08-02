"use client";

import { useEffect, useState } from "react";
import {
  getLaptopNotificationPermission,
  requestLaptopNotificationPermission,
  startRealtimeActivityListener,
  LaptopNotificationPermission,
} from "../../services/laptopNotificationService";
import { FaBell, FaCheckCircle, FaLaptop } from "react-icons/fa";

export default function LaptopNotificationProvider() {
  const [permission, setPermission] = useState<LaptopNotificationPermission>("default");
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    setPermission(getLaptopNotificationPermission());
    startRealtimeActivityListener();
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestLaptopNotificationPermission();
    setPermission(getLaptopNotificationPermission());
    if (granted) {
      setBannerDismissed(true);
    }
  };

  if (permission === "granted" || bannerDismissed) {
    return null; // Permission already granted or user dismissed top banner
  }

  return (
    <div className="bg-emerald-900 text-white px-6 py-3 shadow-md flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold transition-all animate-fade-in border-b border-emerald-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-emerald-200 shrink-0">
          <FaLaptop className="text-base animate-pulse" />
        </div>
        <div>
          <span className="font-bold text-emerald-200">Notifikasi Real-time Laptop:</span> Dapatkan pemberitahuan otomatis di layar laptop Anda saat ada pesanan, seller baru, atau transaksi masuk.
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleEnableNotifications}
          className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 px-4 py-1.5 rounded-full font-black text-xs transition cursor-pointer shadow-sm flex items-center gap-1.5"
        >
          <FaBell />
          <span>Aktifkan Notif Laptop</span>
        </button>
        <button
          onClick={() => setBannerDismissed(true)}
          className="text-emerald-300 hover:text-white text-xs px-2 py-1 transition cursor-pointer"
        >
          Nanti
        </button>
      </div>
    </div>
  );
}
