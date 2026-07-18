"use client";

import { FaSave, FaUndo, FaDownload, FaUpload } from "react-icons/fa";

interface SettingsHeaderProps {
  hasChanges: boolean;
  onSave: () => void;
  onReset: () => void;
  onExport: () => void;
  onImport: () => void;
  savedMessage: string | null;
}

export default function SettingsHeader({
  hasChanges, onSave, onReset, onExport, onImport, savedMessage,
}: SettingsHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Admin</p>
        <h1 className="text-4xl font-black text-gray-900 mt-1">System Settings</h1>
        <p className="text-sm text-gray-500 mt-1 font-semibold">
          Konfigurasi marketplace ReUse — tersimpan otomatis ke localStorage, siap dipindah ke database Laravel.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {savedMessage && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-2 rounded-xl animate-pulse">
            ✓ {savedMessage}
          </span>
        )}
        {hasChanges && (
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-2 rounded-xl">
            ⚠ Ada perubahan yang belum disimpan
          </span>
        )}
        <button
          onClick={onImport}
          className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-200 text-gray-700 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition"
        >
          <FaUpload className="text-blue-500" /> Import
        </button>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-emerald-200 text-gray-700 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition"
        >
          <FaDownload className="text-emerald-600" /> Export
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 bg-white border border-red-100 hover:bg-red-50 text-red-600 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition"
        >
          <FaUndo className="text-xs" /> Reset
        </button>
        <button
          onClick={onSave}
          disabled={!hasChanges}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm transition ${
            hasChanges
              ? "bg-[#145A3B] hover:bg-[#0F472E] text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FaSave className="text-xs" /> Simpan Settings
        </button>
      </div>
    </div>
  );
}
