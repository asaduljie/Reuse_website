"use client";

import { FaSearch } from "react-icons/fa";

interface SellerFilterProps {
    search: string;
    verifiedFilter: string;
    statusFilter: string;
    sortBy: string;
    onSearchChange: (val: string) => void;
    onVerifiedFilterChange: (val: string) => void;
    onStatusFilterChange: (val: string) => void;
    onSortByChange: (val: string) => void;
}

export default function SellerFilter({
    search,
    verifiedFilter,
    statusFilter,
    sortBy,
    onSearchChange,
    onVerifiedFilterChange,
    onStatusFilterChange,
    onSortByChange,
}: SellerFilterProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search store, owner, city, email..."
                        className="w-full border rounded-2xl py-3 pl-12 pr-4 border-gray-200 focus:outline-none focus:border-[#145A3B] transition"
                    />
                </div>

                <select
                    value={verifiedFilter}
                    onChange={(e) => onVerifiedFilterChange(e.target.value)}
                    className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-gray-700"
                >
                    <option value="all">All Verification</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Not Verified</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value)}
                    className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-gray-700"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value)}
                    className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-gray-700"
                >
                    <option value="newest">Newest Joined</option>
                    <option value="oldest">Oldest Joined</option>
                    <option value="revenue">Highest Revenue</option>
                    <option value="products">Most Products</option>
                    <option value="rating">Highest Rating</option>
                </select>
            </div>
        </div>
    );
}
