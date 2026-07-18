"use client";

import { SystemSettings } from "../../../services/settingsService";

interface Props {
  settings: SystemSettings;
  onChange: (key: keyof SystemSettings, value: any) => void;
}

const Toggle = ({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
    <div>
      <p className="text-sm font-bold text-gray-700">{label}</p>
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
    <button type="button" onClick={() => onChange(!checked)} className={`relative w-12 h-6 rounded-full transition-colors ${checked ? "bg-[#145A3B]" : "bg-gray-200"}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  </div>
);

export default function AppearanceSettings({ settings, onChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Color scheme */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div className="pb-4 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-800">🎨 Appearance Settings</h2>
          <p className="text-sm text-gray-500 mt-1 font-semibold">Sesuaikan tampilan dashboard dan warna tema marketplace.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { key: "primaryColor" as keyof SystemSettings, label: "Primary Color", hint: "Warna utama tombol & aksen" },
            { key: "secondaryColor" as keyof SystemSettings, label: "Secondary Color", hint: "Warna latar background" },
            { key: "sidebarColor" as keyof SystemSettings, label: "Sidebar Color", hint: "Warna background sidebar" },
          ].map(({ key, label, hint }) => (
            <div key={key}>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
              <p className="text-xs text-gray-400 mb-2">{hint}</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings[key] as string}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer bg-transparent p-1"
                />
                <input
                  type="text"
                  value={settings[key] as string}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2.5 text-sm font-mono text-gray-800 focus:outline-none focus:border-emerald-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Live preview swatch */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 flex h-20">
          <div className="w-16 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: settings.sidebarColor }}>
            Sidebar
          </div>
          <div className="flex-1 flex items-center justify-center text-sm font-bold text-gray-700" style={{ backgroundColor: settings.secondaryColor }}>
            Content Area
          </div>
          <div className="px-4 flex items-center" style={{ backgroundColor: settings.primaryColor }}>
            <span className="text-white text-xs font-bold">Button</span>
          </div>
        </div>
      </div>

      {/* Layout & mode */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-4">
        <h3 className="text-base font-extrabold text-gray-800 mb-4">Layout & Mode</h3>

        <Toggle
          checked={settings.darkMode}
          onChange={(v) => onChange("darkMode", v)}
          label="Dark Mode"
          hint="Fitur ini masih dalam pengembangan — placeholder UI"
        />

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Dashboard Layout</label>
          <div className="grid grid-cols-3 gap-3">
            {(["default", "compact", "wide"] as const).map((layout) => (
              <button
                key={layout}
                type="button"
                onClick={() => onChange("dashboardLayout", layout)}
                className={`py-3 rounded-2xl text-sm font-bold border-2 transition capitalize ${
                  settings.dashboardLayout === layout
                    ? "border-[#145A3B] bg-emerald-50 text-[#145A3B]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {layout}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
