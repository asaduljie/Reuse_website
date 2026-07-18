import { getProducts, Product } from "./productService";
import { getOrders, Order } from "./orderService";
import { getVerifiedSeller, SellerProfile } from "./sellerService";
import { getCategories } from "./categoryService";
import { getWishlist } from "./wishlistService";
import { getUser } from "../utils/auth";
import { getCart } from "./cartService";

export interface AIResponseChunk {
  text: string;
  isFinished: boolean;
}

const FAQ_KNOWLEDGE_BASE: Record<string, string> = {
  checkout: "Cara Checkout di ReUse:\n1. Pilih produk ramah lingkungan pilihan Anda, tambahkan ke Keranjang.\n2. Buka Halaman Cart, verifikasi kuantitas, lalu klik tombol Checkout.\n3. Masukkan rincian alamat pengiriman Anda.\n4. Pilih metode pembayaran, lalu klik Konfirmasi Pesanan.\n5. Anda akan secara otomatis diarahkan ke chat WhatsApp Admin/Seller untuk memproses pesanan secara manual.",
  refund: "Kebijakan Pengembalian Dana (Refund):\n1. Komplain wajib diajukan maksimal 1x24 jam sejak paket berstatus 'Completed' / diterima.\n2. Wajib melampirkan video unboxing utuh tanpa editan.\n3. Kontak Admin melalui tombol bantuan WhatsApp atau ajukan klaim ke seller terkait.\n4. Jika disetujui, dana akan ditransfer balik dalam 2-3 hari kerja.",
  seller: "Cara Menjadi Seller Mitra ReUse:\n1. Buka halaman registrasi, daftarkan akun baru.\n2. Masuk ke Pengaturan Akun, pilih 'Ajukan sebagai Seller'.\n3. Isi data toko, alamat fisik, detail rekening bank, dan upload dokumen pendukung.\n4. Tunggu verifikasi admin (maksimal 2x24 jam). Setelah disetujui, Anda dapat mulai mengupload produk bekas berkualitas.",
  upload: "Cara Upload Produk Baru:\n1. Masuk ke Dashboard Seller Anda.\n2. Pilih menu 'Add Product' / 'Tambah Produk'.\n3. Isi nama produk, kategori, harga, deskripsi kondisi barang, dan sisa stok.\n4. Upload foto produk berkualitas tinggi.\n5. Klik simpan. Produk Anda akan langsung tayang secara instan.",
  about: "Tentang ReUse:\nReUse adalah platform marketplace ramah lingkungan berkelanjutan (Sustainable Marketplace) yang dikhususkan untuk barang-barang bekas (Preloved) berkualitas tinggi. Misi kami adalah mendukung ekonomi sirkular dengan memperpanjang siklus pakai produk dan mengurangi emisi karbon.",
  cancel: "Cara Membatalkan Pesanan:\n1. Masuk ke profil Anda, buka menu 'Pesanan Saya'.\n2. Buka rincian pesanan yang ingin dibatalkan.\n3. Klik tombol 'Batalkan Pesanan' di bagian bawah (hanya berlaku jika status pesanan belum diproses oleh penjual).",
};

