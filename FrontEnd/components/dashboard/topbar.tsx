"use client";

import { useEffect, useRef, useState } from "react";
import NotificationBellButton from "./notifications/NotificationBell";
import NotificationDropdown from "./notifications/NotificationDropdown";
import { getNotifications, getUnreadCount, Notification } from "../../services/notificationService";
import {
  getLaptopNotificationPermission,
  requestLaptopNotificationPermission,
} from "../../services/laptopNotificationService";
import { FaSearch, FaBars, FaLaptop, FaBell } from "react-icons/fa";

interface TopbarProps {
  title: string;
  userName: string;
  role: string;
  onToggleSidebar?: () => void;
}

export default function Topbar({ title, userName, role, onToggleSidebar }: TopbarProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [laptopPerm, setLaptopPerm] = useState<string>("default");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const refresh = () => {
    const all = getNotifications();
    setNotifications(all);
    setUnreadCount(getUnreadCount());
  };

  useEffect(() => {
    refresh();
    setLaptopPerm(getLaptopNotificationPermission());
    const interval = setInterval(refresh, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleLaptopNotif = async () => {
    await requestLaptopNotificationPermission();
    setLaptopPerm(getLaptopNotificationPermission());
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white rounded-[20px] sm:rounded-[30px] shadow-sm px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-500 hover:text-[#145A3B] p-2 hover:bg-gray-100 rounded-xl transition cursor-pointer"
          >
            <FaBars className="text-lg sm:text-xl" />
          </button>
        )}
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Dashboard</p>
          <h1 className="text-lg sm:text-2xl font-black text-gray-800 tracking-tight mt-0.5">{title}</h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Search */}
        <div className="hidden lg:flex items-center gap-3 bg-[#F7F8FA] rounded-full px-5 py-3 w-80">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="bg-transparent outline-none w-full text-sm font-semibold"
          />
        </div>

        {/* Laptop Desktop Notification Toggle */}
        <button
          onClick={handleToggleLaptopNotif}
          title={laptopPerm === "granted" ? "Notifikasi Laptop Aktif" : "Klik untuk mengaktifkan notifikasi laptop real-time"}
          className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-extrabold transition cursor-pointer border shadow-xs ${
            laptopPerm === "granted"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
              : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 animate-pulse"
          }`}
        >
          <FaLaptop className={laptopPerm === "granted" ? "text-emerald-600" : "text-amber-600"} />
          <span>{laptopPerm === "granted" ? "Notif Laptop: Aktif" : "Aktifkan Notif Laptop"}</span>
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <NotificationBellButton
            unreadCount={unreadCount}
            onClick={() => setDropdownOpen((prev) => !prev)}
          />
          {dropdownOpen && (
            <NotificationDropdown
              notifications={notifications}
              onClose={() => setDropdownOpen(false)}
              onRefresh={refresh}
            />
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <h3 className="font-extrabold text-sm text-gray-800 leading-tight">{userName}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{role}</p>
          </div>
          <img
            src="/images/avatar.png"
            alt="Avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#145A3B] shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}