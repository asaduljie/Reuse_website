"use client";

import { SystemSettings } from "../../../services/settingsService";

interface Props {
  settings: SystemSettings;
  onChange: (key: keyof SystemSettings, value: any) => void;
}

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
    {hint && <p className="text-xs text-gray-400 mb-2 font-semibold">{hint}</p>}
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition"
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition resize-none"
  />
);

export default function GeneralSettings({ settings, onChange }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
      <div className="pb-4 border-b border-gray-100">
        <h2 className="text-xl font-extrabold text-gray-800">🏠 General Settings</h2>
        <p className="text-sm text-gray-500 mt-1 font-semibold">Informasi dasar website dan kontak marketplace.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Website Name" hint="Nama yang tampil di title dan header">
          <Input value={settings.siteName} onChange={(e) => onChange("siteName", e.target.value)} placeholder="ReUse Marketplace" />
        </Field>

        <Field label="Email Kontak" hint="Email yang tampil di halaman kontak">
          <Input type="email" value={settings.email} onChange={(e) => onChange("email", e.target.value)} placeholder="admin@reuse.id" />
        </Field>

        <Field label="Nomor Telepon" hint="Telepon kantor / customer service">
          <Input value={settings.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="021-1234-5678" />
        </Field>

        <Field label="Logo URL" hint="Path gambar logo (upload ke /public/images/)">
          <Input value={settings.logo} onChange={(e) => onChange("logo", e.target.value)} placeholder="/images/logo.png" />
        </Field>

        <Field label="Favicon URL" hint="Path file favicon (.ico atau .png)">
          <Input value={settings.favicon} onChange={(e) => onChange("favicon", e.target.value)} placeholder="/favicon.ico" />
        </Field>
      </div>

      <Field label="Deskripsi Website" hint="Tampil di meta description dan halaman about">
        <Textarea rows={3} value={settings.description} onChange={(e) => onChange("description", e.target.value)} placeholder="Marketplace Ramah Lingkungan..." />
      </Field>

      <Field label="Alamat Kantor" hint="Alamat fisik perusahaan">
        <Textarea rows={2} value={settings.address} onChange={(e) => onChange("address", e.target.value)} placeholder="Jl. Sudirman No. 1, Jakarta..." />
      </Field>
    </div>
  );
}
