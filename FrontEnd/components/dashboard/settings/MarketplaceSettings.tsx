"use client";

import { SystemSettings } from "../../../services/settingsService";

interface Props {
  settings: SystemSettings;
  onChange: (key: keyof SystemSettings, value: any) => void;
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition" />
);

const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
  <select {...props} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 appearance-none transition">
    {children}
  </select>
);

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
    {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
    {children}
  </div>
);

export default function MarketplaceSettings({ settings, onChange }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
      <div className="pb-4 border-b border-gray-100">
        <h2 className="text-xl font-extrabold text-gray-800">🛒 Marketplace Settings</h2>
        <p className="text-sm text-gray-500 mt-1 font-semibold">Konfigurasi mata uang, pajak, ongkos kirim, dan limit produk.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Mata Uang" hint="Kode mata uang ISO 4217">
          <Select value={settings.currency} onChange={(e) => onChange("currency", e.target.value)}>
            <option value="IDR">IDR — Rupiah Indonesia</option>
            <option value="USD">USD — US Dollar</option>
            <option value="SGD">SGD — Singapore Dollar</option>
            <option value="MYR">MYR — Malaysian Ringgit</option>
          </Select>
        </Field>

        <Field label="Timezone" hint="Zona waktu server marketplace">
          <Select value={settings.timezone} onChange={(e) => onChange("timezone", e.target.value)}>
            <option value="Asia/Jakarta">Asia/Jakarta (WIB — UTC+7)</option>
            <option value="Asia/Makassar">Asia/Makassar (WITA — UTC+8)</option>
            <option value="Asia/Jayapura">Asia/Jayapura (WIT — UTC+9)</option>
          </Select>
        </Field>

        <Field label="Pajak PPN (%)" hint="Persentase pajak yang dikenakan ke pembeli">
          <Input type="number" min={0} max={100} value={settings.tax} onChange={(e) => onChange("tax", Number(e.target.value))} />
        </Field>

        <Field label="Default Ongkos Kirim (Rp)" hint="Biaya kirim default jika tidak ada aturan spesifik">
          <Input type="number" min={0} value={settings.shippingFeeDefault} onChange={(e) => onChange("shippingFeeDefault", Number(e.target.value))} />
        </Field>

        <Field label="Minimum Order (Rp)" hint="Jumlah minimum belanja untuk bisa checkout">
          <Input type="number" min={0} value={settings.minimumOrder} onChange={(e) => onChange("minimumOrder", Number(e.target.value))} />
        </Field>

        <Field label="Max Upload Gambar per Produk" hint="Jumlah maksimum gambar yang bisa diupload per produk">
          <Input type="number" min={1} max={20} value={settings.maxImageUpload} onChange={(e) => onChange("maxImageUpload", Number(e.target.value))} />
        </Field>

        <Field label="Produk Per Halaman" hint="Jumlah produk yang tampil di listing page">
          <Select value={settings.productPerPage} onChange={(e) => onChange("productPerPage", Number(e.target.value))}>
            {[6, 9, 12, 16, 24, 36].map((n) => (
              <option key={n} value={n}>{n} produk per halaman</option>
            ))}
          </Select>
        </Field>
      </div>

      {/* Summary Preview */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
        <p className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest mb-3">Preview Konfigurasi</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><span className="text-gray-500">Harga Produk:</span><br /><strong>Rp 100.000</strong></div>
          <div><span className="text-gray-500">PPN {settings.tax}%:</span><br /><strong>Rp {(100000 * settings.tax / 100).toLocaleString("id-ID")}</strong></div>
          <div><span className="text-gray-500">Ongkos Kirim:</span><br /><strong>Rp {settings.shippingFeeDefault.toLocaleString("id-ID")}</strong></div>
        </div>
      </div>
    </div>
  );
}
