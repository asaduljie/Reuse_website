"use client";

import { useState, useEffect } from "react";
import ReportHeader from "@/components/dashboard/reports/ReportHeader";
import ReportFilter from "@/components/dashboard/reports/ReportFilter";
import SummaryCard from "@/components/dashboard/reports/SummaryCard";
import ExportButton from "@/components/dashboard/reports/ExportButton";
import SalesReportTable from "@/components/dashboard/reports/SalesReportTable";
import { getSummary, getSalesReport, SalesReportEntry } from "@/services/reportService";

export default function SalesReportPage() {
    const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalCustomers: 0 });
    const [salesData, setSalesData] = useState<SalesReportEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sellerId, setSellerId] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const sum = await getSummary();
            setSummary(sum);
            const sales = await getSalesReport(dateRange, sellerId, startDate, endDate);
            setSalesData(sales);
            setLoading(false);
        };
        loadData();
    }, [dateRange, sellerId, startDate, endDate]);

    const filteredSales = salesData.filter((entry) =>
        entry.date.includes(search)
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <ReportHeader
                    title="Sales Report"
                    description="Laporan rincian omzet harian, jumlah transaksi dan pesanan."
                    showBack
                    showExport
                />
                <ExportButton reportType="Sales Report" />
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
                sellerId={sellerId}
                onSellerIdChange={setSellerId}
                status="all"
                onStatusChange={() => {}}
                showStatusFilter={false}
            />

            {loading ? (
                <div className="text-center py-20 bg-white rounded-[30px] border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto"></div>
                    <p className="text-gray-500 mt-4 font-semibold">Loading sales report...</p>
                </div>
            ) : (
                <SalesReportTable entries={filteredSales} />
            )}
        </div>
    );
}
