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
    <div className="flex min-h-screen bg-[#F7F8FA]">
      <Sidebar role="super_admin" />
      <main className="flex-1 ml-72 p-8">
        <Topbar
          title="Super Admin"
          userName={isHydrated && user?.name ? user.name : "Super Admin"}
          role="Super Admin"
        />
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
