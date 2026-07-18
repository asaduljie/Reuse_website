"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChartLine, FaShoppingCart, FaBox, FaStore, FaUsers, FaDownload, FaClock, FaArrowRight } from "react-icons/fa";
import ReportHeader from "@/components/dashboard/reports/ReportHeader";
import SummaryCard from "@/components/dashboard/reports/SummaryCard";
import { getSummary, getExportHistory, ExportHistoryEntry } from "@/services/reportService";

export default function ReportsHubPage() {
    const [summary, setSummary] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalCustomers: 0,
    });
    const [exports, setExports] = useState<ExportHistoryEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHubData = async () => {
            setLoading(true);
            const sum = await getSummary();
            setSummary(sum);
            setExports(getExportHistory());
            setLoading(false);
        };
        loadHubData();
    }, []);

    const categories = [
        {
            title: "Sales Report",
            description: "Analisis grafik penjualan harian, total order, revenue, serta average order value.",
            href: "/dashboard/admin/reports/sales",
            icon: <FaChartLine />,
            color: "bg-emerald-50 text-[#145A3B] border-emerald-100",
        },
        {
            title: "Order Report",
            description: "Daftar rincian transaksi penjualan, status pesanan, pembayaran, serta detail invoice.",
            href: "/dashboard/admin/reports/orders",
            icon: <FaShoppingCart />,
            color: "bg-blue-50 text-blue-600 border-blue-100",
        },
        {
            title: "Product Report",
            description: "Laporan produk terdaftar, stok inventori, jumlah terjual, status produk, serta revenue produk.",
            href: "/dashboard/admin/reports/products",
            icon: <FaBox />,
            color: "bg-yellow-50 text-yellow-600 border-yellow-100",
        },
        {
            title: "Seller Report",
            description: "Statistik toko seller mitra, jumlah produk, total penjualan, status verifikasi, dan rating toko.",
            href: "/dashboard/admin/reports/sellers",
            icon: <FaStore />,
            color: "bg-orange-50 text-orange-500 border-orange-100",
        },
        {
            title: "Customer Report",
            description: "Laporan aktivitas pelanggan, total belanja, jumlah pesanan, dan tanggal order terakhir.",
            href: "/dashboard/admin/reports/customers",
            icon: <FaUsers />,
            color: "bg-purple-50 text-purple-600 border-purple-100",
        },
    ];

    const formatDateTime = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="space-y-8">
            <ReportHeader
                title="Reports Hub"
                description="Analisis mendalam dan cetak laporan inventori, penjualan, serta data pengguna."
            />

            {loading ? (
                <div className="text-center py-20 bg-white rounded-[30px] border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto"></div>
                    <p className="text-gray-500 mt-4 font-semibold">Loading reports overview...</p>
                </div>
            ) : (
                <>
                    {/* Summary Cards */}
                    <SummaryCard
                        revenue={summary.totalRevenue}
                        ordersCount={summary.totalOrders}
                        productsCount={summary.totalProducts}
                        customersCount={summary.totalCustomers}
                    />

                    {/* Report Category Grid */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            Pilih Kategori Laporan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((cat, idx) => (
                                <Link
                                    key={idx}
                                    href={cat.href}
                                    className="bg-white hover:bg-gray-50 rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between group transition duration-300"
                                >
                                    <div>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 shrink-0 border ${cat.color}`}>
                                            {cat.icon}
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#145A3B] transition">
                                            {cat.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-2.5 leading-relaxed">
                                            {cat.description}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#145A3B] uppercase tracking-wider">
                                        <span>Buka Laporan</span>
                                        <FaArrowRight className="transform group-hover:translate-x-1 transition duration-300" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Exports */}
                    <div className="bg-white rounded-[30px] shadow-sm p-8 border border-gray-100 space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2.5">
                            <FaClock className="text-[#145A3B]" />
                            Recent Export History
                        </h3>
                        <div className="border border-gray-100 rounded-2xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 font-semibold text-xs border-b">
                                        <th className="px-6 py-4">Report Type</th>
                                        <th className="px-6 py-4 text-center">Format</th>
                                        <th className="px-6 py-4 text-center">Export Date</th>
                                        <th className="px-6 py-4 text-center">Size</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y text-gray-700">
                                    {exports.map((exp) => (
                                        <tr key={exp.id} className="hover:bg-gray-50 transition text-sm">
                                            <td className="px-6 py-4 font-bold text-gray-800">
                                                {exp.reportType}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                                    exp.format === "PDF"
                                                        ? "bg-red-50 text-red-700 border-red-200"
                                                        : "bg-green-50 text-green-700 border-green-200"
                                                }`}>
                                                    {exp.format}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-xs text-gray-500">
                                                {formatDateTime(exp.date)}
                                            </td>
                                            <td className="px-6 py-4 text-center text-xs text-gray-500 font-medium">
                                                {exp.size}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="bg-green-100 text-green-700 text-[10px] px-2.5 py-1 rounded-full font-bold">
                                                    {exp.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => alert(`[Demo Mode] Downloading export package #${exp.id} in ${exp.format} format.`)}
                                                        className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center hover:bg-emerald-100 transition"
                                                        title="Download File"
                                                    >
                                                        <FaDownload className="text-xs" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
