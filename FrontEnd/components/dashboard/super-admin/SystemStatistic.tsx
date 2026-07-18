"use client";

import { FaUsers, FaUserShield, FaStore, FaShieldAlt, FaKey, FaChartPie } from "react-icons/fa";

interface Props {
  usersCount: number;
  adminsCount: number;
  sellersCount: number;
  customersCount: number;
  rolesCount: number;
  permissionsCount: number;
}

export default function SystemStatistic({
  usersCount,
  adminsCount,
  sellersCount,
  customersCount,
  rolesCount,
  permissionsCount,
}: Props) {
  const stats = [
    { label: "Total Pengguna", value: usersCount, icon: FaUsers, color: "bg-blue-50 text-blue-600", desc: "User terdaftar" },
    { label: "Total Admin", value: adminsCount, icon: FaUserShield, color: "bg-purple-50 text-purple-600", desc: "Manajemen sistem" },
    { label: "Total Toko / Seller", value: sellersCount, icon: FaStore, color: "bg-emerald-50 text-[#145A3B]", desc: "Mitra pedagang" },
    { label: "Total Customer", value: customersCount, icon: FaUsers, color: "bg-cyan-50 text-cyan-600", desc: "Pembeli aktif" },
    { label: "Total Role", value: rolesCount, icon: FaShieldAlt, color: "bg-amber-50 text-amber-600", desc: "Wewenang akses" },
    { label: "Izin Matriks Aktif", value: permissionsCount, icon: FaKey, color: "bg-red-50 text-red-600", desc: "Checkbox tercentang" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 ${item.color}`}>
              <Icon />
            </div>
            <p className="text-3xl font-black text-gray-800 leading-tight">{item.value}</p>
            <p className="text-xs font-bold text-gray-500 mt-2">{item.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-semibold">{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
