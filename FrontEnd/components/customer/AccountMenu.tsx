"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser, FaClipboardList, FaHeart, FaMapMarkerAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../utils/auth";
import { useRouter } from "next/navigation";

const MENU = [
  { label: "Profil Saya",   href: "/profile",            icon: FaUser },
  { label: "Pesanan Saya",  href: "/profile/orders",     icon: FaClipboardList },
  { label: "Wishlist",      href: "/profile/wishlist",   icon: FaHeart },
  { label: "Alamat",        href: "/profile/addresses",  icon: FaMapMarkerAlt },
  { label: "Pengaturan",    href: "/profile/settings",   icon: FaCog },
];

export default function AccountMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Akun Saya</p>
      </div>
      <nav className="py-2">
        {MENU.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/profile"
            ? pathname === "/profile"
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition ${
                isActive
                  ? "text-[#145A3B] bg-emerald-50 border-r-2 border-[#145A3B]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon className="text-base shrink-0" />
              {item.label}
            </Link>
          );
        })}
        
        <div className="border-t border-gray-100 my-2" />

        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition"
        >
          <FaHome className="text-base shrink-0 text-[#145A3B]" />
          Kembali ke Homepage
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition cursor-pointer"
        >
          <FaSignOutAlt className="text-base shrink-0" />
          Keluar
        </button>
      </nav>
    </div>
  );
}
