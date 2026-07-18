"use client";

import Link from "next/link";
import {
  Notification,
  markAsRead,
  deleteNotification,
  getReferenceUrl,
  getTypeIcon,
} from "../../../services/notificationService";
import { FaTrash } from "react-icons/fa";

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
      className={`group flex gap-4 px-6 py-4 hover:bg-gray-50 transition border-b border-gray-50 last:border-b-0 ${
        !n.isRead ? "bg-emerald-50/20" : ""
      }`}
    >
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
          !n.isRead ? "bg-emerald-100" : "bg-gray-100"
        }`}
      >
        {getTypeIcon(n.type)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p
            className={`text-sm leading-tight ${
              !n.isRead ? "font-bold text-gray-900" : "font-semibold text-gray-600"
            }`}
          >
            {n.title}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {!n.isRead && (
              <span className="w-2 h-2 rounded-full bg-[#145A3B]" />
            )}
            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.message}</p>
        <p className="text-[10px] text-gray-400 mt-1.5 font-semibold">{timeAgo(n.createdAt)}</p>
      </div>
    </Link>
  );
}
