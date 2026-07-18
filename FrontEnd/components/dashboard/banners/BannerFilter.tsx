"use client";

import { FaSearch } from "react-icons/fa";

interface Props {
    search: string;
    onSearchChange: (val: string) => void;
    positionFilter: string;
    onPositionFilterChange: (val: string) => void;
    statusFilter: string;
    onStatusFilterChange: (val: string) => void;
    sortBy: string;
    onSortByChange: (val: string) => void;
}

export default function BannerFilter({
    search,
    onSearchChange,
    positionFilter,
    onPositionFilterChange,
    statusFilter,
    onStatusFilterChange,
    sortBy,
    onSortByChange,
}: Props) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Search */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search banner by title..."
                    className="w-full border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-medium"
                />
            </div>

            {/* Position Filter */}
            <select
                value={positionFilter}
                onChange={(e) => onPositionFilterChange(e.target.value)}
                className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
            >
                <option value="all">Semua Posisi</option>
                <option value="Hero">Hero Banner</option>
                <option value="Homepage Promo">Homepage Promo</option>
                <option value="Flash Sale">Flash Sale</option>
                <option value="Category Banner">Category Banner</option>
                <option value="Footer Banner">Footer Banner</option>
            </select>

            {/* Status Filter */}
            <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
            >
                <option value="all">Semua Status</option>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Expired">Expired</option>
                <option value="Hidden">Hidden</option>
            </select>

            {/* Sorting */}
            <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-semibold"
            >
                <option value="priority">Priority (Urutan)</option>
                <option value="position">Position (Posisi)</option>
                <option value="latest">Terbaru</option>
                <option value="oldest">Terlama</option>
            </select>
        </div>
    );
}
