"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ChatWidget from "../ai/ChatWidget";
import SellerChatModal from "../chat/SellerChatModal";
import { getSellerChatThreads } from "../../services/sellerChatService";
import { FaRobot, FaTimes, FaComments } from "react-icons/fa";

export default function FloatingChat() {
  const [activeWidget, setActiveWidget] = useState<"none" | "ai" | "seller">("none");
  const [targetSellerId, setTargetSellerId] = useState<number | undefined>(undefined);
  const [targetProductName, setTargetProductName] = useState<string | undefined>(undefined);
  const [targetProductPrice, setTargetProductPrice] = useState<number | undefined>(undefined);
  const [targetProductImage, setTargetProductImage] = useState<string | undefined>(undefined);

  const [hasUnreadSellerMsg, setHasUnreadSellerMsg] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkUnread = () => {
      const threads = getSellerChatThreads();
      setHasUnreadSellerMsg(threads.some((t) => t.unread));
    };

    checkUnread();

    const handleCustomOpen = (e: any) => {
      const detail = e.detail || {};
      if (detail.sellerId) setTargetSellerId(detail.sellerId);
      if (detail.productName) setTargetProductName(detail.productName);
      if (detail.productPrice) setTargetProductPrice(detail.productPrice);
      if (detail.productImage) setTargetProductImage(detail.productImage);
      setActiveWidget("seller");
      checkUnread();
    };

    window.addEventListener("open_seller_chat", handleCustomOpen);
    window.addEventListener("seller_chat_updated", checkUnread);

    return () => {
      window.removeEventListener("open_seller_chat", handleCustomOpen);
      window.removeEventListener("seller_chat_updated", checkUnread);
    };
  }, []);

  // Hide chat widget completely on admin / super-admin / seller dashboard routes
  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 select-none">
      {/* Widget Container overlays */}
      {activeWidget === "ai" && (
        <div className="shadow-2xl">
          <ChatWidget onClose={() => setActiveWidget("none")} />
        </div>
      )}

      {activeWidget === "seller" && (
        <div className="shadow-2xl">
          <SellerChatModal
            initialSellerId={targetSellerId}
            initialProductName={targetProductName}
            initialProductPrice={targetProductPrice}
            initialProductImage={targetProductImage}
            onClose={() => setActiveWidget("none")}
          />
        </div>
      )}

      {/* Floating Action Buttons Group */}
      <div className="flex flex-col items-end gap-3">
        {/* 1. SELLER CHAT BUTTON (above AI button) */}
        <div className="relative group">
          <button
            onClick={() => {
              if (activeWidget === "seller") {
                setActiveWidget("none");
              } else {
                setActiveWidget("seller");
              }
            }}
            title="Obrolan / Live Chat Seller"
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
              activeWidget === "seller"
                ? "bg-emerald-800 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {activeWidget === "seller" ? (
              <FaTimes className="text-xl animate-in spin-in duration-300" />
            ) : (
              <FaComments className="text-2xl animate-in zoom-in duration-300" />
            )}

            {/* Unread Red Dot */}
            {hasUnreadSellerMsg && activeWidget !== "seller" && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />
            )}
          </button>
          <span className="absolute right-16 top-3 bg-gray-900 text-white text-[11px] font-extrabold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">
            💬 Chat Seller & Histori
          </span>
        </div>

        {/* 2. AI ASSISTANT BUTTON */}
        <div className="relative group">
          <button
            onClick={() => {
              if (activeWidget === "ai") {
                setActiveWidget("none");
              } else {
                setActiveWidget("ai");
              }
            }}
            title="ReUse AI Assistant"
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
              activeWidget === "ai"
                ? "bg-[#145A3B] text-white"
                : "bg-[#145A3B] hover:bg-[#0f462d] text-white"
            }`}
          >
            {activeWidget === "ai" ? (
              <FaTimes className="text-xl animate-in spin-in duration-300" />
            ) : (
              <FaRobot className="text-2xl animate-in zoom-in duration-300" />
            )}
          </button>
          <span className="absolute right-16 top-3 bg-gray-900 text-white text-[11px] font-extrabold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-md">
            🤖 ReUse AI Agent
          </span>
        </div>
      </div>
    </div>
  );
}
