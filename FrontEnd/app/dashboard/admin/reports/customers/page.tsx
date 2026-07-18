"use client";

import { useState, useEffect } from "react";
import ReportHeader from "@/components/dashboard/reports/ReportHeader";
import ReportFilter from "@/components/dashboard/reports/ReportFilter";
import SummaryCard from "@/components/dashboard/reports/SummaryCard";
import ExportButton from "@/components/dashboard/reports/ExportButton";
import CustomerReportTable from "@/components/dashboard/reports/CustomerReportTable";
import { getSummary, getCustomerReport } from "@/services/reportService";
import { User } from "@/services/userService";

interface ExtendedCustomer extends User {
    ordersCount: number;
    totalSpent: number;
    lastOrderDate: string;
}

export default function CustomerReportPage() {
    const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalCustomers: 0 });
    const [customers, setCustomers] = useState<ExtendedCustomer[]>([]);
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
            const custs = await getCustomerReport(dateRange, status, startDate, endDate);
            setCustomers(custs);
            setLoading(false);
        };
        loadData();
    }, [dateRange, status, startDate, endDate]);

    const filteredCustomers = customers.filter((c) =>
        (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.email || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <ReportHeader
                    title="Customer Report"
                    description="Laporan rincian aktivitas belanja pelanggan, nominal spending, serta tanggal transaksi terakhir."
                    showBack
                    showExport
                />
                <ExportButton reportType="Customer Report" />
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
                    <p className="text-gray-500 mt-4 font-semibold">Loading customers report...</p>
                </div>
            ) : (
                <CustomerReportTable customers={filteredCustomers} />
            )}
        </div>
    );
}
