"use client";

import { FaSearch } from "react-icons/fa";

interface UserFilterProps {
    search: string;
    role: string;
    status: string;
    onSearchChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}

export default function UserFilter({
    search,
    role,
    status,
    onSearchChange,
    onRoleChange,
    onStatusChange,
}: UserFilterProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">
            <div className="grid lg:grid-cols-3 gap-5">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        value={search}
                        onChange={(e)=>onSearchChange(e.target.value)}
                        placeholder="Search user..."
                        className="w-full border rounded-2xl py-3 pl-12 pr-4 border-gray-200 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>
                <select
                    value={role}
                    onChange={(e)=>onRoleChange(e.target.value)}
                    className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-gray-700"
                >
                    <option value="">
                        All Roles
                    </option>
                    <option value="super_admin">
                        Super Admin
                    </option>
                    <option value="admin">
                        Admin
                    </option>
                    <option value="seller">
                        Seller
                    </option>
                    <option value="customer">
                        Customer
                    </option>
                </select>
                <select
                    value={status}
                    onChange={(e)=>onStatusChange(e.target.value)}
                    className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-gray-700"
                >
                    <option value="">
                        All Status
                    </option>
                    <option value="active">
                        Active
                    </option>
                    <option value="inactive">
                        Inactive
                    </option>
                    <option value="blocked">
                        Blocked
                    </option>
                </select>
            </div>
        </div>
    );
}
