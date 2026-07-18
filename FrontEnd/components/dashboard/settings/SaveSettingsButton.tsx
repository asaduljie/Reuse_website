"use client";

import { FaSave, FaUndo } from "react-icons/fa";

interface SaveSettingsButtonProps {
  hasChanges: boolean;
  onSave: (e: React.FormEvent) => void;
  onReset: () => void;
  savedMessage: string | null;
  loading?: boolean;
}

export default function SaveSettingsButton({
  hasChanges,
  onSave,
  onReset,
  savedMessage,
  loading = false,
}: SaveSettingsButtonProps) {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg py-4 px-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {savedMessage && (
          <span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-lg animate-pulse">
            ✓ {savedMessage}
          </span>
        )}
        {hasChanges && !savedMessage && (
          <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-4 py-2 rounded-lg">
            ⚠ Ada perubahan yang belum disimpan
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReset}
          disabled={!hasChanges || loading}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition ${
            hasChanges && !loading
              ? "bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FaUndo className="text-sm" /> Reset Changes
        </button>

        <button
          onClick={onSave}
          disabled={!hasChanges || loading}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold shadow transition ${
            hasChanges && !loading
              ? "bg-[#145A3B] hover:bg-[#0F472E] text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FaSave className="text-sm" />
          {loading ? "Menyimpan..." : "Simpan Settings"}
        </button>
      </div>
    </div>
  );
}
