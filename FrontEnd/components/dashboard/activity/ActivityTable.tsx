"use client";

import { ActivityLog, getActionColor, getActionLabel, getRoleColor } from "../../../services/activityService";
import { FaEye, FaDesktop, FaMobile, FaTabletAlt } from "react-icons/fa";

interface ActivityTableProps {
  logs: ActivityLog[];
  onSelect: (log: ActivityLog) => void;
}

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const DeviceIcon = ({ device }: { device: string }) => {
  const lower = device.toLowerCase();
  if (lower.includes("mobile")) return <FaMobile className="text-gray-400 text-sm" />;
  if (lower.includes("tablet")) return <FaTabletAlt className="text-gray-400 text-sm" />;
  return <FaDesktop className="text-gray-400 text-sm" />;
};

export default function ActivityTable({ logs, onSelect }: ActivityTableProps) {
  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-xl font-bold text-gray-700">Tidak Ada Log</h3>
        <p className="text-gray-400 text-sm mt-1 font-semibold">Tidak ada aktivitas yang sesuai dengan filter Anda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Waktu</th>
              <th className="text-left px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">User</th>
              <th className="text-left px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Aksi</th>
              <th className="text-left px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="text-left px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">IP / Device</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4 text-xs text-gray-500 font-mono whitespace-nowrap">
                  {formatTime(log.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-800 text-sm">{log.userName}</div>
                  <div className="text-xs text-gray-400">ID #{log.userId}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${getRoleColor(log.role)}`}>
                    {log.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold ${getActionColor(log.action)}`}>
                    {getActionLabel(log.action)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{log.description}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">{log.ip}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <DeviceIcon device={log.device} /> {log.browser}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSelect(log)}
                    className="text-gray-400 hover:text-[#145A3B] transition"
                    title="Lihat detail"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
