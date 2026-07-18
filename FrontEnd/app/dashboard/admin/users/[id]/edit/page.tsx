"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import UserHeader from "@/components/dashboard/users/UserHeader";
import UserForm, { UserFormData } from "@/components/dashboard/users/UserForm";
import { getUser, updateUser } from "@/services/userService";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function EditUserPage({ params }: Props) {
    const router = useRouter();
    const resolvedParams = use(params);
    const user = getUser(Number(resolvedParams.id));

    if (!user) {
        return (
            <div className="bg-white rounded-[30px] shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-700">User Not Found</h2>
                <p className="text-gray-500 mt-2">Pengguna yang ingin Anda edit tidak ditemukan.</p>
            </div>
        );
    }

    function handleUpdate(data: UserFormData) {
        updateUser(user!.id, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            avatar: data.avatar,
            role: data.role,
            status: data.status as any,
        });

        router.push("/dashboard/admin/users");
    }

    return (
        <>
            <UserHeader
                title="Edit User"
                description="Perbarui informasi pengguna."
                buttonText="Back"
                addUrl="/dashboard/admin/users"
            />
            <UserForm
                initialData={{
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    avatar: user.avatar,
                    role: user.role,
                    status: (user.status === "banned" ? "blocked" : user.status) as any,
                }}
                onSubmit={handleUpdate}
                submitLabel="Update User"
            />
        </>
    );
}
