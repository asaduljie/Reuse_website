"use client";

import Link from "next/link";
import { FaPlusCircle, FaClipboardList, FaStore, FaUserEdit } from "react-icons/fa";

export default function SellerQuickAction() {
  const actions = [
    { label: "Tambah Produk", href: "/dashboard/seller/add-product", icon: FaPlusCircle, color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" },
    { label: "Kelola Order", href: "/dashboard/seller/orders", icon: FaClipboardList, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
    { label: "Lihat Toko", href: "/store/3", icon: FaStore, color: "bg-violet-100 text-violet-700 hover:bg-violet-200" },
    { label: "Edit Profil", href: "/dashboard/seller/profile", icon: FaUserEdit, color: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-extrabold text-gray-800 mb-5">⚡ Aksi Cepat</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.label}
              href={a.href}
              className={`flex flex-col items-center gap-2 py-5 rounded-2xl text-xs font-bold transition ${a.color}`}
            >
              <Icon className="text-2xl" />
              {a.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
