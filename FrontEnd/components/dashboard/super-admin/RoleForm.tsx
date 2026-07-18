"use client";

import { useState, useEffect } from "react";
import { Role } from "../../../services/roleService";
import { FaTimes, FaSave, FaHeading, FaFileAlt } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  role: Role | null; // Null means create mode
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
}

export default function RoleForm({ isOpen, role, onSave, onCancel }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [role, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name, description);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100">
          <h3 className="text-lg font-extrabold text-gray-800">
            {role ? "Edit Role Detail" : "Tambah Role Baru"}
          </h3>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition text-gray-500"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Nama Role</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                <FaHeading />
              </span>
              <input
                type="text"
                required
                disabled={!!role && role.isSystem}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Supervisor"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Deskripsi</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-400 text-sm">
                <FaFileAlt />
              </span>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Penjelasan ringkas tugas dan wewenang role..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition resize-none"
              />
            </div>
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
              Simpan Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
