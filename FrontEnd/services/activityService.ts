const LOG_KEY = "reuse_activity_logs";

export type ActivityType =
  | "LOGIN"
  | "LOGOUT"
  | "CREATE_PRODUCT"
  | "UPDATE_PRODUCT"
  | "DELETE_PRODUCT"
  | "CREATE_ORDER"
  | "UPDATE_ORDER"
  | "VERIFY_SELLER"
  | "DELETE_USER"
  | "LOGIN_FAILED";

export interface ActivityLog {
  id: number;
  userId: number;
  userName: string;
  role: "admin" | "seller" | "customer" | "super_admin";
  action: ActivityType;
  description: string;
  ip: string;
  browser: string;
  device: string;
  createdAt: string;
}

const SEED_LOGS: ActivityLog[] = [
  { id: 1, userId: 1, userName: "Super Admin", role: "super_admin", action: "LOGIN", description: "Super Admin berhasil login ke dashboard", ip: "192.168.1.1", browser: "Chrome 125", device: "Desktop - Windows", createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: 2, userId: 2, userName: "Admin ReUse", role: "admin", action: "CREATE_PRODUCT", description: "Produk 'Vintage Denim Jacket' berhasil ditambahkan", ip: "192.168.1.2", browser: "Firefox 126", device: "Desktop - MacOS", createdAt: new Date(Date.now() - 20 * 60000).toISOString() },
  { id: 3, userId: 3, userName: "Seller One", role: "seller", action: "UPDATE_PRODUCT", description: "Produk 'Retro Sneakers' diperbarui (stok: 10 → 7)", ip: "192.168.1.10", browser: "Safari 17", device: "Desktop - MacOS", createdAt: new Date(Date.now() - 45 * 60000).toISOString() },
  { id: 4, userId: 4, userName: "Amanda", role: "customer", action: "CREATE_ORDER", description: "Pesanan INV-1720000001 dibuat (Rp 350.000)", ip: "192.168.1.50", browser: "Chrome 125", device: "Mobile - Android", createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 5, userId: 2, userName: "Admin ReUse", role: "admin", action: "VERIFY_SELLER", description: "Seller 'Thrift Bandung' berhasil diverifikasi", ip: "192.168.1.2", browser: "Firefox 126", device: "Desktop - MacOS", createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: 6, userId: 5, userName: "Unknown", role: "customer", action: "LOGIN_FAILED", description: "Percobaan login gagal — password salah (3x)", ip: "10.0.0.99", browser: "Chrome 125", device: "Mobile - iOS", createdAt: new Date(Date.now() - 4 * 3600000).toISOString() },
  { id: 7, userId: 2, userName: "Admin ReUse", role: "admin", action: "UPDATE_ORDER", description: "Status pesanan INV-1720000002 diubah menjadi Packing", ip: "192.168.1.2", browser: "Firefox 126", device: "Desktop - MacOS", createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 8, userId: 1, userName: "Super Admin", role: "super_admin", action: "DELETE_USER", description: "User ID #99 dihapus dari sistem", ip: "192.168.1.1", browser: "Chrome 125", device: "Desktop - Windows", createdAt: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 9, userId: 3, userName: "Seller One", role: "seller", action: "DELETE_PRODUCT", description: "Produk 'Leather Waist Bag (Rusak)' dihapus", ip: "192.168.1.10", browser: "Safari 17", device: "Desktop - MacOS", createdAt: new Date(Date.now() - 25 * 3600000).toISOString() },
  { id: 10, userId: 4, userName: "Amanda", role: "customer", action: "LOGOUT", description: "Amanda logout dari aplikasi", ip: "192.168.1.50", browser: "Chrome 125", device: "Mobile - Android", createdAt: new Date(Date.now() - 26 * 3600000).toISOString() },
  { id: 11, userId: 2, userName: "Admin ReUse", role: "admin", action: "LOGIN", description: "Admin ReUse login ke dashboard", ip: "192.168.1.2", browser: "Firefox 126", device: "Desktop - MacOS", createdAt: new Date(Date.now() - 48 * 3600000).toISOString() },
  { id: 12, userId: 1, userName: "Super Admin", role: "super_admin", action: "CREATE_PRODUCT", description: "Produk 'Summer Dress Collection' ditambahkan", ip: "192.168.1.1", browser: "Chrome 125", device: "Desktop - Windows", createdAt: new Date(Date.now() - 50 * 3600000).toISOString() },
];

const load = (): ActivityLog[] => {
  if (typeof window === "undefined") return SEED_LOGS;
  const raw = localStorage.getItem(LOG_KEY);
  if (!raw) {
    localStorage.setItem(LOG_KEY, JSON.stringify(SEED_LOGS));
    return SEED_LOGS;
  }
  try { return JSON.parse(raw); } catch { return SEED_LOGS; }
};

const save = (data: ActivityLog[]) => {
  if (typeof window !== "undefined") localStorage.setItem(LOG_KEY, JSON.stringify(data));
};

export const getLogs = (): ActivityLog[] => load();

export const addLog = (log: Omit<ActivityLog, "id" | "createdAt">): void => {
  const data = load();
  const newId = data.length > 0 ? Math.max(...data.map((l) => l.id)) + 1 : 1;
  data.unshift({ ...log, id: newId, createdAt: new Date().toISOString() });
  save(data);
};

export const clearLogs = (): void => {
  save([]);
};

export const getActionColor = (action: ActivityType): string => {
  switch (action) {
    case "LOGIN": return "bg-emerald-100 text-emerald-700";
    case "LOGOUT": return "bg-gray-100 text-gray-700";
    case "CREATE_PRODUCT": return "bg-blue-100 text-blue-700";
    case "UPDATE_PRODUCT": return "bg-indigo-100 text-indigo-700";
    case "DELETE_PRODUCT": return "bg-red-100 text-red-700";
    case "CREATE_ORDER": return "bg-cyan-100 text-cyan-700";
    case "UPDATE_ORDER": return "bg-amber-100 text-amber-700";
    case "VERIFY_SELLER": return "bg-violet-100 text-violet-700";
    case "DELETE_USER": return "bg-rose-100 text-rose-700";
    case "LOGIN_FAILED": return "bg-orange-100 text-orange-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export const getActionLabel = (action: ActivityType): string => {
  const labels: Record<ActivityType, string> = {
    LOGIN: "Login",
    LOGOUT: "Logout",
    CREATE_PRODUCT: "Tambah Produk",
    UPDATE_PRODUCT: "Edit Produk",
    DELETE_PRODUCT: "Hapus Produk",
    CREATE_ORDER: "Buat Pesanan",
    UPDATE_ORDER: "Update Pesanan",
    VERIFY_SELLER: "Verifikasi Seller",
    DELETE_USER: "Hapus User",
    LOGIN_FAILED: "Login Gagal",
  };
  return labels[action] || action;
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case "super_admin": return "bg-purple-100 text-purple-700";
    case "admin": return "bg-blue-100 text-blue-700";
    case "seller": return "bg-emerald-100 text-emerald-700";
    case "customer": return "bg-gray-100 text-gray-700";
    default: return "bg-gray-100 text-gray-700";
  }
};
