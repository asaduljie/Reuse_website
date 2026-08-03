"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white rounded-3xl p-8 max-w-md shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            ⚠️
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Terjadi Kesalahan Sistem</h2>
          <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
            Tim teknis ReUse telah diberitahukan secara otomatis melalui Sentry.io. Silakan muat ulang halaman.
          </p>
          <button
            onClick={() => reset()}
            className="bg-[#145A3B] hover:bg-emerald-900 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition cursor-pointer shadow-sm"
          >
            Muat Ulang Halaman
          </button>
        </div>
      </body>
    </html>
  );
}
