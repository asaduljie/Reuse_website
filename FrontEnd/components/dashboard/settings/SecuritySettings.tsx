"use client";

import { SystemSettings } from "../../../services/settingsService";

interface Props {
  settings: SystemSettings;
  onChange: (key: keyof SystemSettings, value: any) => void;
}

const Toggle = ({ checked, onChange, label, hint, danger }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string; danger?: boolean }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
    <div>
      <p className="text-sm font-bold text-gray-700">{label}</p>
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
    <button type="button" onClick={() => onChange(!checked)} className={`relative w-12 h-6 rounded-full transition-colors ${checked ? (danger ? "bg-red-500" : "bg-[#145A3B]") : "bg-gray-200"}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  </div>
);

const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
  <select {...props} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 appearance-none transition">
    {children}
  </select>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition" />
);

export default function SecuritySettings({ settings, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div className="pb-4 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-800">🔒 Security Settings</h2>
          <p className="text-sm text-gray-500 mt-1 font-semibold">Kebijakan login, sesi, dan keamanan akun marketplace.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Session Timeout (menit)</label>
            <p className="text-xs text-gray-400 mb-2">User akan logout otomatis setelah tidak aktif</p>
            <Input type="number" min={5} max={480} value={settings.sessionTimeout} onChange={(e) => onChange("sessionTimeout", Number(e.target.value))} />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Batas Percobaan Login</label>
            <p className="text-xs text-gray-400 mb-2">Akun dikunci setelah percobaan gagal berulang</p>
            <Input type="number" min={3} max={10} value={settings.loginAttempts} onChange={(e) => onChange("loginAttempts", Number(e.target.value))} />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Kebijakan Password</label>
            <p className="text-xs text-gray-400 mb-2">Tingkat kekuatan password yang dipersyaratkan</p>
            <Select value={settings.passwordPolicy} onChange={(e) => onChange("passwordPolicy", e.target.value)}>
              <option value="simple">Simple — min 6 karakter</option>
              <option value="medium">Medium — min 8 karakter + angka</option>
              <option value="strong">Strong — min 10 karakter + angka + simbol</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-base font-extrabold text-gray-800 mb-2">Kebijakan Akses</h3>
        <p className="text-xs text-gray-400 mb-4">Aktifkan atau nonaktifkan fitur registrasi dan verifikasi akun.</p>

        <Toggle checked={settings.registrationEnabled} onChange={(v) => onChange("registrationEnabled", v)} label="Registrasi Terbuka" hint="Pengguna baru dapat mendaftar secara mandiri" />
        <Toggle checked={settings.autoVerifySeller} onChange={(v) => onChange("autoVerifySeller", v)} label="Auto Verifikasi Seller" hint="Seller baru langsung aktif tanpa perlu persetujuan admin" />
        <Toggle checked={settings.twoFactorEnabled} onChange={(v) => onChange("twoFactorEnabled", v)} label="Two-Factor Authentication" hint="Memerlukan kode OTP saat login (belum aktif — placeholder)" />
        <Toggle
          checked={settings.maintenanceMode}
          onChange={(v) => onChange("maintenanceMode", v)}
          label="Maintenance Mode"
          hint="Website ditutup sementara untuk pemeliharaan sistem"
          danger
        />
      </div>

      {settings.maintenanceMode && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-5 flex gap-3 items-start">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-extrabold text-red-700 text-sm">Maintenance Mode Aktif!</p>
            <p className="text-xs text-red-600 mt-1">Seluruh halaman publik menampilkan halaman maintenance. Hanya admin yang dapat mengakses dashboard.</p>
          </div>
        </div>
      )}
    </div>
  );
}
