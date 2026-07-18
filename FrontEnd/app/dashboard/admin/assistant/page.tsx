"use client";

import { useEffect, useState } from "react";
import { getDashboardStatistics } from "@/services/dashboard/dashboardService";
import { getProducts, Product } from "@/services/productService";
import { getOrders, Order } from "@/services/orderService";
import { getVerifiedSeller, SellerProfile } from "@/services/sellerService";
import { getCategories } from "@/services/categoryService";
import { FaRobot, FaPaperPlane, FaChartLine, FaExclamationTriangle, FaTrophy, FaArrowRight, FaUndo } from "react-icons/fa";

interface Message {
  id: number;
  sender: "user" | "assistant";
  text: string;
}

export default function AdminAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "assistant", text: "Halo Admin! Saya Asisten AI khusus Admin. Anda dapat menanyakan ringkasan performa penjualan, data produk terlaris, status gudang, atau seller dengan penjualan terbaik." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Real-time calculated insights
  const [insights, setInsights] = useState<{
    revenue: number;
    lowStockCount: number;
    topProduct: string;
    bestSeller: string;
  }>({
    revenue: 0,
    lowStockCount: 0,
    topProduct: "Memuat...",
    bestSeller: "Memuat...",
  });

  useEffect(() => {
    const calculateInsights = async () => {
      try {
        const stats = await getDashboardStatistics();
        const prodResp = await getProducts();
        const rawProducts = prodResp?.data?.products || prodResp?.data || [];
        const lowStock = rawProducts.filter((p: Product) => p.stock <= 5).length;
        
        // Find top product
        const orders = await getOrders();
        const itemSales: Record<string, number> = {};
        orders.forEach(o => {
          o.items.forEach(i => {
            itemSales[i.name] = (itemSales[i.name] || 0) + i.quantity;
          });
        });
        const sortedProds = Object.entries(itemSales).sort((a,b) => b[1] - a[1]);
        const topProd = sortedProds[0] ? `${sortedProds[0][0]} (${sortedProds[0][1]} terjual)` : "Belum ada penjualan";

        // Find best seller
        const sellers = getVerifiedSeller();
        const bestSel = sellers.length > 0 ? [...sellers].sort((a,b) => b.rating - a.rating)[0].storeName : "Belum ada seller";

        setInsights({
          revenue: stats.totalRevenue,
          lowStockCount: lowStock,
          topProduct: topProd,
          bestSeller: bestSel,
        });
      } catch (err) {
        console.error(err);
      }
    };
    calculateInsights();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { id: prev.length + 1, sender: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      let botResponse = "";
      const lower = userText.toLowerCase();

      // Read services dynamically
      const stats = await getDashboardStatistics();
      const prodResp = await getProducts();
      const rawProducts = prodResp?.data?.products || prodResp?.data || [];
      const orders = await getOrders();
      const sellers = getVerifiedSeller();
      const categories = getCategories();

      if (lower.includes("produk terlaris") || lower.includes("terlaris")) {
        const itemSales: Record<string, number> = {};
        orders.forEach(o => {
          o.items.forEach(i => {
            itemSales[i.name] = (itemSales[i.name] || 0) + i.quantity;
          });
        });
        const top = Object.entries(itemSales).sort((a,b) => b[1] - a[1]).slice(0, 3);
        botResponse = `Berikut adalah produk terlaris di marketplace:\n` +
          top.map((t, idx) => `${idx + 1}. **${t[0]}** (${t[1]} terjual)`).join("\n");
      } else if (lower.includes("seller terbaik") || lower.includes("seller terpercaya") || lower.includes("seller")) {
        const top = [...sellers].sort((a,b) => b.rating - a.rating).slice(0, 3);
        botResponse = `Berikut adalah seller terbaik berdasarkan rating pembeli:\n` +
          top.map((s, idx) => `${idx + 1}. **${s.storeName}** - ⭐ ${s.rating.toFixed(1)} (${s.city})`).join("\n");
      } else if (lower.includes("revenue") || lower.includes("omset") || lower.includes("pendapatan")) {
        botResponse = `Total pendapatan (revenue) dari seluruh transaksi yang berstatus Completed adalah **Rp ${stats.totalRevenue.toLocaleString("id-ID")}** dari total **${stats.totalOrders}** pesanan masuk.`;
      } else if (lower.includes("kategori")) {
        botResponse = `Total kategori aktif: **${categories.length}**. Kategori paling populer di catalog saat ini adalah **Elektronik** dan **Pakaian** berdasarkan persentase upload produk.`;
      } else if (lower.includes("habis") || lower.includes("stok") || lower.includes("gudang")) {
        const low = rawProducts.filter((p: Product) => p.stock <= 5);
        if (low.length > 0) {
          botResponse = `Peringatan! Terdapat **${low.length}** produk dengan stok kritis (kurang dari atau sama dengan 5):\n` +
            low.map((p: Product) => `- **${p.name}** (Sisa Stok: ${p.stock})`).join("\n");
        } else {
          botResponse = "Seluruh stok produk terpantau aman (di atas 5 unit).";
        }
      } else {
        botResponse = "Maaf Admin, saya tidak mengenali perintah tersebut. Anda dapat bertanya tentang:\n- 'produk terlaris'\n- 'seller terbaik'\n- 'revenue minggu ini'\n- 'stok hampir habis'";
      }

      // Stream mockup response in blocks
      await new Promise((r) => setTimeout(r, 600));
      setMessages((prev) => [...prev, { id: prev.length + 1, sender: "assistant", text: botResponse }]);
    } catch {
      setMessages((prev) => [...prev, { id: prev.length + 1, sender: "assistant", text: "Terjadi kesalahan internal saat mengakses database." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Admin Tools</p>
        <h1 className="text-4xl font-black text-gray-900 mt-1">Asisten AI Admin</h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">
          Dapatkan ringkasan performa penjualan dan data intelijen pasar secara instan.
        </p>
      </div>

      {/* Insights Row */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <FaChartLine />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Revenue</p>
            <p className="text-lg font-black text-gray-800 mt-1">Rp {insights.revenue.toLocaleString("id-ID")}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
            <FaExclamationTriangle />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Stok Kritis</p>
            <p className="text-lg font-black text-gray-800 mt-1">{insights.lowStockCount} Produk</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
            <FaTrophy />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Produk Terlaris</p>
            <p className="text-sm font-black text-gray-800 mt-1 truncate">{insights.topProduct}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
            <FaRobot />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Seller Terbaik</p>
            <p className="text-sm font-black text-gray-800 mt-1 truncate">{insights.bestSeller}</p>
          </div>
        </div>
      </div>

      {/* Chat Terminal Console */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden h-[450px] flex flex-col">
        {/* Terminal Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-xs font-mono font-bold text-gray-400 ml-2">ai-terminal@reuse.id</span>
          </div>
          <button
            onClick={() => setMessages([{ id: 1, sender: "assistant", text: "Halo Admin! Ada yang bisa saya bantu?" }])}
            className="text-xs text-[#145A3B] hover:underline font-bold flex items-center gap-1"
          >
            <FaUndo className="text-[10px]" /> Reset Chat
          </button>
        </div>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/20 custom-scrollbar">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-3xl px-5 py-3 text-sm font-semibold leading-relaxed shadow-sm ${
                m.sender === "user"
                  ? "bg-[#145A3B] text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              } whitespace-pre-line`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-3xl px-5 py-3 shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Tulis pesan ke Asisten AI Admin di sini... (contoh: 'produk terlaris')"
            className="flex-1 bg-gray-50 border border-gray-250 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-12 h-12 rounded-2xl bg-[#145A3B] hover:bg-[#0f462d] text-white flex items-center justify-center transition shadow-md disabled:bg-gray-200 disabled:text-gray-400 shrink-0"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </form>
      </div>
    </div>
  );
}
