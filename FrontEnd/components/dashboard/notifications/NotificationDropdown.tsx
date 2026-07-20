"use client";

import Link from "next/link";
import {
  Notification,
  markAsRead,
  markAllAsRead,
  getReferenceUrl,
} from "../../../services/notificationService";
import { getNotificationIcon } from "./NotificationItem";
import { FaBell } from "react-icons/fa";

interface NotificationDropdownProps {
  notifications: Notification[];
  onClose: () => void;
  onRefresh: () => void;
}

const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  const days = Math.floor(hrs / 24);
  return `${days} hari lalu`;
};

export default function NotificationDropdown({
  notifications,
  onClose,
  onRefresh,
}: NotificationDropdownProps) {
  const preview = notifications.slice(0, 6);

  const handleClick = (n: Notification) => {
    markAsRead(n.id);
    onRefresh();
    onClose();
  };

  const handleMarkAll = () => {
    markAllAsRead();
    onRefresh();
  };

  return (
    <div className="absolute right-0 mt-3 w-96 bg-white rounded-3xl shadow-2xl border border-gray-100/80 py-4 z-50 overflow-hidden transform origin-top-right transition-all duration-300 scale-100">
      {/* Header */}
      <div className="px-5 pb-3 border-b border-gray-100 flex justify-between items-center">
        <span className="font-extrabold text-gray-800 text-sm">Notifikasi</span>
        <div className="flex items-center gap-3">
          {notifications.some((n) => !n.isRead) && (
            <button
              onClick={handleMarkAll}
              className="text-xs text-[#145A3B] hover:text-[#0F472E] font-extrabold transition cursor-pointer"
            >
              Tandai semua dibaca
            </button>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
        {preview.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-gray-400 gap-2">
            <FaBell className="text-2xl text-gray-300" />
            <span className="text-xs font-bold">Tidak ada notifikasi baru</span>
          </div>
        ) : (
          preview.map((n) => (
            <Link
              key={n.id}
              href={getReferenceUrl(n)}
              onClick={() => handleClick(n)}
              className={`flex gap-3 px-5 py-3.5 hover:bg-gray-50 transition-all duration-300 ${
                !n.isRead ? "bg-emerald-50/20" : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${
                  !n.isRead 
                    ? "bg-emerald-50 border-emerald-100/50 shadow-sm" 
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                {getNotificationIcon(n.type, n.isRead)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className={`text-sm truncate leading-snug transition-colors duration-300 ${!n.isRead ? "font-extrabold text-gray-800" : "font-semibold text-gray-600"}`}>
                    {n.title}
                  </p>
                  {!n.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#145A3B] shrink-0 mt-1.5 animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{n.message}</p>
                <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-wider">{timeAgo(n.createdAt)}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pt-3 border-t border-gray-100 text-center">
        <Link
          href="/dashboard/notifications"
          onClick={onClose}
          className="text-xs text-[#145A3B] hover:text-[#0F472E] font-extrabold transition"
        >
          Lihat Semua Notifikasi →
        </Link>
      </div>
    </div>
  );
}
