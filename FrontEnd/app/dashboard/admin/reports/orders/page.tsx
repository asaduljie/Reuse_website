"use client";

import { useState, useEffect } from "react";
import ReportHeader from "@/components/dashboard/reports/ReportHeader";
import ReportFilter from "@/components/dashboard/reports/ReportFilter";
import SummaryCard from "@/components/dashboard/reports/SummaryCard";
import ExportButton from "@/components/dashboard/reports/ExportButton";
import OrderReportTable from "@/components/dashboard/reports/OrderReportTable";
import { getSummary, getOrderReport } from "@/services/reportService";
import { Order } from "@/services/orderService";

export default function OrderReportPage() {
    const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalCustomers: 0 });
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sellerId, setSellerId] = useState(0);
    const [status, setStatus] = useState("all");

    const statusOptions = [
        { label: "Pending", value: "Pending" },
        { label: "Seller Confirmed", value: "Seller Confirmed" },
        { label: "Packing", value: "Packing" },
        { label: "Ready to Pickup", value: "Ready to Pickup" },
        { label: "Completed", value: "Completed" },
        { label: "Cancelled", value: "Cancelled" },
    ];

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const sum = await getSummary();
            setSummary(sum);
            const ords = await getOrderReport(dateRange, sellerId, status, startDate, endDate);
            setOrders(ords);
            setLoading(false);
        };
        loadData();
    }, [dateRange, sellerId, status, startDate, endDate]);

    const filteredOrders = orders.filter((o) =>
        (o.invoice || "").toLowerCase().includes(search.toLowerCase()) ||
        (o.customerName || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <ReportHeader
                    title="Order Report"
                    description="Rincian seluruh transaksi pesanan, metode pembayaran, serta invoice status."
                    showBack
                    showExport
                />
                <ExportButton reportType="Order Report" />
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
                status={status}
                onStatusChange={setStatus}
                statusOptions={statusOptions}
            />

            {loading ? (
                <div className="text-center py-20 bg-white rounded-[30px] border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto"></div>
                    <p className="text-gray-500 mt-4 font-semibold">Loading orders report...</p>
                </div>
            ) : (
                <OrderReportTable orders={filteredOrders} />
            )}
        </div>
    );
}
