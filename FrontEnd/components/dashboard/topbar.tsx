"use client";

import { useEffect, useRef, useState } from "react";
import NotificationBellButton from "./notifications/NotificationBell";
import NotificationDropdown from "./notifications/NotificationDropdown";
import { getNotifications, getUnreadCount, Notification } from "../../services/notificationService";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

interface TopbarProps {
  title: string;
  userName: string;
  role: string;
}

export default function Topbar({ title, userName, role }: TopbarProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const refresh = () => {
    const all = getNotifications();
    setNotifications(all);
    setUnreadCount(getUnreadCount());
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 15000);
    return () => clearInterval(interval);
  }, []);

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
    <header className="bg-white rounded-[30px] shadow-sm px-8 py-5 flex items-center justify-between">
      {/* LEFT */}
      <div>
        <p className="text-gray-500 text-sm">Dashboard</p>
        <h1 className="text-3xl font-bold mt-1">{title}</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden lg:flex items-center gap-3 bg-[#F7F8FA] rounded-full px-5 py-3 w-80">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

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
        <div className="flex items-center gap-4">
          <div className="text-right">
            <h3 className="font-semibold text-sm">{userName}</h3>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
          <img
            src="/images/avatar.png"
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#145A3B]"
          />
        </div>
      </div>
    </header>
  );
}