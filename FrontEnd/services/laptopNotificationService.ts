import { addNotification, NotificationType } from "./notificationService";
import { getOrders } from "./orderService";

export type LaptopNotificationPermission = "granted" | "denied" | "default";

export const getLaptopNotificationPermission = (): LaptopNotificationPermission => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  return window.Notification.permission;
};

export const requestLaptopNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    alert("Browser laptop Anda tidak mendukung Notifikasi Desktop.");
    return false;
  }

  try {
    const permission = await window.Notification.requestPermission();
    if (permission === "granted") {
      sendLaptopNotification(
        "🔔 Notifikasi Laptop Berhasil Diaktifkan!",
        "Anda akan menerima notifikasi otomatis secara real-time untuk setiap transaksi, pendaftaran seller, & aktivitas baru di laptop ini.",
        { type: "SYSTEM", refType: "system" }
      );
      return true;
    } else if (permission === "denied") {
      alert("Izin notifikasi ditolak di pengaturan browser Anda. Silakan beri izin notifikasi di ikon gembok browser.");
    }
  } catch (err) {
    console.error("Error requesting notification permission:", err);
  }
  return false;
};

// Synthesize a crisp dual-tone chime sound via WebAudio API
export const playNotificationChime = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const playTone = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(880, now, 0.15); // A5 tone
    playTone(1174.66, now + 0.1, 0.35); // D6 tone
  } catch (e) {
    console.warn("Audio chime play failed:", e);
  }
};

export interface SendNotificationOptions {
  type: NotificationType;
  id?: number | string;
  refType?: "order" | "product" | "seller" | "user" | "banner" | "system";
  url?: string;
}

export const sendLaptopNotification = (
  title: string,
  message: string,
  options: SendNotificationOptions
) => {
  // 1. Add to internal notification store
  addNotification({
    title,
    message,
    type: options.type,
    referenceId: options.id,
    referenceType: options.refType,
    isRead: false,
  });

  // 2. Play laptop sound chime
  playNotificationChime();

  // 3. Trigger native Windows Desktop Web Notification
  if (typeof window !== "undefined" && "Notification" in window && window.Notification.permission === "granted") {
    try {
      const desktopNotif = new window.Notification(title, {
        body: message,
        icon: "/icon.png",
        tag: `${options.type}_${Date.now()}`,
        requireInteraction: false,
      });

      desktopNotif.onclick = () => {
        window.focus();
        if (options.url) {
          window.location.href = options.url;
        } else if (options.refType === "order") {
          window.location.href = `/dashboard/admin/orders/${options.id || ""}`;
        } else if (options.refType === "seller") {
          window.location.href = `/dashboard/admin/sellers`;
        } else if (options.refType === "user") {
          window.location.href = `/dashboard/admin/users`;
        }
        desktopNotif.close();
      };
    } catch (e) {
      console.warn("Failed to create desktop window notification:", e);
    }
  }
};

// State tracker for real-time activity listener
let listenerStarted = false;
let knownOrderIds = new Set<number>();
let knownSellerIds = new Set<number>();
let knownUserIds = new Set<number>();

export const startRealtimeActivityListener = () => {
  if (typeof window === "undefined" || listenerStarted) return;
  listenerStarted = true;

  const pollActivity = async () => {
    try {
      // 1. Poll for New Orders
      const orders = await getOrders();
      if (Array.isArray(orders) && orders.length > 0) {
        if (knownOrderIds.size === 0) {
          orders.forEach((o: any) => knownOrderIds.add(Number(o.id)));
        } else {
          orders.forEach((o: any) => {
            const orderId = Number(o.id);
            if (!knownOrderIds.has(orderId)) {
              knownOrderIds.add(orderId);
              
              const buyerName = o.customerName || o.shipping?.recipient || "Pelanggan";
              const total = Number(o.total || 0).toLocaleString("id-ID");
              
              sendLaptopNotification(
                "🛒 Pesanan Baru Masuk!",
                `Pesanan #${orderId} (${o.invoice || 'INV'}) dari ${buyerName} senilai Rp ${total}`,
                {
                  type: "NEW_ORDER",
                  id: orderId,
                  refType: "order",
                  url: `/dashboard/admin/orders/${orderId}`
                }
              );
            }
          });
        }
      }
    } catch (err) {
      // Ignore polling errors silently
    }
  };

  // Run initial check and set interval every 10 seconds
  pollActivity();
  setInterval(pollActivity, 10000);
};
