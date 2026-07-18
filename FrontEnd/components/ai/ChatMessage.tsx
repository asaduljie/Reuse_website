"use client";

import { ChatMessage as MsgType } from "../../services/chatService";

interface Props {
  message: MsgType;
}

export default function ChatMessage({ message }: Props) {
  const isBot = message.sender === "bot";
  const time = new Date(message.timestamp).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col ${isBot ? "items-start" : "items-end"} gap-1 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto"}`}>
      <div className={`rounded-3xl px-4 py-3 text-sm font-semibold leading-relaxed shadow-sm ${
        isBot
          ? "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200/50"
          : "bg-[#145A3B] text-white rounded-tr-none"
      } whitespace-pre-line`}>
        {message.text}
      </div>
      <span className="text-[10px] text-gray-400 font-bold px-1">{time}</span>
    </div>
  );
}
