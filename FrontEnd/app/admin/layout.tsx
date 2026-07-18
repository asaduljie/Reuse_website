"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/dashboard/sidebar";
import Topbar from "../../components/dashboard/topbar";

import { getCurrentUser, type AuthUser } from "../../utils/roleGuard";
import { refreshAuthUser } from "../../utils/auth";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: LayoutProps) {

  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

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
      }

      if (refreshedUser?.role !== "admin" && refreshedUser?.role !== "super_admin") {
        router.replace("/");
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
      min-h-screen
      bg-[#F7F8FA]
      "
    >

      <Sidebar role="admin" />

      <main
        className="
        flex-1
        ml-72
        p-8
        "
      >

        <Topbar

          title="Dashboard"

          userName={isHydrated && user?.name ? user.name : "Administrator"}

          role="Admin"

        />

        <div className="mt-8">

          {children}

        </div>

      </main>

    </div>

  );

}