"use client";

import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function GlobalAlertModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Override window.alert
    window.alert = (msg: any) => {
      setMessage(String(msg));
      setIsOpen(true);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative bg-white/95 backdrop-blur rounded-[32px] p-8 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 text-center animate-in fade-in zoom-in-95 duration-300">
        
        {/* Info Icon Banner */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 text-[#145A3B] flex items-center justify-center text-2xl mb-6 shadow-inner">
          <FaInfoCircle className="text-[#145A3B]" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-slate-800 leading-tight">
          Notifikasi
        </h3>

        {/* Message */}
        <p className="text-sm font-semibold text-slate-500 mt-3 mb-8 leading-relaxed">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-[#145A3B] hover:bg-[#0f442b] text-white text-sm font-extrabold py-4 px-6 rounded-2xl transition duration-200 shadow-lg shadow-emerald-950/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          OK
        </button>
      </div>
    </div>
  );
}
