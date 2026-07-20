"use client";

import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllAsRead,
  deleteNotification,
  Notification,
} from "../../../services/notificationService";
import NotificationList from "../../../components/dashboard/notifications/NotificationList";
import PaperBagLoader from "../../../components/dashboard/notifications/PaperBagLoader";
import { FaBell, FaCheckDouble, FaTrash, FaInbox, FaEnvelopeOpen, FaArrowLeft } from "react-icons/fa";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const refresh = () => setNotifications(getNotifications());

  useEffect(() => {
    // Simulate a soft load time to show the paper bag loader beautifully
    const timer = setTimeout(() => {
      refresh();
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readCount = totalCount - unreadCount;

  const filtered =
    filter === "UNREAD"
      ? notifications.filter((n) => !n.isRead)
      : filter === "READ"
      ? notifications.filter((n) => n.isRead)
      : notifications;

  const handleMarkAll = () => {
    markAllAsRead();
    refresh();
  };

  const handleDeleteRead = () => {
    notifications
      .filter((n) => n.isRead)
      .forEach((n) => deleteNotification(n.id));
    refresh();
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm transition-all duration-300">
        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-gray-100/50 shadow-2xl">
          <PaperBagLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 -mt-8 sm:-mt-10">
      {/* Premium Header Banner (Mounted all the way to the top of the content area) */}
      <div className="relative overflow-hidden rounded-b-[30px] rounded-t-none bg-gradient-to-r from-[#145A3B] to-[#0A2F1D] text-white p-8 sm:p-10 shadow-xl border border-emerald-800/20">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
          <FaBell className="text-[200px]" />
        </div>
        
        {/* Back Button inside the banner (Aesthetic Red Theme) */}
        <button
          onClick={handleBack}
          className="relative z-20 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-white bg-red-600 hover:bg-red-500 active:scale-95 shadow-md shadow-red-900/30 transition-all duration-300 group cursor-pointer mb-6"
        >
          <FaArrowLeft className="text-[10px] transition-transform group-hover:-translate-x-1" />
          Kembali ke Dashboard
        </button>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase bg-emerald-400/20 text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-400/10">
              Pusat Kendali Sistem
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-4 flex items-center gap-3">
              <FaBell className="text-emerald-400 animate-pulse text-2xl sm:text-3xl" /> Notifikasi
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 font-medium max-w-md leading-relaxed">
              Pantau aktivitas terbaru marketplace, verifikasi toko, dan kelola pembaruan sistem di satu dashboard terpadu.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={handleMarkAll}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-900/30 transition-all duration-300 cursor-pointer"
            >
              <FaCheckDouble className="text-xs" /> Tandai Semua Dibaca
            </button>
            <button
              onClick={handleDeleteRead}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 border border-white/10 cursor-pointer"
            >
              <FaTrash className="text-xs text-red-300" /> Hapus yang Dibaca
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Notif */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md duration-300">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
            <FaBell className="text-lg" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Semua Notifikasi</p>
            <h3 className="text-2xl font-black text-gray-800 mt-1">{totalCount}</h3>
          </div>
        </div>
        
        {/* Belum Dibaca */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md duration-300">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100/50">
            <FaInbox className="text-lg" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Belum Dibaca</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{unreadCount}</h3>
          </div>
        </div>

        {/* Sudah Dibaca */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md duration-300">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/50">
            <FaEnvelopeOpen className="text-lg" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Sudah Dibaca</p>
            <h3 className="text-2xl font-black text-emerald-700 mt-1">{readCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter and Content Card Container */}
      <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Filter Navigation */}
        <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl w-fit border border-gray-100">
          {(["ALL", "UNREAD", "READ"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                filter === f
                  ? "bg-white text-gray-800 shadow-sm border border-gray-100"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {f === "ALL" ? "Semua" : f === "UNREAD" ? "Belum Dibaca" : "Sudah Dibaca"}
              {f === "UNREAD" && unreadCount > 0 && (
                <span className="ml-2 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <NotificationList notifications={filtered} onRefresh={refresh} />
      </div>
    </div>
  );
}
