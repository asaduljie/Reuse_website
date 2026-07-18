"use client";

import { Role } from "../../../services/roleService";
import { FaEdit, FaCopy, FaTrash, FaKey, FaClock } from "react-icons/fa";

interface Props {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDuplicate: (role: Role) => void;
  onDelete: (roleId: string) => void;
  onManagePermissions: (role: Role) => void;
}

export default function RoleTable({ roles, onEdit, onDuplicate, onDelete, onManagePermissions }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Role Info</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">Tipe</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-700">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4">
                  <div className="font-extrabold text-gray-800">{role.name}</div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">{role.id}</div>
                </td>
                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{role.description}</td>
                <td className="px-6 py-4">
                  {role.isSystem ? (
                    <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                      System
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full border border-blue-100">
                      Custom
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex gap-1.5 justify-end">
                    <button
                      onClick={() => onManagePermissions(role)}
                      title="Atur Hak Akses / Permissions"
                      className="p-2.5 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition border border-purple-100"
                    >
                      <FaKey className="text-xs" />
                    </button>
                    
                    <button
                      onClick={() => onDuplicate(role)}
                      title="Duplikasi Role"
                      className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition border border-gray-200"
                    >
                      <FaCopy className="text-xs" />
                    </button>
                    
                    <button
                      onClick={() => onEdit(role)}
                      title="Edit Detail Role"
                      className="p-2.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition border border-amber-100"
                    >
                      <FaEdit className="text-xs" />
                    </button>

                    {!role.isSystem && (
                      <button
                        onClick={() => onDelete(role.id)}
                        title="Hapus Role"
                        className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition border border-red-100"
                      >
                        <FaTrash className="text-xs" />
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
  );
}
