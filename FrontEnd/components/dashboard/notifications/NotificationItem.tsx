"use client";

import Link from "next/link";
import {
  Notification,
  markAsRead,
  deleteNotification,
  getReferenceUrl,
} from "../../../services/notificationService";
import {
  FaShoppingCart,
  FaExclamationTriangle,
  FaStore,
  FaUserCheck,
  FaUserPlus,
  FaImage,
  FaCog,
  FaBell,
  FaTrash,
} from "react-icons/fa";

interface NotificationItemProps {
  notification: Notification;
  onRefresh: () => void;
}

const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getNotificationIcon = (type: string, isRead: boolean) => {
  const baseClass = "text-base sm:text-lg";
  switch (type) {
    case "NEW_ORDER":
      return <FaShoppingCart className={`${baseClass} ${isRead ? "text-gray-400" : "text-[#145A3B]"}`} />;
    case "LOW_STOCK":
      return <FaExclamationTriangle className={`${baseClass} ${isRead ? "text-gray-400" : "text-amber-500"}`} />;
    case "NEW_SELLER":
      return <FaStore className={`${baseClass} ${isRead ? "text-gray-400" : "text-blue-500"}`} />;
    case "SELLER_VERIFIED":
      return <FaUserCheck className={`${baseClass} ${isRead ? "text-gray-400" : "text-emerald-500"}`} />;
    case "NEW_USER":
      return <FaUserPlus className={`${baseClass} ${isRead ? "text-gray-400" : "text-teal-500"}`} />;
    case "BANNER_EXPIRED":
      return <FaImage className={`${baseClass} ${isRead ? "text-gray-400" : "text-red-500"}`} />;
    case "SYSTEM":
      return <FaCog className={`${baseClass} ${isRead ? "text-gray-400" : "text-gray-500"}`} />;
    default:
      return <FaBell className={`${baseClass} ${isRead ? "text-gray-400" : "text-[#145A3B]"}`} />;
  }
};

export default function NotificationItem({
  notification: n,
  onRefresh,
}: NotificationItemProps) {
  const handleClick = () => {
    markAsRead(n.id);
    onRefresh();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteNotification(n.id);
    onRefresh();
  };

  return (
    <Link
      href={getReferenceUrl(n)}
      onClick={handleClick}
      className={`group flex gap-4 px-6 py-4 hover:bg-gray-50/80 transition-all duration-300 border-b border-gray-100 last:border-b-0 ${
        !n.isRead ? "bg-emerald-50/20" : ""
      }`}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
          !n.isRead 
            ? "bg-emerald-50 border-emerald-100/50 shadow-sm" 
            : "bg-gray-50 border-gray-100"
        }`}
      >
        {getNotificationIcon(n.type, n.isRead)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p
            className={`text-sm leading-snug transition-colors duration-300 ${
              !n.isRead ? "font-extrabold text-gray-900" : "font-semibold text-gray-600"
            }`}
          >
            {n.title}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {!n.isRead && (
              <span className="w-2 h-2 rounded-full bg-[#145A3B] animate-pulse" />
            )}
            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-gray-400 hover:text-red-500 hover:scale-110 cursor-pointer p-1"
              aria-label="Hapus notifikasi"
            >
              <FaTrash className="text-[10px]" />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.message}</p>
        <p className="text-[9px] text-gray-400 mt-2 font-bold tracking-wide uppercase">{timeAgo(n.createdAt)}</p>
      </div>
    </Link>
  );
}
