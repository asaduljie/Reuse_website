"use client";

import { useEffect, useState } from "react";
import { getUser } from "../../utils/auth";
import AccountMenu from "../../components/customer/AccountMenu";
import ProfileCard from "../../components/customer/ProfileCard";
import ProfileForm from "../../components/customer/ProfileForm";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = getUser();
    if (u) setUser(u);
    else {
      setUser({
        id: 4,
        name: "Amanda",
        email: "amanda@example.com",
        phone: "087700000004",
        createdAt: "2026-01-15T00:00:00.000Z",
      });
    }
  }, []);

  const handleSave = async (data: { name: string; email: string; phone: string }) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    await new Promise((r) => setTimeout(r, 600));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Akun Saya</p>
          <h1 className="text-3xl font-black text-gray-900 mt-1">Profil Saya</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar */}
          <div className="w-full lg:w-56 shrink-0">
            <AccountMenu />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-6">
            <ProfileCard user={user} />
            <ProfileForm
              initialData={{ name: user.name, email: user.email, phone: user.phone || "" }}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
