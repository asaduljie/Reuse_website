"use client";

import { ActivityType } from "../../../services/activityService";
import { FaSearch, FaFilter, FaCalendar } from "react-icons/fa";

const ROLES = ["ALL", "super_admin", "admin", "seller", "customer"];
const ACTIONS: { value: string; label: string }[] = [
  { value: "ALL", label: "Semua Aksi" },
  { value: "LOGIN", label: "Login" },
  { value: "LOGOUT", label: "Logout" },
  { value: "CREATE_PRODUCT", label: "Tambah Produk" },
  { value: "UPDATE_PRODUCT", label: "Edit Produk" },
  { value: "DELETE_PRODUCT", label: "Hapus Produk" },
  { value: "CREATE_ORDER", label: "Buat Pesanan" },
  { value: "UPDATE_ORDER", label: "Update Pesanan" },
  { value: "VERIFY_SELLER", label: "Verifikasi Seller" },
  { value: "DELETE_USER", label: "Hapus User" },
  { value: "LOGIN_FAILED", label: "Login Gagal" },
];

interface ActivityFilterProps {
  search: string;
  setSearch: (v: string) => void;
  roleFilter: string;
  setRoleFilter: (v: string) => void;
  actionFilter: string;
  setActionFilter: (v: string) => void;
  dateFrom: string;
  setDateFrom: (v: string) => void;
  dateTo: string;
  setDateTo: (v: string) => void;
}

export default function ActivityFilter({
  search, setSearch,
  roleFilter, setRoleFilter,
  actionFilter, setActionFilter,
  dateFrom, setDateFrom,
  dateTo, setDateTo,
}: ActivityFilterProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm mb-8 space-y-4">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative md:col-span-2">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Cari nama user atau deskripsi aksi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-emerald-200 font-medium text-gray-800"
          />
        </div>

        {/* Role */}
        <div className="relative">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold text-gray-700 cursor-pointer appearance-none focus:outline-none"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>{r === "ALL" ? "Semua Role" : r.replace("_", " ").toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Action */}
        <div className="relative">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold text-gray-700 cursor-pointer appearance-none focus:outline-none"
          >
            {ACTIONS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Date range */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-200"
          />
        </div>
        <div className="relative">
          <FaCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-200"
          />
        </div>
      </div>
    </div>
  );
}
