"use client";

import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface UserHeaderProps {
    title?: string;
    description?: string;
    buttonText?: string;
    addUrl?: string;
}

export default function UserHeader({
    title = "Users",
    description = "Kelola seluruh pengguna marketplace.",
    buttonText = "Add User",
    addUrl = "/dashboard/admin/users/create",
}: UserHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">
                    {title}
                </h1>
                <p className="text-gray-500 mt-3">
                    {description}
                </p>
            </div>
            <Link
                href={addUrl}
                className="inline-flex items-center gap-3 bg-[#145A3B] hover:bg-[#0F472E] text-white px-6 py-4 rounded-2xl font-semibold transition"
            >
                <FaPlus />
                {buttonText}
            </Link>
        </div>
    );
}
