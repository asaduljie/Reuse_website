"use client";

import { use } from "react";
import UserDetail from "@/components/dashboard/users/UserDetail";
import { getUser } from "@/services/userService";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function UserDetailPage({ params }: Props) {
    const resolvedParams = use(params);
    const user = getUser(Number(resolvedParams.id));

    if (!user) {
        return (
            <div className="bg-white rounded-[30px] shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-700">User Not Found</h2>
                <p className="text-gray-500 mt-2">Pengguna yang Anda cari tidak ditemukan.</p>
            </div>
        );
    }

    return <UserDetail user={user} />;
}
