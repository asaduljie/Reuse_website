"use client";

import { useEffect, useRef, useState } from "react";
import { getChatMessages, addChatMessage, clearChatHistory, ChatMessage as MsgType } from "../../services/chatService";
import { queryAI } from "../../services/aiService";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { FaTrash, FaTimes, FaRobot } from "react-icons/fa";
import PremiumConfirmModal from "../common/PremiumConfirmModal";

interface Props {
  onClose?: () => void;
}

export default function ChatWidget({ onClose }: Props) {
  const [messages, setMessages] = useState<MsgType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getChatMessages());
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of conversation
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    // Add user message
    const userMsg = addChatMessage("user", text);
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Create empty bot message place for streaming text
      const botMsg = addChatMessage("bot", "");
      setMessages((prev) => [...prev, botMsg]);

      // Streaming loop from queryAI generator
      for await (const chunk of queryAI(text)) {
        setMessages((prev) => {
          const next = [...prev];
          const idx = next.findIndex((m) => m.id === botMsg.id);
          if (idx !== -1) {
            next[idx] = { ...next[idx], text: chunk };
          }
          return next;
        });
      }

      // Sync final text state back to storage
      setMessages((prev) => {
        const finalMsg = prev.find((m) => m.id === botMsg.id);
        if (finalMsg) {
          const all = getChatMessages();
          const idx = all.findIndex((m) => m.id === botMsg.id);
          if (idx !== -1) {
            all[idx] = finalMsg;
            localStorage.setItem("reuse_chat_history", JSON.stringify(all));
          }
        }
        return prev;
      });

    } catch (err) {
      console.error("AI chatbot error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setIsConfirmOpen(true);
  };

  const confirmClear = () => {
    clearChatHistory();
    setMessages(getChatMessages());
    setIsConfirmOpen(false);
  };

  return (
    <div className="bg-white w-96 h-[500px] rounded-[32px] border border-gray-100 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Header */}
      <div className="bg-[#145A3B] text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-lg">
            <FaRobot />
          </div>
          <div>
            <h4 className="font-extrabold text-sm leading-none">Asisten AI ReUse</h4>
            <span className="text-[10px] text-green-200 font-extrabold flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" /> Online
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClear}
            title="Hapus Percakapan"
            className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center transition text-white/80 hover:text-white"
          >
            <FaTrash className="text-xs" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center transition text-white/80 hover:text-white"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>
      </div>

      {/* Messages viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={scrollRef} />
      </div>

      {/* Input row */}
      <ChatInput onSend={handleSend} disabled={loading} />

      <PremiumConfirmModal
        isOpen={isConfirmOpen}
        title="Hapus Percakapan?"
        message="Tindakan ini akan menghapus seluruh riwayat percakapan Anda secara permanen."
        onConfirm={confirmClear}
        onCancel={() => setIsConfirmOpen(false)}
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />
    </div>
  );
}
