"use client";

export default function NotificationEmpty() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
      <div className="text-6xl mb-5">🔔</div>
      <h3 className="text-xl font-bold text-gray-800">Semua Bersih!</h3>
      <p className="text-gray-500 mt-2 text-sm font-semibold max-w-xs mx-auto">
        Tidak ada notifikasi yang tersisa. Anda sudah membaca dan membersihkan semuanya.
      </p>
    </div>
  );
}
