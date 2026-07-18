"use client";

import { SalesReportEntry } from "../../../services/reportService";

interface Props {
    entries: SalesReportEntry[];
}

export default function SalesReportTable({ entries }: Props) {
    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                        <tr>
                            <th className="px-6 py-4">Tanggal</th>
                            <th className="px-6 py-4 text-center">Total Order</th>
                            <th className="px-6 py-4 text-center">Revenue (Completed)</th>
                            <th className="px-6 py-4 text-center">Completed Orders</th>
                            <th className="px-6 py-4 text-center">Cancelled Orders</th>
                            <th className="px-6 py-4 text-center">Avg Order Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                        {entries.map((entry, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-5 font-semibold text-gray-800 text-sm">
                                    {formatDate(entry.date)}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {entry.totalOrders}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-bold text-gray-900">
                                    Rp {entry.revenue.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-5 text-center text-sm text-green-700 font-semibold">
                                    {entry.completedCount}
                                </td>
                                <td className="px-6 py-5 text-center text-sm text-red-600 font-semibold">
                                    {entry.cancelledCount}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    Rp {Math.round(entry.avgOrderValue).toLocaleString("id-ID")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
