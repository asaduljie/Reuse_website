export interface ChatMessage {
  id: string;
  sender: "user" | "seller";
  text: string;
  timestamp: string;
  productName?: string;
  productImage?: string;
  productPrice?: number;
}

export interface SellerChatThread {
  sellerId: number;
  sellerName: string;
  sellerLogo: string;
  sellerVerified: boolean;
  lastMessage: string;
  lastTimestamp: string;
  unread: boolean;
  messages: ChatMessage[];
}

const CHAT_STORAGE_KEY = "reuse_seller_chat_threads_v2";

const DEFAULT_THREADS: SellerChatThread[] = [];

export const getSellerChatThreads = (): SellerChatThread[] => {
  if (typeof window === "undefined") return DEFAULT_THREADS;
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(DEFAULT_THREADS));
      return DEFAULT_THREADS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_THREADS;
  }
};

export const saveSellerChatThreads = (threads: SellerChatThread[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(threads));
  }
};

export const getOrCreateThread = (
  sellerId: number,
  sellerName: string,
  sellerLogo: string
): SellerChatThread => {
  const threads = getSellerChatThreads();
  let thread = threads.find((t) => t.sellerId === sellerId);
  if (!thread) {
    thread = {
      sellerId,
      sellerName: sellerName || "Official Seller",
      sellerLogo: sellerLogo || "/images/sellers/reuse-logo.png",
      sellerVerified: true,
      lastMessage: "Chat dimulai",
      lastTimestamp: "Baru saja",
      unread: false,
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: "seller",
          text: `Halo! Terima kasih telah menghubungi ${sellerName || "toko kami"}. Ada yang bisa kami bantu?`,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    };
    threads.unshift(thread);
    saveSellerChatThreads(threads);
  }
  return thread;
};

export const sendChatMessage = (
  sellerId: number,
  text: string,
  productInfo?: { name: string; image: string; price: number }
): SellerChatThread => {
  const threads = getSellerChatThreads();
  let threadIndex = threads.findIndex((t) => t.sellerId === sellerId);
  const nowStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const newMessage: ChatMessage = {
    id: `msg_${Date.now()}`,
    sender: "user",
    text,
    timestamp: nowStr,
    productName: productInfo?.name,
    productImage: productInfo?.image,
    productPrice: productInfo?.price,
  };

  if (threadIndex === -1) {
    const newThread: SellerChatThread = {
      sellerId,
      sellerName: "ReUse Store",
      sellerLogo: "/images/sellers/reuse-logo.png",
      sellerVerified: true,
      lastMessage: text,
      lastTimestamp: nowStr,
      unread: false,
      messages: [newMessage],
    };
    threads.unshift(newThread);
    saveSellerChatThreads(threads);
    threadIndex = 0;
  } else {
    threads[threadIndex].messages.push(newMessage);
    threads[threadIndex].lastMessage = text;
    threads[threadIndex].lastTimestamp = nowStr;

    // Simulate auto seller response after 1.2s for realism
    setTimeout(() => {
      const autoRespText = getAutomatedSellerReply(text);
      const currentThreads = getSellerChatThreads();
      const idx = currentThreads.findIndex((t) => t.sellerId === sellerId);
      if (idx !== -1) {
        currentThreads[idx].messages.push({
          id: `msg_resp_${Date.now()}`,
          sender: "seller",
          text: autoRespText,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        });
        currentThreads[idx].lastMessage = autoRespText;
        currentThreads[idx].lastTimestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        currentThreads[idx].unread = true;
        saveSellerChatThreads(currentThreads);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("seller_chat_updated"));
        }
      }
    }, 1200);

    saveSellerChatThreads(threads);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("seller_chat_updated"));
  }

  return threads[threadIndex];
};

const getAutomatedSellerReply = (userQuery: string): string => {
  const q = userQuery.toLowerCase();
  if (q.includes("ready") || q.includes("ada") || q.includes("masih")) {
    return "Halo kak, produk tersebut masih ready ya! Kondisi mulus dan siap dikirim hari ini. Silakan langsung diorder sebelum keduluan pembeli lain 😊";
  }
  if (q.includes("foto") || q.includes("detail") || q.includes("kondisi")) {
    return "Foto yang tertera di produk adalah 100% foto asli barangnya kak. Tidak ada minus tersembunyi. Pengiriman dikemas sangat rapi & aman! 📦";
  }
  if (q.includes("nego") || q.includes("harga") || q.includes("diskon")) {
    return "Harga yang tertera sudah pas dan merupakan harga terbaik kak, bergaransi barang sesuai deskripsi! ✨";
  }
  if (q.includes("kirim") || q.includes("ongkir") || q.includes("kapan")) {
    return "Orderan yang masuk sebelum jam 16.00 WIB akan dikirim hari ini juga kak. Resi otomatis ter-update!";
  }
  return "Terima kasih telah menghubungi toko kami kak! Pesan Anda telah kami terima dan tim kami siap memproses pesanan Anda.";
};
