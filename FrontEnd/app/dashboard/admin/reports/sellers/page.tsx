"use client";

import { useState, useEffect } from "react";
import ReportHeader from "@/components/dashboard/reports/ReportHeader";
import ReportFilter from "@/components/dashboard/reports/ReportFilter";
import SummaryCard from "@/components/dashboard/reports/SummaryCard";
import ExportButton from "@/components/dashboard/reports/ExportButton";
import SellerReportTable from "@/components/dashboard/reports/SellerReportTable";
import { getSummary, getSellerReport } from "@/services/reportService";
import { SellerProfile } from "@/services/sellerService";

interface ExtendedSeller extends SellerProfile {
    productsCount: number;
    ordersCount: number;
    revenue: number;
    ownerName: string;
}

export default function SellerReportPage() {
    const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalCustomers: 0 });
    const [sellers, setSellers] = useState<ExtendedSeller[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("all");

    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Blocked", value: "blocked" },
    ];

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const sum = await getSummary();
            setSummary(sum);
            const sells = await getSellerReport(dateRange, status, startDate, endDate);
            setSellers(sells);
            setLoading(false);
        };
        loadData();
    }, [dateRange, status, startDate, endDate]);

    const filteredSellers = sellers.filter((s) =>
        (s.storeName || "").toLowerCase().includes(search.toLowerCase()) ||
        (s.ownerName || "").toLowerCase().includes(search.toLowerCase()) ||
        (s.city || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <ReportHeader
                    title="Seller Report"
                    description="Statistik performa toko mitra penjual marketplace, audit rating toko, verifikasi dan omzet."
                    showBack
                    showExport
                />
                <ExportButton reportType="Seller Report" />
            </div>

            <SummaryCard
                revenue={summary.totalRevenue}
                ordersCount={summary.totalOrders}
                productsCount={summary.totalProducts}
                customersCount={summary.totalCustomers}
            />

            <ReportFilter
                search={search}
                onSearchChange={setSearch}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                startDate={startDate}
                onStartDateChange={setStartDate}
                endDate={endDate}
                onEndDateChange={setEndDate}
                sellerId={0}
                onSellerIdChange={() => {}}
                showSellerFilter={false}
                status={status}
                onStatusChange={setStatus}
                statusOptions={statusOptions}
            />

            {loading ? (
                <div className="text-center py-20 bg-white rounded-[30px] border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto"></div>
                    <p className="text-gray-500 mt-4 font-semibold">Loading sellers report...</p>
                </div>
            ) : (
                <SellerReportTable sellers={filteredSellers} />
            )}
        </div>
    );
}
