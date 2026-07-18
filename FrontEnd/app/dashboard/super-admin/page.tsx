"use client";

import { useEffect, useState } from "react";
import SuperAdminHeader from "../../../components/dashboard/super-admin/SuperAdminHeader";
import SystemStatistic from "../../../components/dashboard/super-admin/SystemStatistic";
import SystemHealthCard from "../../../components/dashboard/super-admin/SystemHealthCard";
import { getUsers } from "../../../services/userService";
import { getRoles } from "../../../services/roleService";
import { getPermissions } from "../../../services/permissionService";
import { getLogs } from "../../../services/activityService";
import Link from "next/link";
import { FaUserShield, FaKey, FaHistory, FaArrowRight, FaCog } from "react-icons/fa";

export default function SuperAdminPage() {
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    sellers: 0,
    customers: 0,
    roles: 0,
    permissions: 0,
  });

  useEffect(() => {
    const users = getUsers();
    const roles = getRoles();
    const matrix = getPermissions();

    let countPerms = 0;
    Object.values(matrix).forEach((resMap) => {
      Object.values(resMap).forEach((actMap) => {
        Object.values(actMap).forEach((val) => {
          if (val) countPerms++;
        });
      });
    });

    setStats({
      users: users.length,
      admins: users.filter((u) => u.role === "admin" || u.role === "super_admin").length,
      sellers: users.filter((u) => u.role === "seller").length,
      customers: users.filter((u) => u.role === "customer").length,
      roles: roles.length,
      permissions: countPerms,
    });
  }, []);

  const navigations = [
    { label: "Manajemen User & Assign Role", href: "/dashboard/super-admin/users", desc: "Kelola akun pengguna, ganti role default, ban/block akun melanggar.", icon: FaUserShield, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "Manajemen Role & Matriks Izin", href: "/dashboard/super-admin/roles", desc: "Tambah, edit, hapus, dan duplikasi role kustom serta edit izin resource.", icon: FaKey, color: "bg-purple-50 text-purple-600 border-purple-100" },
    { label: "Audit Aktivitas (Audit Log)", href: "/dashboard/super-admin/activity", desc: "Audit log rekaman jejak aksi login, perubahan data dan aktivitas krusial.", icon: FaHistory, color: "bg-emerald-50 text-[#145A3B] border-emerald-100" },
    { label: "Pengaturan Sistem Utama", href: "/dashboard/admin/settings", desc: "Akses panel konfigurasi WhatsApp, general website dan database.", icon: FaCog, color: "bg-amber-50 text-amber-600 border-amber-100" },
  ];

  return (
    <div className="space-y-8">
      <SuperAdminHeader title="Super Admin Dashboard" />

      {/* Stats Counter */}
      <SystemStatistic
        usersCount={stats.users}
        adminsCount={stats.admins}
        sellersCount={stats.sellers}
        customersCount={stats.customers}
        rolesCount={stats.roles}
        permissionsCount={stats.permissions}
      />

      {/* System Health Status */}
      <SystemHealthCard />

      {/* Navigation shortcuts */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h3 className="font-extrabold text-gray-800 text-lg mb-6">Modul Kontrol Panel</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {navigations.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:shadow-md transition group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${item.color}`}>
                  <Icon />
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-gray-800 group-hover:text-[#145A3B] transition text-sm flex items-center gap-1.5">
                    {item.label}
                    <FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
