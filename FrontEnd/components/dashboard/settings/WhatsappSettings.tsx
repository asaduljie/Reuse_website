"use client";

import { SystemSettings } from "../../../services/settingsService";

interface Props {
  settings: SystemSettings;
  onChange: (key: keyof SystemSettings, value: any) => void;
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition" />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition resize-none" />
);

const Toggle = ({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
    <div>
      <p className="text-sm font-bold text-gray-700">{label}</p>
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${checked ? "bg-[#145A3B]" : "bg-gray-200"}`}
    >
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  </div>
);

export default function WhatsappSettings({ settings, onChange }: Props) {
  const preview = settings.templateCheckout
    .replace("[CustomerName]", "Amanda")
    .replace("[Invoice]", "INV-001")
    .replace("[SellerName]", "ReUse Store");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div className="pb-4 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-800">💬 WhatsApp Settings</h2>
          <p className="text-sm text-gray-500 mt-1 font-semibold">Konfigurasi nomor WA admin dan template pesan checkout.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Kode Negara</label>
            <Input value={settings.countryCode} onChange={(e) => onChange("countryCode", e.target.value)} placeholder="+62" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Nomor WhatsApp Admin</label>
            <Input value={settings.whatsappAdmin} onChange={(e) => onChange("whatsappAdmin", e.target.value)} placeholder="081234567890" />
          </div>
        </div>

        <Toggle
          checked={settings.autoOpenChat}
          onChange={(v) => onChange("autoOpenChat", v)}
          label="Auto Buka Chat WhatsApp"
          hint="Otomatis membuka WhatsApp Web setelah customer konfirmasi pesanan"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
        <h3 className="text-base font-extrabold text-gray-800">Template Pesan</h3>
        <p className="text-xs text-amber-700 bg-amber-50 rounded-2xl px-4 py-3 font-semibold border border-amber-100">
          💡 Gunakan variabel: <code className="bg-amber-100 px-1 rounded">[CustomerName]</code>, <code className="bg-amber-100 px-1 rounded">[Invoice]</code>, <code className="bg-amber-100 px-1 rounded">[SellerName]</code>
        </p>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Template Checkout (ke Customer)</label>
          <Textarea rows={4} value={settings.templateCheckout} onChange={(e) => onChange("templateCheckout", e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Template Order Baru (ke Seller)</label>
          <Textarea rows={4} value={settings.templateSeller} onChange={(e) => onChange("templateSeller", e.target.value)} />
        </div>

        {/* Preview */}
        <div className="bg-[#DCF8C6] rounded-2xl p-5 border border-green-200">
          <p className="text-[10px] font-extrabold text-green-800 uppercase tracking-widest mb-2">Preview Pesan WhatsApp</p>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{preview}</p>
        </div>
      </div>
    </div>
  );
}
