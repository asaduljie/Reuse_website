"use client";

import { useEffect, useState } from "react";
import SuperAdminHeader from "../../../../components/dashboard/super-admin/SuperAdminHeader";
import { getUsers, updateUser, User, UserRole } from "../../../../services/userService";
import { getRoles } from "../../../../services/roleService";
import AssignRoleModal from "../../../../components/dashboard/super-admin/AssignRoleModal";
import ConfirmDialog from "../../../../components/dashboard/common/ConfirmDialog";
import Toast, { useToast } from "../../../../components/dashboard/common/Toast";
import { FaSearch, FaUserShield, FaUserEdit, FaTrash, FaCheck, FaBan } from "react-icons/fa";

export default function SuperAdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { toasts, show, dismiss } = useToast();
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Modals
  const [assignUser, setAssignUser] = useState<User | null>(null);
  const [statusUser, setStatusUser] = useState<User | null>(null);

  const loadData = () => {
    setUsers(getUsers());
    setRoles(getRoles());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssignRole = (newRole: UserRole) => {
    if (!assignUser) return;
    updateUser(assignUser.id, { role: newRole });
    setAssignUser(null);
    loadData();
    show("Role pengguna berhasil diperbarui!", "success");
  };

  const handleToggleStatus = () => {
    if (!statusUser) return;
    const nextStatus = statusUser.status === "active" ? "blocked" : "active";
    updateUser(statusUser.id, { status: nextStatus });
    setStatusUser(null);
    loadData();
    show(`Status pengguna berhasil diubah menjadi ${nextStatus}!`, "success");
  };

  // Search, filter, sorting logic
  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchRole = filterRole === "all" || u.role === filterRole;
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="space-y-8">
      <SuperAdminHeader
        title="Manajemen Pengguna"
        breadcrumbs={[{ label: "Users" }]}
      />

      {/* Toolbar filters */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[280px] relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari user berdasarkan nama, email, atau HP..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-300 shadow-sm transition"
          >
            <option value="all">Semua Role</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-300 shadow-sm transition"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="blocked">Ditelantarkan / Blocked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Nama & Kontak</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Role Terdaftar</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-700">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 shrink-0">
                      {user.name.split(" ").map((w) => w[0]).join("").slice(0,2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">{user.email} · {user.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1 rounded-full capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      user.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-red-50 text-red-700 border-red-100"
                    }`}>
                      {user.status === "active" ? "Aktif" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => setAssignUser(user)}
                        className="inline-flex items-center gap-1 bg-white border border-gray-200 hover:border-purple-200 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition"
                      >
                        <FaUserEdit className="text-purple-600" /> Ubah Role
                      </button>
                      
                      {user.role !== "super_admin" && (
                        <button
                          onClick={() => setStatusUser(user)}
                          className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                            user.status === "active"
                              ? "bg-red-50 border-red-100 text-red-600 hover:bg-red-100"
                              : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100"
                          }`}
                        >
                          {user.status === "active" ? (
                            <>
                              <FaBan /> Block
                            </>
                          ) : (
                            <>
                              <FaCheck /> Unblock
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Assignment Modal */}
      <AssignRoleModal
        isOpen={assignUser !== null}
        user={assignUser}
        onSave={handleAssignRole}
        onCancel={() => setAssignUser(null)}
      />

      {/* Status Confirm Dialog */}
      <ConfirmDialog
        isOpen={statusUser !== null}
        title={statusUser?.status === "active" ? "Kunci Akun Pengguna?" : "Aktifkan Akun Pengguna?"}
        message={`Apakah Anda yakin ingin ${statusUser?.status === "active" ? "memblokir" : "mengaktifkan kembali"} akun ${statusUser?.name}?`}
        onConfirm={handleToggleStatus}
        onCancel={() => setStatusUser(null)}
      />

      {/* Toast Notification */}
      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
