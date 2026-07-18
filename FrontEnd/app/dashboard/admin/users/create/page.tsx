"use client";

import { useRouter } from "next/navigation";
import UserHeader from "@/components/dashboard/users/UserHeader";
import UserForm, { UserFormData } from "@/components/dashboard/users/UserForm";
import { addUser, getUsers } from "@/services/userService";

export default function CreateUserPage() {
    const router = useRouter();

    function handleCreate(data: UserFormData) {
        const allUsers = getUsers();
        const newId = allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1;

        addUser({
            id: newId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            avatar: data.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(data.name) + "&background=145A3B&color=fff",
            role: data.role,
            status: data.status as any,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        router.push("/dashboard/admin/users");
    }

    return (
        <>
            <UserHeader
                title="Create User"
                description="Tambah pengguna baru ke sistem."
                buttonText="Back"
                addUrl="/dashboard/admin/users"
            />
            <UserForm onSubmit={handleCreate} submitLabel="Create User" />
        </>
    );
}
