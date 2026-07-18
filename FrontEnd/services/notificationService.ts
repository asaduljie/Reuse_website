const NOTIF_KEY = "reuse_notifications";

export type NotificationType =
  | "NEW_ORDER"
  | "LOW_STOCK"
  | "NEW_SELLER"
  | "SELLER_VERIFIED"
  | "NEW_USER"
  | "BANNER_EXPIRED"
  | "SYSTEM";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  referenceId?: number | string;
  referenceType?: "order" | "product" | "seller" | "user" | "banner" | "system";
  isRead: boolean;
  createdAt: string;
}

const getReferenceUrl = (n: Notification): string => {
  switch (n.referenceType) {
    case "order":
      return `/dashboard/admin/orders/${n.referenceId}`;
    case "product":
      return `/dashboard/admin/products`;
    case "seller":
      return `/dashboard/admin/sellers/${n.referenceId}`;
    case "user":
      return `/dashboard/admin/users/${n.referenceId}`;
    case "banner":
      return `/dashboard/admin/banners/${n.referenceId}`;
    default:
      return `/dashboard/notifications`;
  }
};

export { getReferenceUrl };

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "Pesanan Baru Masuk",
    message: "Amanda melakukan pemesanan senilai Rp 350.000",
    type: "NEW_ORDER",
    referenceId: 1720000001,
    referenceType: "order",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: "Stok Produk Hampir Habis",
    message: "Produk 'Vintage Denim Jacket' tersisa 2 item",
    type: "LOW_STOCK",
    referenceId: 1,
    referenceType: "product",
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: "Seller Baru Mendaftar",
    message: "Toko 'Thrift Bandung' menunggu verifikasi",
    type: "NEW_SELLER",
    referenceId: 3,
    referenceType: "seller",
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    title: "Seller Telah Diverifikasi",
    message: "ReUse Store berhasil diverifikasi oleh Super Admin",
    type: "SELLER_VERIFIED",
    referenceId: 3,
    referenceType: "seller",
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    title: "Pengguna Baru Terdaftar",
    message: "Budi Santoso baru saja mendaftar sebagai customer",
    type: "NEW_USER",
    referenceId: 5,
    referenceType: "user",
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 6,
    title: "Banner Kedaluwarsa",
    message: "Banner 'Flash Sale Akhir Tahun' telah melewati tanggal berakhir",
    type: "BANNER_EXPIRED",
    referenceId: 1,
    referenceType: "banner",
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 7,
    title: "Pesanan Baru",
    message: "Pelanggan Siti memesan Retro Sneakers",
    type: "NEW_ORDER",
    referenceId: 1720000002,
    referenceType: "order",
    isRead: true,
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 8,
    title: "Pembaruan Sistem",
    message: "Marketplace ReUse berhasil diperbarui ke versi terbaru",
    type: "SYSTEM",
    referenceType: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

// --- LocalStorage helpers ---
const load = (): Notification[] => {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATIONS;
  const raw = localStorage.getItem(NOTIF_KEY);
  if (!raw) {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
    return DEFAULT_NOTIFICATIONS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
};

const save = (data: Notification[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(data));
  }
};

// --- Public API ---
export const getNotifications = (): Notification[] => load();

export const getUnreadCount = (): number =>
  load().filter((n) => !n.isRead).length;

export const markAsRead = (id: number): void => {
  const data = load().map((n) => (n.id === id ? { ...n, isRead: true } : n));
  save(data);
};

export const markAllAsRead = (): void => {
  const data = load().map((n) => ({ ...n, isRead: true }));
  save(data);
};

export const deleteNotification = (id: number): void => {
  save(load().filter((n) => n.id !== id));
};

export const addNotification = (notif: Omit<Notification, "id" | "createdAt">): void => {
  const data = load();
  const newId = data.length > 0 ? Math.max(...data.map((n) => n.id)) + 1 : 1;
  data.unshift({ ...notif, id: newId, createdAt: new Date().toISOString() });
  save(data);
};

export const getTypeIcon = (type: NotificationType): string => {
  switch (type) {
    case "NEW_ORDER": return "🛒";
    case "LOW_STOCK": return "⚠️";
    case "NEW_SELLER": return "🏪";
    case "SELLER_VERIFIED": return "✅";
    case "NEW_USER": return "👤";
    case "BANNER_EXPIRED": return "🖼️";
    case "SYSTEM": return "⚙️";
    default: return "🔔";
  }
};
