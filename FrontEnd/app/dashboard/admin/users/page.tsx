"use client";

import { useMemo, useState } from "react";
import UserHeader from "@/components/dashboard/users/UserHeader";
import UserFilter from "@/components/dashboard/users/UserFilter";
import UserTable from "@/components/dashboard/users/UserTable";
import Pagination from "@/components/dashboard/common/Pagination";
import ConfirmDeleteModal from "@/components/dashboard/common/confirmdeleteModal";
import EmptyState from "@/components/dashboard/common/EmptyState";
import { getUsers, deleteUser } from "@/services/userService";

export default function UsersPage() {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const perPage = 10;
    const allUsers = getUsers();

    const filteredUsers = useMemo(() => {
        let result = [...allUsers];

        if (search) {
            const query = search.toLowerCase();
            result = result.filter(
                (user) =>
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    (user.phone && user.phone.includes(query))
            );
        }

        if (role) {
            result = result.filter((user) => user.role === role);
        }

        if (status) {
            result = result.filter((user) => user.status === status);
        }

        return result;
    }, [allUsers, search, role, status]);

    const totalPages = Math.ceil(filteredUsers.length / perPage);
    const currentUsers = filteredUsers.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    function handleDelete(id: number) {
        setSelectedId(id);
        setDeleteOpen(true);
    }

    function confirmDelete() {
        if (selectedId === null) return;
        deleteUser(selectedId);
        setDeleteOpen(false);
        setSelectedId(null);
        // Refresh list
        window.location.reload();
    }

    return (
        <div className="space-y-8">
            <UserHeader />
            <UserFilter
                search={search}
                onSearchChange={(val) => {
                    setSearch(val);
                    setCurrentPage(1);
                }}
                role={role}
                onRoleChange={(val) => {
                    setRole(val);
                    setCurrentPage(1);
                }}
                status={status}
                onStatusChange={(val) => {
                    setStatus(val);
                    setCurrentPage(1);
                }}
            />

            {filteredUsers.length === 0 ? (
                <EmptyState
                    title="No Users Found"
                    description="Coba ubah kata kunci pencarian atau filter Anda."
                />
            ) : (
                <>
                    <UserTable users={currentUsers} onDelete={handleDelete} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}

            <ConfirmDeleteModal
                open={deleteOpen}
                title="Delete User"
                message="Are you sure you want to permanently delete this user? This action cannot be undone."
                onClose={() => {
                    setDeleteOpen(false);
                    setSelectedId(null);
                }}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
