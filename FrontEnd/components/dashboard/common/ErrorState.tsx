"use client";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Terjadi kesalahan saat memuat data.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-16 text-center">
      <div className="text-5xl mb-5">⚠️</div>
      <h3 className="text-xl font-bold text-gray-800">Terjadi Kesalahan</h3>
      <p className="text-gray-500 mt-2 text-sm font-semibold max-w-sm mx-auto">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-sm transition"
        >
          🔄 Coba Lagi
        </button>
      )}
    </div>
  );
}
