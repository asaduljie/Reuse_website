"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/roleGuard";
import { can } from "../lib/permissions";

export function usePermission() {
  const [user, setUser] = useState<{ id: number; role: string; name: string } | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) setUser(u);

    // Listen to storage changes to keep permissions updated in case roles change
    const handleStorage = () => {
      setUser(getCurrentUser());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const canCheck = (permission: string) => {
    return can(permission, user?.role);
  };

  const hasRole = (roleName: string) => {
    return user?.role === roleName;
  };

  return {
    user,
    can: canCheck,
    hasRole,
    role: user?.role || "",
  };
}
