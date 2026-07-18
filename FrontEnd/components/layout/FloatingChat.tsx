"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ChatWidget from "../ai/ChatWidget";
import { FaRobot, FaTimes } from "react-icons/fa";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide chat widget completely on admin / super-admin / seller dashboard routes
  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 select-none">
      {/* Widget Container overlay */}
      {isOpen && (
        <div className="shadow-2xl">
          <ChatWidget onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Circle Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#145A3B] hover:bg-[#0f462d] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <FaTimes className="text-xl animate-in spin-in duration-300" />
        ) : (
          <FaRobot className="text-2xl animate-in zoom-in duration-300" />
        )}
      </button>
    </div>
  );
}
