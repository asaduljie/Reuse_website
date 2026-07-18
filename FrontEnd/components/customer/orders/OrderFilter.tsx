"use client";

import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

interface OrderFilterProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export default function OrderFilter({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: OrderFilterProps) {
  
  const statuses = [
    { value: "ALL", label: "Semua Status" },
    { value: "Pending", label: "Menunggu Konfirmasi" },
    { value: "Seller Confirmed", label: "Telah Dikonfirmasi" },
    { value: "Packing", label: "Sedang Dikemas" },
    { value: "Ready to Pickup", label: "Siap Diambil" },
    { value: "Completed", label: "Selesai" },
    { value: "Cancelled", label: "Dibatalkan" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 shadow-sm mb-8">
      <div className="grid md:grid-cols-3 gap-4">
        
        {/* Search */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
            <FaSearch className="text-sm" />
          </span>
          <input
            type="text"
            placeholder="Cari Invoice atau nama produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-emerald-200 transition font-medium text-gray-800"
          />
        </div>

        {/* Filter Status */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
            <FaFilter className="text-xs" />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-emerald-200 transition font-bold text-gray-700 cursor-pointer appearance-none"
          >
            {statuses.map((st) => (
              <option key={st.value} value={st.value} className="font-semibold text-gray-800">
                {st.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 text-xs">
            ▼
          </div>
        </div>

        {/* Sorting */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
            <FaSortAmountDown className="text-xs" />
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-emerald-200 transition font-bold text-gray-700 cursor-pointer appearance-none"
          >
            <option value="NEWEST" className="font-semibold text-gray-800">Terbaru (Newest)</option>
            <option value="OLDEST" className="font-semibold text-gray-800">Terlama (Oldest)</option>
            <option value="HIGHEST_TOTAL" className="font-semibold text-gray-800">Total Tertinggi (Highest Total)</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 text-xs">
            ▼
          </div>
        </div>

      </div>
    </div>
  );
}
