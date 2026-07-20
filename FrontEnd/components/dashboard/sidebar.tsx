"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSignOutAlt, FaHome, FaTimes } from "react-icons/fa";

import {
  adminMenus,
  sellerMenus,
  superAdminMenus,
} from "../../utils/dashboardMenu";

import { logout } from "../../utils/auth";
import { getSellerProfiles } from "../../services/sellerService";

interface SidebarProps {
  role: "seller" | "admin" | "super_admin";
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  role,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    onClose?.();
  }, [pathname]);

  let menus = sellerMenus;

  if (role === "admin") {
    menus = adminMenus;
  } else if (role === "super_admin") {
    menus = superAdminMenus;
  }

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const roleLabel = () => {
    switch (role) {
      case "super_admin":
        return "SUPER ADMIN";

      case "admin":
        return "ADMIN";

      default:
        return "SELLER";
    }
  };

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      <aside
        className={`
        w-72
        fixed
        inset-y-0
        left-0
        bg-[#145A3B]
        text-white
        flex
        flex-col
        shadow-2xl
        z-50
        transition-transform
        duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2) !important;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.35) !important;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          }
        `}</style>
        {/* LOGO */}

        <div
          className="
          px-8
          py-8
          border-b
          border-green-700
          flex
          items-center
          justify-between
          "
        >
          <div>
            <h1
              className="
              text-3xl
              font-extrabold
              tracking-wide
              "
            >
              ReUse
            </h1>

            <p
              className="
              mt-1
              text-green-200
              text-xs
              "
            >
              Marketplace Dashboard
            </p>

            <div
              className="
              mt-3
              inline-flex
              items-center
              rounded-full
              bg-green-700
              px-3
              py-1
              text-[10px]
              font-extrabold
              tracking-wider
              "
            >
              {roleLabel()}
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-green-200 hover:text-white p-2 hover:bg-green-700 rounded-xl transition cursor-pointer"
            >
              <FaTimes className="text-xl" />
            </button>
          )}
        </div>

      {/* MENU */}

      <div
        className="
        flex-1
        overflow-y-auto
        custom-scrollbar
        px-5
        py-6
        space-y-2
        "
      >
        {(() => {
          const { can } = require("../../lib/permissions");
          const filteredMenus = menus.filter((menu) => {
            // Check mapping
            if (menu.title === "Dashboard") return can("dashboard.view", role);
            if (menu.title === "Products" || menu.title === "My Products") return can("products.view", role);
            if (menu.title === "Add Product") return can("products.create", role);
            if (menu.title === "Categories") return can("categories.view", role);
            if (menu.title === "Orders") return can("orders.view", role);
            if (menu.title === "Users" || menu.title === "Customers" || menu.title === "Admins") return can("users.view", role);
            if (menu.title === "Seller" || menu.title === "Sellers") return can("sellers.view", role);
            if (menu.title === "Banner") return can("banners.view", role);
            if (menu.title === "Reports" || menu.title === "Analytics") return can("reports.view", role);
            if (menu.title === "Settings") return can("settings.view", role);
            if (menu.title === "System Logs") return role === "super_admin" || role === "admin";
            if (menu.title === "Roles & Perms") return role === "super_admin";
            if (menu.title === "Activity Logs" || menu.title === "Activity Log") return role === "super_admin";
            return true;
          });

          // choose the single best matching menu (longest href match)
          const matched = filteredMenus.filter(
            (m) => pathname === m.href || pathname.startsWith(m.href + "/")
          );

          const activeHref = matched
            .sort((a, b) => b.href.length - a.href.length)
            .map((m) => m.href)[0];

          return filteredMenus.map((menu) => {
            const active = menu.href === activeHref;
            const Icon = menu.icon;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-5
                  py-4
                  transition-all
                  duration-300

                  ${
                    active
                      ? "bg-white text-[#145A3B] shadow-lg"
                      : "hover:bg-green-800"
                  }
                `}
              >
                <Icon className="text-xl" />

                <span className="font-medium flex-1">{menu.title}</span>

                {menu.title === "Seller" && (
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold shadow-sm ${
                      active ? "bg-[#145A3B] text-white" : "bg-white text-[#145A3B]"
                    }`}
                  >
                    {getSellerProfiles().length}
                  </span>
                )}
              </Link>
            );
          });
        })()}
      </div>

      {/* FOOTER */}

      <div
        className="
        border-t
        border-green-700
        p-5
        space-y-2
        "
      >
        <Link
          href="/"
          className="
          w-full
          flex
          items-center
          gap-4
          rounded-2xl
          px-5
          py-4
          transition-all
          duration-300
          hover:bg-green-800
          "
        >
          <FaHome className="text-lg" />

          <span>Back to Homepage</span>
        </Link>

        <button
          onClick={handleLogout}
          className="
          w-full
          flex
          items-center
          gap-4
          rounded-2xl
          px-5
          py-4
          transition-all
          duration-300
          hover:bg-red-500
          "
        >
          <FaSignOutAlt className="text-lg" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}