"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  getSellerChatThreads,
  getOrCreateThread,
  sendChatMessage,
  SellerChatThread,
  ChatMessage,
} from "../../services/sellerChatService";
import {
  FaCheckCircle,
  FaPaperPlane,
  FaStore,
  FaSearch,
  FaArrowLeft,
  FaTimes,
  FaExternalLinkAlt,
  FaComments,
  FaRobot
} from "react-icons/fa";

interface SellerChatModalProps {
  initialSellerId?: number;
  initialProductName?: string;
  initialProductPrice?: number;
  initialProductImage?: string;
  onClose: () => void;
}

export default function SellerChatModal({
  initialSellerId = 3,
  initialProductName,
  initialProductPrice,
  initialProductImage,
  onClose,
}: SellerChatModalProps) {
  const [threads, setThreads] = useState<SellerChatThread[]>([]);
  const [activeThread, setActiveThread] = useState<SellerChatThread | null>(null);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const refreshThreads = () => {
    const list = getSellerChatThreads();
    setThreads(list);
    if (activeThread) {
      const updated = list.find((t) => t.sellerId === activeThread.sellerId);
      if (updated) setActiveThread(updated);
    }
  };

  useEffect(() => {
    refreshThreads();

    if (initialSellerId) {
      const t = getOrCreateThread(
        initialSellerId,
        initialSellerId === 3 ? "ReUse Store" : `Toko Seller #${initialSellerId}`,
        initialSellerId === 3 ? "/images/sellers/reuse-logo.png" : "/images/product1.jpg"
      );
      setActiveThread(t);

      // If opening with a product context, add product context greeting if empty or requested
      if (initialProductName && t.messages.length <= 1) {
        sendChatMessage(
          initialSellerId,
          `Halo, saya tertarik dengan produk ${initialProductName}. Apakah masih ready?`,
          {
            name: initialProductName,
            image: initialProductImage || "",
            price: initialProductPrice || 0,
          }
        );
        refreshThreads();
      }
    }

    const handleUpdate = () => refreshThreads();
    window.addEventListener("seller_chat_updated", handleUpdate);
    return () => window.removeEventListener("seller_chat_updated", handleUpdate);
  }, [initialSellerId, initialProductName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  const handleSendMessage = (textToSend?: string) => {
    const msg = textToSend || inputText;
    if (!msg.trim() || !activeThread) return;

    sendChatMessage(
      activeThread.sellerId,
      msg,
      initialProductName
        ? {
            name: initialProductName,
            image: initialProductImage || "",
            price: initialProductPrice || 0,
          }
        : undefined
    );

    setInputText("");
    refreshThreads();
  };

  const quickPrompts = [
    `Apakah barang ${initialProductName ? `"${initialProductName}"` : "ini"} masih ready?`,
    "Bisa tolong kirim foto detail kondisinya?",
    "Apakah harganya masih bisa nego?",
    "Kapan barang bisa dikirim?",
  ];

  const filteredThreads = threads.filter((t) =>
    t.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[360px] sm:w-[420px] h-[580px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#145A3B] to-[#1e7a50] px-5 py-4 text-white flex items-center justify-between shadow-xs">
        {activeThread ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveThread(null)}
              className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer text-white"
            >
              <FaArrowLeft />
            </button>
            <div className="flex items-center gap-2.5">
              <img
                src={activeThread.sellerLogo}
                alt={activeThread.sellerName}
                className="w-9 h-9 rounded-xl object-cover border border-white/30 bg-white"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">{activeThread.sellerName}</h3>
                  {activeThread.sellerVerified && (
                    <FaCheckCircle className="text-emerald-300 text-xs" />
                  )}
                </div>
                <span className="text-[10px] text-emerald-200 font-medium">Online • Balas Sangat Cepat</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <FaComments className="text-lg" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Obrolan dengan Seller</h3>
              <p className="text-[10px] text-emerald-200 font-medium">Histori Pesan & Live Chat Marketplace</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {activeThread && (
            <Link
              href={`/sellers/${activeThread.sellerId}`}
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition"
              title="Lihat Profil Toko"
            >
              <FaStore className="text-xs" /> Toko
            </Link>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer text-white/80 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* BODY CONTENT */}
      {activeThread ? (
        /* CONVERSATION VIEW */
        <div className="flex-1 flex flex-col min-h-0 bg-[#F7F8FA]">
          {/* Product context bar if available */}
          {initialProductName && (
            <div className="bg-emerald-50 border-b border-emerald-100 p-2.5 px-4 flex items-center gap-3">
              {initialProductImage && (
                <img
                  src={initialProductImage}
                  alt={initialProductName}
                  className="w-10 h-10 rounded-lg object-cover border border-emerald-200 shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">Menanyakan Produk</p>
                <p className="text-xs font-bold text-gray-800 truncate">{initialProductName}</p>
                {initialProductPrice && (
                  <p className="text-xs font-black text-[#145A3B]">
                    Rp {Number(initialProductPrice).toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {activeThread.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-[#145A3B] text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] font-bold text-gray-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Automated Prompts Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="bg-emerald-50 hover:bg-emerald-100 text-[#145A3B] border border-emerald-200 text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer shrink-0"
              >
                💬 {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Tulis pesan ke seller..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#F7F8FA] border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-[#145A3B]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-[#145A3B] hover:bg-emerald-900 disabled:opacity-40 text-white flex items-center justify-center transition cursor-pointer shrink-0 shadow-xs"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </div>
      ) : (
        /* THREADS LIST VIEW (Histori Chat User) */
        <div className="flex-1 flex flex-col min-h-0 bg-[#F7F8FA]">
          {/* Search Bar */}
          <div className="p-3 bg-white border-b border-gray-100">
            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Cari pesan atau toko..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F7F8FA] border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs font-bold outline-none focus:border-[#145A3B]"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filteredThreads.length === 0 ? (
              <div className="p-8 text-center text-gray-400 flex flex-col items-center justify-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#145A3B] flex items-center justify-center mb-3">
                  <FaComments className="text-2xl" />
                </div>
                <p className="text-sm font-extrabold text-gray-800">Belum Ada Obrolan</p>
                <p className="text-xs text-gray-500 font-medium mt-1 max-w-[240px] leading-relaxed">
                  Obrolan Anda dengan seller akan muncul di sini. Klik tombol <span className="font-bold text-[#145A3B]">"Chat Seller"</span> di halaman detail produk untuk memulai chat baru.
                </p>
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <button
                  key={thread.sellerId}
                  onClick={() => setActiveThread(thread)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-white transition cursor-pointer text-left"
                >
                  <div className="relative shrink-0">
                    <img
                      src={thread.sellerLogo}
                      alt={thread.sellerName}
                      className="w-11 h-11 rounded-xl object-cover border border-gray-200 bg-white"
                    />
                    {thread.unread && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-extrabold text-xs text-gray-900 truncate">
                          {thread.sellerName}
                        </span>
                        {thread.sellerVerified && (
                          <FaCheckCircle className="text-emerald-600 text-[11px] shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-semibold shrink-0">
                        {thread.lastTimestamp}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${thread.unread ? "font-bold text-gray-900" : "text-gray-500"}`}>
                      {thread.lastMessage}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
