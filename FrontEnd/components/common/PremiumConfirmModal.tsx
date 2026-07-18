"use client";

import { FaExclamationTriangle } from "react-icons/fa";

interface PremiumConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function PremiumConfirmModal({
  isOpen,
  title = "Konfirmasi Tindakan",
  message,
  onConfirm,
  onCancel,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
}: PremiumConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onCancel}
      />

      {/* Modal Box */}
      <div className="relative bg-white/95 backdrop-blur rounded-[32px] p-8 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 text-center animate-in fade-in zoom-in-95 duration-300">
        
        {/* Warning Icon Banner */}
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-2xl mb-6 shadow-inner">
          <FaExclamationTriangle className="text-amber-500" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-800 leading-tight">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm font-semibold text-slate-500 mt-3 mb-8 leading-relaxed">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-extrabold py-4 px-6 rounded-2xl transition duration-200 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#145A3B] hover:bg-[#0f442b] text-white text-sm font-extrabold py-4 px-6 rounded-2xl transition duration-200 shadow-lg shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
