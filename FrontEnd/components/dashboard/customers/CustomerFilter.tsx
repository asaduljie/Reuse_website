"use client";

import { FaSearch } from "react-icons/fa";

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function CustomerFilter({ search, onSearchChange }: Props) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">
            <div className="relative max-w-md">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search customer by name, email, or phone..."
                    className="w-full border rounded-2xl py-3.5 pl-12 pr-4 border-gray-200 focus:outline-none focus:border-[#145A3B] transition"
                />
            </div>
        </div>
    );
}
