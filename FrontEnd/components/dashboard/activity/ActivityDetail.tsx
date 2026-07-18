"use client";

import { ActivityLog, getActionColor, getActionLabel, getRoleColor } from "../../../services/activityService";
import { FaTimes } from "react-icons/fa";

interface ActivityDetailProps {
  log: ActivityLog | null;
  onClose: () => void;
}

export default function ActivityDetail({ log, onClose }: ActivityDetailProps) {
  if (!log) return null;

  const rows: [string, string][] = [
    ["ID Log", `#${log.id}`],
    ["User", `${log.userName} (ID #${log.userId})`],
    ["Role", log.role.replace("_", " ").toUpperCase()],
    ["Aksi", getActionLabel(log.action)],
    ["Deskripsi", log.description],
    ["IP Address", log.ip],
    ["Browser", log.browser],
    ["Device", log.device],
    ["Waktu", new Date(log.createdAt).toLocaleString("id-ID")],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-extrabold text-gray-800">Detail Aktivitas</h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5">Log ID #{log.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex gap-3 items-center">
            <span className={`px-4 py-2 rounded-xl text-xs font-extrabold ${getActionColor(log.action)}`}>
              {getActionLabel(log.action)}
            </span>
            <span className={`px-4 py-2 rounded-full text-[10px] font-extrabold uppercase ${getRoleColor(log.role)}`}>
              {log.role.replace("_", " ")}
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between py-3 text-sm gap-4">
                <span className="text-gray-400 font-semibold shrink-0">{label}</span>
                <span className="text-gray-800 font-bold text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full bg-[#145A3B] hover:bg-[#0F472E] text-white py-3 rounded-2xl text-sm font-bold transition shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
