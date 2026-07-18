"use client";

import { FaHeartbeat, FaDatabase, FaServer, FaCheckCircle, FaNetworkWired } from "react-icons/fa";

export default function SystemHealthCard() {
  const metrics = [
    { label: "Sistem Utama", value: "Online", status: "ok", icon: FaHeartbeat, desc: "Aplikasi berjalan normal." },
    { label: "Database Connection", value: "Terkoneksi (Local)", status: "ok", icon: FaDatabase, desc: "MariaDB / LocalStorage sync ok." },
    { label: "API Gateway", value: "HTTP 200 OK", status: "ok", icon: FaServer, desc: "http://localhost:5000 responsive." },
    { label: "Memory Usage", value: "42MB / 512MB", status: "warning", icon: FaNetworkWired, desc: "Alokasi server ringan." },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-5">
        <FaHeartbeat className="text-[#145A3B] animate-pulse" />
        <h3 className="font-extrabold text-gray-800">System Telemetry & Health</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex gap-3.5 items-start">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm ${
                m.status === "ok" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                <Icon />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{m.label}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-black text-gray-800">{m.value}</span>
                  {m.status === "ok" && <FaCheckCircle className="text-emerald-500 text-xs shrink-0" />}
                </div>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-snug">{m.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
