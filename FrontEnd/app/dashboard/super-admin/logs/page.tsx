"use client";

import { useEffect, useState } from "react";
import SuperAdminHeader from "../../../../components/dashboard/super-admin/SuperAdminHeader";
import { getSystemLogs, SystemLog, LogLevel } from "../../../../services/systemLogService";
import { FaExclamationTriangle, FaInfoCircle, FaBug, FaSearch } from "react-icons/fa";

export default function SuperAdminLogsPage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  useEffect(() => {
    setLogs(getSystemLogs());
  }, []);

  const filtered = logs.filter((log) => {
    const matchSearch =
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.event.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === "all" || log.level === levelFilter;
    return matchSearch && matchLevel;
  });

  const getLevelStyle = (level: LogLevel) => {
    switch (level) {
      case "critical": return "border-l-4 border-red-600 bg-red-50/50";
      case "error":    return "border-l-4 border-orange-500 bg-orange-50/50";
      case "warning":  return "border-l-4 border-amber-500 bg-amber-50/50";
      default:         return "border-l-4 border-blue-500 bg-blue-50/50";
    }
  };

  return (
    <div className="space-y-8">
      <SuperAdminHeader
        title="Logs Sistem & Pengecualian"
        breadcrumbs={[{ label: "Logs" }]}
      />

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[280px] relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari logs berdasarkan pesan atau event..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition"
          />
        </div>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-300 shadow-sm transition"
        >
          <option value="all">Semua Level</option>
          <option value="critical">Critical</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((log) => (
          <div key={log.id} className={`p-5 rounded-2xl border border-gray-100 shadow-sm transition ${getLevelStyle(log.level)}`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-3">
                <div className="mt-1 shrink-0">
                  {log.level === "critical" || log.level === "error" ? (
                    <FaExclamationTriangle className="text-red-500" />
                  ) : log.level === "warning" ? (
                    <FaExclamationTriangle className="text-amber-500" />
                  ) : (
                    <FaInfoCircle className="text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="font-extrabold text-gray-800 text-sm">{log.message}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">
                    Event: {log.event} {log.metadata ? `| Detail: ${log.metadata}` : ""}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 shrink-0">
                {new Date(log.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
