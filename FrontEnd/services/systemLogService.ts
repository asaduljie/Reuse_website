const SYSLOG_KEY = "reuse_system_logs";

export type LogLevel = "info" | "warning" | "error" | "critical";
export type SystemEvent =
  | "DATABASE_BACKUP"
  | "LOGIN_ERROR"
  | "UPLOAD_ERROR"
  | "IMAGE_MISSING"
  | "WHATSAPP_FAILED"
  | "STORAGE_FULL";

export interface SystemLog {
  id: number;
  level: LogLevel;
  event: SystemEvent;
  message: string;
  metadata?: string;
  createdAt: string;
}

const SEED: SystemLog[] = [
  { id: 1,  level: "info",     event: "DATABASE_BACKUP",  message: "Database backup berhasil diselesaikan", metadata: "Size: 12.4 MB, Duration: 3.2s", createdAt: new Date(Date.now() - 10 * 60000).toISOString() },
  { id: 2,  level: "error",    event: "LOGIN_ERROR",       message: "Percobaan login gagal berulang dari IP yang sama", metadata: "IP: 10.0.0.99, Count: 5", createdAt: new Date(Date.now() - 20 * 60000).toISOString() },
  { id: 3,  level: "warning",  event: "STORAGE_FULL",      message: "Penyimpanan upload mendekati batas maksimum", metadata: "Used: 85%, Limit: 5 GB", createdAt: new Date(Date.now() - 45 * 60000).toISOString() },
  { id: 4,  level: "error",    event: "UPLOAD_ERROR",      message: "Gagal mengupload gambar produk ID #42", metadata: "File: jacket.jpg, Reason: size exceeded 5MB", createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 5,  level: "error",    event: "WHATSAPP_FAILED",   message: "Notifikasi WhatsApp gagal terkirim untuk order INV-1720000002", metadata: "Error: invalid phone number format", createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: 6,  level: "warning",  event: "IMAGE_MISSING",     message: "Gambar produk tidak ditemukan di server", metadata: "Path: /uploads/banner_summer.jpg", createdAt: new Date(Date.now() - 4 * 3600000).toISOString() },
  { id: 7,  level: "info",     event: "DATABASE_BACKUP",  message: "Backup harian terjadwal berhasil", metadata: "Time: 03:00 WIB", createdAt: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 8,  level: "critical", event: "STORAGE_FULL",      message: "Penyimpanan penuh! Upload dihentikan sementara", metadata: "Used: 100%, Free: 0 MB", createdAt: new Date(Date.now() - 26 * 3600000).toISOString() },
  { id: 9,  level: "info",     event: "DATABASE_BACKUP",  message: "Backup mingguan selesai dengan sukses", metadata: "Size: 48.1 MB", createdAt: new Date(Date.now() - 48 * 3600000).toISOString() },
  { id: 10, level: "warning",  event: "LOGIN_ERROR",       message: "Login gagal dari browser tidak dikenal", metadata: "Browser: Unknown/Bot", createdAt: new Date(Date.now() - 50 * 3600000).toISOString() },
];

const load = (): SystemLog[] => {
  if (typeof window === "undefined") return SEED;
  const raw = localStorage.getItem(SYSLOG_KEY);
  if (!raw) { localStorage.setItem(SYSLOG_KEY, JSON.stringify(SEED)); return SEED; }
  try { return JSON.parse(raw); } catch { return SEED; }
};

export const getSystemLogs = (): SystemLog[] => load();

export const getLevelColor = (level: LogLevel): string => {
  switch (level) {
    case "info":     return "bg-blue-100 text-blue-700";
    case "warning":  return "bg-amber-100 text-amber-700";
    case "error":    return "bg-red-100 text-red-700";
    case "critical": return "bg-rose-100 text-rose-900 font-black";
    default:         return "bg-gray-100 text-gray-700";
  }
};

export const getEventLabel = (event: SystemEvent): string => {
  const labels: Record<SystemEvent, string> = {
    DATABASE_BACKUP:  "Database Backup",
    LOGIN_ERROR:      "Login Error",
    UPLOAD_ERROR:     "Upload Error",
    IMAGE_MISSING:    "Gambar Hilang",
    WHATSAPP_FAILED:  "WhatsApp Gagal",
    STORAGE_FULL:     "Storage Penuh",
  };
  return labels[event] || event;
};