export async function* queryAI(query: string, userId?: number): AsyncGenerator<string, void, unknown> {
  const customerId = userId || getUser()?.id || 4;
  const lowercaseQuery = query.toLowerCase();

  // Assemble context
  let contextProducts: Product[] = [];
  try {
    const resp = await getProducts();
    contextProducts = resp?.data?.products || resp?.data || [];
  } catch {}

  let contextOrders: Order[] = [];
  try {
    const resp = await getOrders();
    contextOrders = Array.isArray(resp) ? resp : [];
  } catch {}
  const userOrders = contextOrders.filter(o => o.customerId === customerId);

  const wishlist = getWishlist(customerId);
  const sellers = getVerifiedSeller();

  let responseText = "";

  // 1. FAQ triggers
  if (lowercaseQuery.includes("checkout")) {
    responseText = FAQ_KNOWLEDGE_BASE.checkout;
  } else if (lowercaseQuery.includes("refund") || lowercaseQuery.includes("kembalian dana") || lowercaseQuery.includes("kembalikan")) {
    responseText = FAQ_KNOWLEDGE_BASE.refund;
  } else if (lowercaseQuery.includes("jadi seller") || lowercaseQuery.includes("daftar toko") || lowercaseQuery.includes("buka toko")) {
    responseText = FAQ_KNOWLEDGE_BASE.seller;
  } else if (lowercaseQuery.includes("upload") || lowercaseQuery.includes("tambah produk") || lowercaseQuery.includes("jual")) {
    responseText = FAQ_KNOWLEDGE_BASE.upload;
  } else if (lowercaseQuery.includes("tentang") || lowercaseQuery.includes("apa itu reuse") || lowercaseQuery.includes("reuse")) {
    responseText = FAQ_KNOWLEDGE_BASE.about;
  } else if (lowercaseQuery.includes("batal") || lowercaseQuery.includes("cancel")) {
    responseText = FAQ_KNOWLEDGE_BASE.cancel;
  }
  // 2. Cart summary trigger
  else if (lowercaseQuery.includes("keranjang") || lowercaseQuery.includes("cart") || lowercaseQuery.includes("belanjaan saya")) {
    const cart = getCart();
    if (cart.length > 0) {
      responseText = `Keranjang belanja Anda saat ini berisi:\n` +
        cart.map((item, idx) => `${idx + 1}. **${item.name}** - Rp ${item.price.toLocaleString("id-ID")}`).join("\n") +
        `\n\nTotal belanjaan Anda adalah **Rp ${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString("id-ID")}**. Silakan buka halaman keranjang untuk checkout!`;
    } else {
      responseText = "Keranjang belanja Anda saat ini masih kosong. Yuk jelajahi katalog produk ramah lingkungan kami!";
    }
  }
  // 3. Product query triggers
  else if (lowercaseQuery.includes("murah") || lowercaseQuery.includes("harga rendah") || lowercaseQuery.includes("promo")) {
    const cheap = [...contextProducts].sort((a, b) => a.price - b.price).slice(0, 3);
    responseText = `Berikut adalah rekomendasi produk preloved termurah yang tersedia:\n` + 
      cheap.map((p, idx) => `${idx + 1}. **${p.name}** - Rp ${p.price.toLocaleString("id-ID")}`).join("\n");
  } else if (lowercaseQuery.includes("elektronik")) {
    const electro = contextProducts.filter(p => p.category?.toLowerCase() === "elektronik" || p.categoryId === 1 || p.category?.toLowerCase().includes("elek")).slice(0, 3);
    if (electro.length > 0) {
      responseText = `Berikut produk kategori Elektronik terpopuler kami:\n` +
        electro.map((p, idx) => `${idx + 1}. **${p.name}** - Rp ${p.price.toLocaleString("id-ID")}`).join("\n");
    } else {
      responseText = "Maaf, saat ini belum ada produk kategori Elektronik yang tersedia.";
    }
  } else if (lowercaseQuery.includes("di bawah 5 juta") || lowercaseQuery.includes("dibawah 5 juta") || lowercaseQuery.includes("dibawah 5jt") || lowercaseQuery.includes("di bawah 5jt")) {
    const cheap = contextProducts.filter(p => p.price < 5000000).slice(0, 3);
    responseText = `Berikut rekomendasi produk di bawah 5 juta rupiah:\n` + 
      cheap.map((p, idx) => `${idx + 1}. **${p.name}** - Rp ${p.price.toLocaleString("id-ID")}`).join("\n");
  } else if (lowercaseQuery.includes("sepatu") || lowercaseQuery.includes("sneaker")) {
    const shoes = contextProducts.filter(p => p.name.toLowerCase().includes("sepatu") || p.name.toLowerCase().includes("sneaker") || p.description.toLowerCase().includes("sepatu")).slice(0, 3);
    if (shoes.length > 0) {
      responseText = `Berikut rekomendasi sepatu bekas berkualitas:\n` + 
        shoes.map((p, idx) => `${idx + 1}. **${p.name}** - Rp ${p.price.toLocaleString("id-ID")}`).join("\n");
    } else {
      responseText = "Maaf, produk sepatu yang Anda cari tidak ditemukan.";
    }
  }
  // 4. Order query triggers
  else if (lowercaseQuery.includes("order terakhir") || lowercaseQuery.includes("pesanan terakhir") || lowercaseQuery.includes("pesanan saya")) {
    if (userOrders.length > 0) {
      const last = userOrders[0];
      responseText = `Order terakhir Anda adalah **${last.invoice}** senilai **Rp ${last.total.toLocaleString("id-ID")}** yang dibuat pada ${new Date(last.createdAt).toLocaleDateString("id-ID")}.\nStatus saat ini: **${last.status}**.`;
    } else {
      responseText = "Anda belum memiliki riwayat pesanan di ReUse.";
    }
  } else if (lowercaseQuery.includes("status pesanan") || lowercaseQuery.includes("invoice") || lowercaseQuery.includes("lacak")) {
    if (userOrders.length > 0) {
      responseText = `Berikut status pesanan aktif Anda:\n` +
        userOrders.map((o) => `- **${o.invoice}**: ${o.status} (Total: Rp ${o.total.toLocaleString("id-ID")})`).join("\n");
    } else {
      responseText = "Anda belum memiliki pesanan aktif.";
    }
  }
  // 5. Seller rating triggers
  else if (lowercaseQuery.includes("seller terpercaya") || lowercaseQuery.includes("rating tertinggi") || lowercaseQuery.includes("toko terbaik")) {
    const top = [...sellers].sort((a, b) => b.rating - a.rating).slice(0, 3);
    responseText = `Berikut adalah toko mitra terpopuler dengan rating terbaik:\n` +
      top.map((s, idx) => `${idx + 1}. **${s.storeName}** - ⭐ ${s.rating.toFixed(1)} (${s.city})`).join("\n");
  } else if (lowercaseQuery.includes("kategori")) {
    const cats = getCategories();
    responseText = `Kategori terpopuler saat ini:\n` +
      cats.map((c) => `- **${c.name}**: ${c.description || "Katalog barang bekas terpilih"}`).join("\n");
  }
  // 6. Dynamic keywords product search fallback
  else {
    const searchKeywords = lowercaseQuery.split(" ");
    const matchedProducts = contextProducts.filter(p => 
      searchKeywords.some(keyword => 
        keyword.length > 2 && (
          p.name.toLowerCase().includes(keyword) || 
          p.description.toLowerCase().includes(keyword) ||
          p.category?.toLowerCase().includes(keyword)
        )
      )
    ).slice(0, 3);

    if (matchedProducts.length > 0) {
      responseText = `Saya menemukan beberapa produk preloved yang cocok dengan kata kunci Anda:\n` +
        matchedProducts.map((p, idx) => `${idx + 1}. **${p.name}** - Rp ${p.price.toLocaleString("id-ID")} (${p.category})`).join("\n") +
        `\n\nKetik nama produk lebih detail untuk pencarian spesifik.`;
    } else {
      const name = getUser()?.name || "Pelanggan";
      responseText = `Halo ${name}! Saya adalah Asisten AI ReUse.\n\nAnda bisa bertanya seputar:\n- Status pesanan terakhir Anda ("lacak pesanan")\n- Rekomendasi produk murah ("produk murah")\n- Cek belanjaan Anda ("isi keranjang")\n- Panduan belanja ("cara checkout", "refund")\n\nCoba ketik nama barang yang ingin dicari (contoh: "baju", "sepatu", "meja"). Ada yang bisa saya bantu hari ini?`;
    }
  }

  // Simulate streaming response generator chunks
  const words = responseText.split(" ");
  let currentText = "";
  for (const word of words) {
    currentText += (currentText ? " " : "") + word;
    yield currentText;
    await new Promise((r) => setTimeout(r, 20)); // simulated 20ms network delay per word chunk
  }
}
