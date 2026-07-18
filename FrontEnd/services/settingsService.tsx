const SETTINGS_KEY = "reuse_system_settings";

export interface SystemSettings {
  // General
  siteName: string;
  description: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  address: string;

  // Marketplace
  currency: string;
  timezone: string;
  tax: number;
  shippingFeeDefault: number;
  minimumOrder: number;
  maxImageUpload: number;
  productPerPage: number;

  // WhatsApp
  whatsappAdmin: string;
  countryCode: string;
  autoOpenChat: boolean;
  templateCheckout: string;
  templateSeller: string;

  // Appearance
  primaryColor: string;
  secondaryColor: string;
  sidebarColor: string;
  darkMode: boolean;
  dashboardLayout: "default" | "compact" | "wide";

  // Security
  sessionTimeout: number;
  loginAttempts: number;
  passwordPolicy: "simple" | "medium" | "strong";
  registrationEnabled: boolean;
  autoVerifySeller: boolean;
  maintenanceMode: boolean;
  twoFactorEnabled: boolean;

  // Legacy (kept for backward compat)
  defaultRole: string;
}

export const DEFAULT_SETTINGS: SystemSettings = {
  siteName: "ReUse Marketplace",
  description: "Marketplace Ramah Lingkungan untuk Barang Bekas Berkualitas.",
  logo: "/images/logo.png",
  favicon: "/favicon.ico",
  email: "admin@reuse.id",
  phone: "021-1234-5678",
  address: "Jl. Sudirman No. 1, Jakarta Pusat, DKI Jakarta 10220",

  currency: "IDR",
  timezone: "Asia/Jakarta",
  tax: 11,
  shippingFeeDefault: 15000,
  minimumOrder: 50000,
  maxImageUpload: 5,
  productPerPage: 12,

  whatsappAdmin: "081234567890",
  countryCode: "+62",
  autoOpenChat: true,
  templateCheckout:
    "Halo [CustomerName], pesanan Anda dengan invoice [Invoice] telah kami terima dan sedang diproses. Terima kasih telah berbelanja di ReUse!",
  templateSeller:
    "Halo [SellerName], Anda mendapatkan pesanan baru! Silakan cek pesanan dengan nomor invoice [Invoice] di dashboard toko Anda.",

  primaryColor: "#145A3B",
  secondaryColor: "#F7F8FA",
  sidebarColor: "#145A3B",
  darkMode: false,
  dashboardLayout: "default",

  sessionTimeout: 30,
  loginAttempts: 5,
  passwordPolicy: "strong",
  registrationEnabled: true,
  autoVerifySeller: false,
  maintenanceMode: false,
  twoFactorEnabled: false,

  defaultRole: "customer",
};

export function getSettings(): SystemSettings {
  if (typeof window === "undefined") return { ...DEFAULT_SETTINGS };
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return { ...DEFAULT_SETTINGS };
  }
  try {
    // Merge with defaults to handle new fields added after first save
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: SystemSettings): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
}

export function validateSettings(settings: SystemSettings): Record<string, string> {
  const errors: Record<string, string> = {};
  const required: Array<[keyof SystemSettings, string]> = [
    ["siteName", "Website name"], ["description", "Website description"],
    ["email", "Email"], ["phone", "Phone"], ["address", "Address"],
    ["currency", "Currency"], ["timezone", "Timezone"],
    ["whatsappAdmin", "Admin WhatsApp number"], ["countryCode", "Country code"],
    ["templateCheckout", "Checkout template"], ["templateSeller", "Seller template"],
  ];
  required.forEach(([key, label]) => {
    if (String(settings[key] ?? "").trim() === "") errors[key] = `${label} wajib diisi.`;
  });
  if (settings.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) errors.email = "Format email tidak valid.";
  if (settings.tax < 0 || settings.tax > 100) errors.tax = "Pajak harus antara 0 dan 100.";
  if (settings.productPerPage < 1) errors.productPerPage = "Produk per halaman minimal 1.";
  if (settings.sessionTimeout < 1) errors.sessionTimeout = "Session timeout minimal 1 menit.";
  if (settings.loginAttempts < 1) errors.loginAttempts = "Login attempt minimal 1.";
  return errors;
}

export function exportSettings(settings: SystemSettings): string {
  return JSON.stringify(settings, null, 2);
}

export function importSettings(raw: string): SystemSettings {
  const parsed = JSON.parse(raw);
  const settings = { ...DEFAULT_SETTINGS, ...parsed } as SystemSettings;
  const errors = validateSettings(settings);
  if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
  saveSettings(settings);
  return settings;
}

export function resetSettings(): SystemSettings {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SETTINGS_KEY);
  }
  return { ...DEFAULT_SETTINGS };
}
