"use client";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = "📭",
  title = "Tidak Ada Data",
  description = "Belum ada data yang dapat ditampilkan saat ini.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
      <div className="text-5xl mb-5">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-500 mt-2 text-sm font-semibold max-w-sm mx-auto">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-sm transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
