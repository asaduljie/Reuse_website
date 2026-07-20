"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/dashboard/sidebar";
import Topbar from "../../../components/dashboard/topbar";
import { getCurrentUser } from "../../../utils/roleGuard";
import { refreshAuthUser } from "../../../utils/auth";

export default function SellerLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const stored = getCurrentUser();
    if (stored) setUser(stored);

    let mounted = true;
    const sync = async () => {
      const refreshed = await refreshAuthUser();
      if (!mounted) return;
      if (refreshed) setUser(refreshed);
      // Allow seller and admin/super_admin to access seller dashboard
      if (refreshed && refreshed.role !== "seller" && refreshed.role !== "admin" && refreshed.role !== "super_admin") {
        router.replace("/");
      }
    };
    sync();
    return () => { mounted = false; };
  }, [router]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F8FA]">
      <Sidebar
        role="seller"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 lg:ml-72 p-4 sm:p-8 transition-all duration-300">
        <Topbar
          title="Seller Dashboard"
          userName={isHydrated && user?.name ? user.name : "Seller"}
          role="Seller"
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="mt-6 sm:mt-8">{children}</div>
      </main>
    </div>
  );
}
