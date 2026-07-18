"use client";

import { RESOURCES, ACTIONS, PermissionMatrix, Resource, Action } from "../../../services/permissionService";
import { FaKey, FaCheckDouble, FaTrashAlt } from "react-icons/fa";

interface Props {
  roleId: string;
  matrix: PermissionMatrix;
  onBulkUpdate: (updatedPerms: Record<string, Record<string, boolean>>) => void;
}

export default function PermissionForm({ roleId, matrix, onBulkUpdate }: Props) {
  const rolePerms = matrix[roleId] || {};

  const handleSelectAll = () => {
    const next: Record<string, Record<string, boolean>> = {};
    RESOURCES.forEach((res) => {
      next[res] = {};
      ACTIONS.forEach((act) => {
        next[res][act] = true;
      });
    });
    onBulkUpdate(next);
  };

  const handleClearAll = () => {
    const next: Record<string, Record<string, boolean>> = {};
    RESOURCES.forEach((res) => {
      next[res] = {};
      ACTIONS.forEach((act) => {
        next[res][act] = false;
      });
    });
    onBulkUpdate(next);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100">
          <FaKey />
        </div>
        <div>
          <h4 className="font-extrabold text-gray-800 text-sm">Operasi Massal Hak Akses</h4>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Konfigurasi cepat untuk semua hak akses sekaligus.</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSelectAll}
          className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-bold transition"
        >
          <FaCheckDouble /> Centang Semua
        </button>
        <button
          onClick={handleClearAll}
          className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-100 px-4 py-2 rounded-xl text-xs font-bold transition"
        >
          <FaTrashAlt /> Hapus Semua Centang
        </button>
      </div>
    </div>
  );
}
