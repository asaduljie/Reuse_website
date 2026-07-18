"use client";

import { useState, useEffect } from "react";
import { PermissionMatrix, Resource, Action, getPermissions, savePermissions } from "../../../services/permissionService";
import { FaTimes, FaSave } from "react-icons/fa";
import PermissionTable from "./PermissionTable";
import PermissionForm from "./PermissionForm";

interface Props {
  isOpen: boolean;
  roleId: string;
  roleName: string;
  isSystem?: boolean;
  onClose: () => void;
}

export default function AssignPermissionModal({ isOpen, roleId, roleName, isSystem = false, onClose }: Props) {
  const [matrix, setMatrix] = useState<PermissionMatrix>({});

  useEffect(() => {
    if (isOpen) {
      setMatrix(getPermissions());
    }
  }, [isOpen, roleId]);

  if (!isOpen) return null;

  const handleToggle = (resource: Resource, action: Action) => {
    setMatrix((prev) => {
      const next = { ...prev };
      if (!next[roleId]) next[roleId] = {};
      if (!next[roleId][resource]) next[roleId][resource] = {};
      
      next[roleId][resource][action] = !next[roleId][resource][action];
      return next;
    });
  };

  const handleBulkUpdate = (updatedPerms: Record<string, Record<string, boolean>>) => {
    setMatrix((prev) => ({
      ...prev,
      [roleId]: updatedPerms,
    }));
  };

  const handleSave = () => {
    savePermissions(matrix);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#F7F8FA] rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100">
          <div>
            <h3 className="text-lg font-extrabold text-gray-800">
              Hak Akses Role: <span className="text-[#145A3B]">{roleName}</span>
            </h3>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">Konfigurasi resource-action matriks izin role.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition text-gray-500"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
          <PermissionForm roleId={roleId} matrix={matrix} onBulkUpdate={handleBulkUpdate} />
          
          <PermissionTable
            roleId={roleId}
            roleName={roleName}
            matrix={matrix}
            onToggle={handleToggle}
            isSystem={isSystem}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl text-sm font-bold transition"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="bg-[#145A3B] hover:bg-[#0F472E] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-sm transition flex items-center gap-2"
          >
            <FaSave /> Simpan Perubahan Matriks
          </button>
        </div>
      </div>
    </div>
  );
}
