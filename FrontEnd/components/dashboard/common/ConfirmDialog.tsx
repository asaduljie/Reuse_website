"use client";

import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

const CONFIRM_STYLES = {
  danger:  "bg-red-600 hover:bg-red-700 text-white",
  warning: "bg-amber-500 hover:bg-amber-600 text-white",
  default: "bg-[#145A3B] hover:bg-[#0F472E] text-white",
};

export default function ConfirmDialog({
  isOpen,
  title = "Konfirmasi Tindakan",
  message,
  confirmLabel = "Ya, Lanjutkan",
  cancelLabel = "Batal",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              variant === "danger" ? "bg-red-100 text-red-600" :
              variant === "warning" ? "bg-amber-100 text-amber-600" :
              "bg-emerald-100 text-emerald-700"
            }`}>
              <FaExclamationTriangle className="text-base" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-800">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition text-gray-500"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          <p className="text-sm text-gray-600 font-semibold leading-relaxed">{message}</p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl text-sm font-bold transition"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-3 rounded-2xl text-sm font-bold shadow-sm transition ${CONFIRM_STYLES[variant]}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
