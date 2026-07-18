export interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const CHAT_KEY = "reuse_chat_history";

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, sender: "bot", text: "Halo! Saya Asisten AI ReUse. Ada yang bisa saya bantu terkait belanja barang bekas ramah lingkungan hari ini?", timestamp: new Date().toISOString() },
];

export function getChatMessages(): ChatMessage[] {
  if (typeof window === "undefined") return INITIAL_MESSAGES;
  const raw = localStorage.getItem(CHAT_KEY);
  if (!raw) {
    localStorage.setItem(CHAT_KEY, JSON.stringify(INITIAL_MESSAGES));
    return INITIAL_MESSAGES;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_MESSAGES;
  }
}

export function saveChatMessages(messages: ChatMessage[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  }
}

export function addChatMessage(sender: "user" | "bot", text: string): ChatMessage {
  const messages = getChatMessages();
  const newMsg: ChatMessage = {
    id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
    sender,
    text,
    timestamp: new Date().toISOString(),
  };
  messages.push(newMsg);
  saveChatMessages(messages);
  return newMsg;
}

export function clearChatHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(CHAT_KEY, JSON.stringify(INITIAL_MESSAGES));
  }
}
