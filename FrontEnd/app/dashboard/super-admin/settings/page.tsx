"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuperAdminSettingsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/admin/settings");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64 bg-white rounded-3xl border border-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto" />
        <p className="text-gray-500 mt-4 font-semibold text-sm">Mengarahkan ke Pengaturan Sistem Utama...</p>
      </div>
    </div>
  );
}
