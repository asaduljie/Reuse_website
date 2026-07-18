"use client";

import { useState, useEffect } from "react";
import ReportHeader from "@/components/dashboard/reports/ReportHeader";
import ReportFilter from "@/components/dashboard/reports/ReportFilter";
import SummaryCard from "@/components/dashboard/reports/SummaryCard";
import ExportButton from "@/components/dashboard/reports/ExportButton";
import ProductReportTable from "@/components/dashboard/reports/ProductReportTable";
import { getSummary, getProductReport } from "@/services/reportService";
import { Product } from "@/services/productService";

interface ExtendedProduct extends Product {
    categoryName: string;
    sellerName: string;
    revenue: number;
}

export default function ProductReportPage() {
    const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalCustomers: 0 });
    const [products, setProducts] = useState<ExtendedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sellerId, setSellerId] = useState(0);
    const [status, setStatus] = useState("all");

    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const sum = await getSummary();
            setSummary(sum);
            const prods = await getProductReport(dateRange, sellerId, status, startDate, endDate);
            setProducts(prods);
            setLoading(false);
        };
        loadData();
    }, [dateRange, sellerId, status, startDate, endDate]);

    const filteredProducts = products.filter((p) =>
        (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (p.categoryName || "").toLowerCase().includes(search.toLowerCase()) ||
        (p.sellerName || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <ReportHeader
                    title="Product Report"
                    description="Laporan katalog produk marketplace, data stok inventori, barang terjual, serta status."
                    showBack
                    showExport
                />
                <ExportButton reportType="Product Report" />
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
                    <p className="text-gray-500 mt-4 font-semibold">Loading products report...</p>
                </div>
            ) : (
                <ProductReportTable products={filteredProducts} />
            )}
        </div>
    );
}
