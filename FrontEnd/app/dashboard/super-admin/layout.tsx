"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/dashboard/sidebar";
import Topbar from "../../../components/dashboard/topbar";
import { getCurrentUser } from "../../../utils/roleGuard";
import { refreshAuthUser } from "../../../utils/auth";

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const storedUser = getCurrentUser();
    if (storedUser) setUser(storedUser);

    let isMounted = true;
    const syncUser = async () => {
      const refreshedUser = await refreshAuthUser();
      if (!isMounted) return;
      if (refreshedUser) setUser(refreshedUser);
      if (refreshedUser && refreshedUser.role !== "super_admin") {
        router.replace("/403");
      }
    };
    syncUser();
    return () => { isMounted = false; };
  }, [router]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F8FA]">
      <Sidebar
        role="super_admin"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 lg:ml-72 p-4 sm:p-8 transition-all duration-300">
        <Topbar
          title="Super Admin"
          userName={isHydrated && user?.name ? user.name : "Super Admin"}
          role="Super Admin"
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="mt-6 sm:mt-8">{children}</div>
      </main>
    </div>
  );
}
