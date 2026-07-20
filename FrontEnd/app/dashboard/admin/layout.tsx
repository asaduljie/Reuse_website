"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../../components/dashboard/sidebar";
import Topbar from "../../../components/dashboard/topbar";

import { getCurrentUser } from "../../../utils/roleGuard";
import { refreshAuthUser } from "../../../utils/auth";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: LayoutProps) {

  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }

    let isMounted = true;

    const syncUser = async () => {
      const refreshedUser = await refreshAuthUser();

      if (!isMounted) return;

      if (refreshedUser) {
        setUser(refreshedUser);
      } else {
        router.replace("/login");
        return;
      }

      const { can } = require("../../../lib/permissions");
      if (refreshedUser && !can("dashboard.view", refreshedUser.role)) {
        router.replace("/403");
      }
    };

    syncUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (

    <div
      className="
      flex
      flex-col
      lg:flex-row
      min-h-screen
      bg-[#F7F8FA]
      "
    >

      <Sidebar
        role="admin"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main
        className="
        flex-1
        lg:ml-72
        p-4 sm:p-8
        transition-all
        duration-300
        "
      >

        <Topbar

          title="Dashboard"

          userName={isHydrated && user?.name ? user.name : "Administrator"}

          role="Admin"

          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}

        />

        <div className="mt-6 sm:mt-8">

          {children}

        </div>

      </main>

    </div>

  );

}