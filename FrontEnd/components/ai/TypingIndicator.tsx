"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-3 mr-auto border border-gray-200/50 max-w-[80px]">
      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: "0ms" }} />
      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: "150ms" }} />
      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce shrink-0" style={{ animationDelay: "300ms" }} />
    </div>
  );
}
