"use client";

import { FaCog } from "react-icons/fa";

const SECTIONS = [
  { id: "general",     label: "General",     icon: "🏠" },
  { id: "marketplace", label: "Marketplace", icon: "🛒" },
  { id: "whatsapp",    label: "WhatsApp",    icon: "💬" },
  { id: "appearance",  label: "Appearance",  icon: "🎨" },
  { id: "security",    label: "Security",    icon: "🔒" },
];

interface SettingsSidebarProps {
  active: string;
  onChange: (id: string) => void;
  hasChanges: boolean;
}

export default function SettingsSidebar({ active, onChange, hasChanges }: SettingsSidebarProps) {
  return (
    <div className="w-56 shrink-0">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden sticky top-8">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <FaCog className="text-[#145A3B] animate-spin" style={{ animationDuration: "12s" }} />
          <span className="font-extrabold text-gray-800 text-sm">System Settings</span>
        </div>
        <nav className="py-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold transition ${
                active === s.id
                  ? "bg-emerald-50 text-[#145A3B] border-r-2 border-[#145A3B]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className="text-base">{s.icon}</span>
              {s.label}
              {active === s.id && hasChanges && (
                <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
