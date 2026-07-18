"use client";

import { useState } from "react";
import { FaSave, FaSpinner } from "react-icons/fa";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  initialData: ProfileData;
  onSave: (data: ProfileData) => Promise<void>;
}

export default function ProfileForm({ initialData, onSave }: Props) {
  const [form, setForm] = useState<ProfileData>(initialData);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const Input = ({ label, field, type = "text" }: { label: string; field: keyof ProfileData; type?: string }) => (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition"
        required={field !== "phone"}
      />
    </div>
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <h3 className="text-lg font-extrabold text-gray-800 mb-6">Edit Profil</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Nama Lengkap" field="name" />
        <Input label="Email" field="email" type="email" />
        <Input label="Nomor HP" field="phone" type="tel" />

        {success && (
          <p className="text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-100">
            ✓ Profil berhasil diperbarui!
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] disabled:bg-gray-200 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-sm transition"
        >
          {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
