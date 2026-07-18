"use client";

import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllAsRead,
  deleteNotification,
  Notification,
} from "../../../services/notificationService";
import NotificationList from "../../../components/dashboard/notifications/NotificationList";
import { FaBell, FaCheckDouble, FaTrash } from "react-icons/fa";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");

  const refresh = () => setNotifications(getNotifications());

  useEffect(() => {
    refresh();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">
            Pusat Notifikasi
          </p>
          <h1 className="text-4xl font-black text-gray-900 mt-1.5 flex items-center gap-3">
            <FaBell className="text-[#145A3B]" /> Notifikasi
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1 font-semibold">
              {unreadCount} notifikasi belum dibaca
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleMarkAll}
            className="inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-sm transition"
          >
            <FaCheckDouble className="text-xs" /> Tandai Semua Dibaca
          </button>
          <button
            onClick={handleDeleteRead}
            className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3 rounded-2xl text-sm font-bold transition border border-red-100"
          >
            <FaTrash className="text-xs" /> Hapus yang Sudah Dibaca
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["ALL", "UNREAD", "READ"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition ${
              filter === f
                ? "bg-[#145A3B] text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-100 hover:border-emerald-100"
            }`}
          >
            {f === "ALL" ? "Semua" : f === "UNREAD" ? "Belum Dibaca" : "Sudah Dibaca"}
            {f === "UNREAD" && unreadCount > 0 && (
              <span className="ml-2 bg-white/30 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification grouped list */}
      <NotificationList notifications={filtered} onRefresh={refresh} />
    </div>
  );
}
