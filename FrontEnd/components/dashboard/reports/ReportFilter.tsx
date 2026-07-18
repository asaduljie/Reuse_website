"use client";

import { useEffect, useState } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { getSellerProfiles, SellerProfile } from "../../../services/sellerService";

interface StatusOption {
    label: string;
    value: string;
}

interface Props {
    search: string;
    onSearchChange: (val: string) => void;
    dateRange: string;
    onDateRangeChange: (val: string) => void;
    startDate: string;
    onStartDateChange: (val: string) => void;
    endDate: string;
    onEndDateChange: (val: string) => void;
    sellerId: number;
    onSellerIdChange: (val: number) => void;
    status: string;
    onStatusChange: (val: string) => void;
    statusOptions?: StatusOption[];
    showSellerFilter?: boolean;
    showStatusFilter?: boolean;
}

export default function ReportFilter({
    search,
    onSearchChange,
    dateRange,
    onDateRangeChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
    sellerId,
    onSellerIdChange,
    status,
    onStatusChange,
    statusOptions = [],
    showSellerFilter = true,
    showStatusFilter = true,
}: Props) {
    const [sellers, setSellers] = useState<SellerProfile[]>([]);

    useEffect(() => {
        setSellers(getSellerProfiles());
    }, []);

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 space-y-5 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search report details..."
                        className="w-full border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700"
                    />
                </div>

                {/* Date Range Select */}
                <select
                    value={dateRange}
                    onChange={(e) => onDateRangeChange(e.target.value)}
                    className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700"
                >
                    <option value="all">Semua Waktu</option>
                    <option value="today">Hari Ini</option>
                    <option value="7days">7 Hari Terakhir</option>
                    <option value="30days">30 Hari Terakhir</option>
                    <option value="thismonth">Bulan Ini</option>
                    <option value="thisyear">Tahun Ini</option>
                    <option value="custom">Custom Range</option>
                </select>

                {/* Seller Filter */}
                {showSellerFilter && (
                    <select
                        value={sellerId}
                        onChange={(e) => onSellerIdChange(Number(e.target.value))}
                        className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700"
                    >
                        <option value={0}>Semua Seller</option>
                        {sellers.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.storeName}
                            </option>
                        ))}
                    </select>
                )}

                {/* Status Filter */}
                {showStatusFilter && (
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="border border-gray-200 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700 font-medium"
                    >
                        <option value="all">Semua Status</option>
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Custom Date Fields */}
            {dateRange === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-dashed">
                    <div>
                        <label className="text-xs font-semibold text-gray-400 block mb-1.5 uppercase tracking-wider">Start Date</label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => onStartDateChange(e.target.value)}
                                className="w-full border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-400 block mb-1.5 uppercase tracking-wider">End Date</label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => onEndDateChange(e.target.value)}
                                className="w-full border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#145A3B] transition text-sm text-gray-700"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
