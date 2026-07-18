"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

const ICONS: Record<ToastType, any> = {
  success: FaCheckCircle,
  error: FaTimesCircle,
  info: FaInfoCircle,
  warning: FaExclamationTriangle,
};

const STYLES: Record<ToastType, string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  warning: "bg-amber-500 text-white",
};

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: number) => void }) {
  const [visible, setVisible] = useState(false);
  const Icon = ICONS[toast.type];

  useEffect(() => {
    // Animate in
    const t1 = setTimeout(() => setVisible(true), 10);
    // Auto dismiss after 3.5s
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg text-sm font-semibold min-w-[280px] max-w-sm transition-all duration-300 ${
        STYLES[toast.type]
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
    >
      <Icon className="text-base shrink-0" />
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="opacity-70 hover:opacity-100 transition shrink-0"
      >
        <FaTimes className="text-xs" />
      </button>
    </div>
  );
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// --- Convenience hook ---
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const show = (message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, show, dismiss };
}
