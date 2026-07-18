"use client";

import { FaBell } from "react-icons/fa";

interface NotificationBellButtonProps {
  unreadCount: number;
  onClick: () => void;
}

export default function NotificationBellButton({
  unreadCount,
  onClick,
}: NotificationBellButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-12 h-12 rounded-full bg-[#F7F8FA] flex items-center justify-center hover:bg-emerald-50 transition cursor-pointer"
      aria-label="Notifikasi"
    >
      <FaBell className="text-gray-600 text-lg" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}
