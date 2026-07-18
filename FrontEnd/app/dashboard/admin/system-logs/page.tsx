"use client";

import { useEffect, useState } from "react";
import {
  getSystemLogs, getLevelColor, getEventLabel,
  SystemLog, LogLevel, SystemEvent,
} from "../../../../services/systemLogService";
import { FaExclamationTriangle, FaFilter } from "react-icons/fa";

const LEVELS: { value: string; label: string }[] = [
  { value: "ALL", label: "Semua Level" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
  { value: "critical", label: "Critical" },
];

const EVENTS: { value: string; label: string }[] = [
  { value: "ALL", label: "Semua Event" },
  { value: "DATABASE_BACKUP", label: "Database Backup" },
  { value: "LOGIN_ERROR", label: "Login Error" },
  { value: "UPLOAD_ERROR", label: "Upload Error" },
  { value: "IMAGE_MISSING", label: "Gambar Hilang" },
  { value: "WHATSAPP_FAILED", label: "WhatsApp Gagal" },
  { value: "STORAGE_FULL", label: "Storage Penuh" },
];

const LEVEL_BG: Record<LogLevel, string> = {
  info: "border-l-blue-400",
  warning: "border-l-amber-400",
  error: "border-l-red-500",
  critical: "border-l-rose-600",
};

export default function SystemLogsPage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [eventFilter, setEventFilter] = useState("ALL");

  useEffect(() => { setLogs(getSystemLogs()); }, []);

  const filtered = logs.filter((l) => {
    if (levelFilter !== "ALL" && l.level !== levelFilter) return false;
    if (eventFilter !== "ALL" && l.event !== eventFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Monitoring</p>
        <h1 className="text-4xl font-black text-gray-900 mt-1.5 flex items-center gap-3">
          <FaExclamationTriangle className="text-amber-500" /> System Logs
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-semibold">
          Log kejadian sistem aplikasi — berbeda dari Activity Log pengguna.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["info", "warning", "error", "critical"] as LogLevel[]).map((level) => {
          const count = logs.filter((l) => l.level === level).length;
          return (
            <div key={level} className={`bg-white rounded-3xl border border-gray-100 p-5 shadow-sm border-l-4 ${LEVEL_BG[level]}`}>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${getLevelColor(level)}`}>
                {level}
              </span>
              <p className="text-3xl font-black text-gray-800 mt-3">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold text-gray-700 cursor-pointer appearance-none focus:outline-none"
          >
            {LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-bold text-gray-700 cursor-pointer appearance-none focus:outline-none"
          >
            {EVENTS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
          </select>
        </div>
      </div>

      {/* Log list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-gray-700">Tidak Ada Log</h3>
            <p className="text-gray-400 text-sm mt-1">Tidak ada kejadian sistem yang sesuai filter Anda.</p>
          </div>
        ) : (
          filtered.map((log) => (
            <div
              key={log.id}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 border-l-4 ${LEVEL_BG[log.level]} flex gap-4 items-start`}
            >
              <div className="shrink-0 mt-0.5">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${getLevelColor(log.level)}`}>
                  {log.level}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-bold">
                      {getEventLabel(log.event)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mt-2">{log.message}</p>
                {log.metadata && (
                  <p className="text-xs font-mono text-gray-400 mt-1 bg-gray-50 rounded-lg px-3 py-2">
                    {log.metadata}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
