"use client";

import { useState, useEffect } from "react";
import { User, UserRole } from "../../../services/userService";
import { getRoles, Role } from "../../../services/roleService";
import { FaTimes, FaSave, FaUserShield } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  user: User | null;
  onSave: (role: UserRole) => void;
  onCancel: () => void;
}

export default function AssignRoleModal({ isOpen, user, onSave, onCancel }: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (isOpen) {
      setRoles(getRoles());
      if (user) {
        setSelectedRole(user.role);
      }
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FaUserShield className="text-purple-600 text-lg" />
            <h3 className="text-lg font-extrabold text-gray-800">Assign Role Pengguna</h3>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition text-gray-500"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-sm font-black text-purple-700 shrink-0">
              {user.name.split(" ").map((w) => w[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div>
              <p className="font-extrabold text-gray-800 text-sm">{user.name}</p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{user.email}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Pilih Role Baru</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 appearance-none transition"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-bold transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#145A3B] hover:bg-[#0F472E] text-white py-3 rounded-2xl text-sm font-bold shadow-sm transition flex items-center justify-center gap-2"
            >
              <FaSave />
              Simpan Role Baru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
