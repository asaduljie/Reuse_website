"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SellerChatModal from "../chat/SellerChatModal";
import { getSellerChatThreads } from "../../services/sellerChatService";
import { FaTimes, FaComments } from "react-icons/fa";

export default function FloatingChat() {
  const [activeWidget, setActiveWidget] = useState<"none" | "seller">("none");
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

  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 select-none">
      {/* Seller Chat Modal overlay */}
      {activeWidget === "seller" && (
        <div className="shadow-xl">
          <SellerChatModal
            initialSellerId={targetSellerId}
            initialProductName={targetProductName}
            initialProductPrice={targetProductPrice}
            initialProductImage={targetProductImage}
            onClose={() => setActiveWidget("none")}
          />
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        <button
          onClick={() => {
            setActiveWidget((prev) => (prev === "seller" ? "none" : "seller"));
          }}
          title="Chat Seller"
          className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer ${
            activeWidget === "seller"
              ? "bg-[#145A3B] text-white"
              : "bg-[#145A3B] hover:bg-[#0f462d] text-white"
          }`}
        >
          {activeWidget === "seller" ? (
            <FaTimes className="text-lg" />
          ) : (
            <FaComments className="text-xl" />
          )}

          {/* Unread Red Indicator */}
          {hasUnreadSellerMsg && activeWidget !== "seller" && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>
        <span className="absolute right-15 top-2.5 bg-gray-900 text-white text-[11px] font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none shadow-sm">
          Chat Seller
        </span>
      </div>
    </div>
  );
}
