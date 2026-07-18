"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-3 bg-white border-t border-gray-100">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder="Tanyakan status pesanan, cari produk..."
        className="flex-1 bg-gray-50 border border-gray-250 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 transition disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="w-12 h-12 rounded-2xl bg-[#145A3B] hover:bg-[#0f462d] text-white flex items-center justify-center transition shadow-md disabled:bg-gray-200 disabled:text-gray-400 shrink-0"
      >
        <FaPaperPlane className="text-sm" />
      </button>
    </form>
  );
}
