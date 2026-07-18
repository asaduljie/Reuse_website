"use client";

import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

interface Props {
  onSave?: (currentPassword: string, newPassword: string) => Promise<void>;
}

export default function ChangePassword({ onSave }: Props) {
  const [form, setForm] = useState({ current: "", new: "", confirm: "" });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.new !== form.confirm) {
      setMessage({ type: "error", text: "Password baru dan konfirmasi tidak cocok." });
      return;
    }
    if (form.new.length < 6) {
      setMessage({ type: "error", text: "Password minimal 6 karakter." });
      return;
    }
    setSaving(true);
    try {
      await onSave?.(form.current, form.new);
      setMessage({ type: "success", text: "Password berhasil diperbarui!" });
      setForm({ current: "", new: "", confirm: "" });
    } catch {
      setMessage({ type: "error", text: "Gagal memperbarui password. Coba lagi." });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const EyeToggle = ({ field }: { field: keyof typeof show }) => (
    <button type="button" tabIndex={-1} onClick={() => setShow((p) => ({ ...p, [field]: !p[field] }))} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
      {show[field] ? <FaEyeSlash /> : <FaEye />}
    </button>
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <h3 className="text-lg font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        <FaLock className="text-[#145A3B]" /> Ganti Password
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
        {(["current", "new", "confirm"] as const).map((field) => {
          const labels = { current: "Password Saat Ini", new: "Password Baru", confirm: "Konfirmasi Password Baru" };
          return (
            <div key={field}>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">{labels[field]}</label>
              <div className="relative">
                <input
                  type={show[field] ? "text" : "password"}
                  value={form[field]}
                  onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition"
                  required
                />
                <EyeToggle field={field} />
              </div>
            </div>
          );
        })}

        {message && (
          <p className={`text-sm font-bold px-4 py-3 rounded-2xl border ${
            message.type === "success" ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-red-600 bg-red-50 border-red-100"
          }`}>
            {message.type === "success" ? "✓" : "⚠"} {message.text}
          </p>
        )}

        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] disabled:bg-gray-200 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-sm transition">
          {saving ? <FaSpinner className="animate-spin" /> : <FaLock />}
          {saving ? "Memperbarui..." : "Perbarui Password"}
        </button>
      </form>
    </div>
  );
}
