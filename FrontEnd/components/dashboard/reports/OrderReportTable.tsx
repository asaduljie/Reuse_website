"use client";

import { Order } from "../../../services/orderService";
import StatusBadge from "../common/statusBadge";

interface Props {
    orders: Order[];
}

export default function OrderReportTable({ orders }: Props) {
    const formatDate = (dateStr: string) => {
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
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                        <tr>
                            <th className="px-6 py-4">Invoice</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4 text-center">Items</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Payment</th>
                            <th className="px-6 py-4 text-center">Total</th>
                            <th className="px-6 py-4 text-center">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-5 font-bold text-[#145A3B] text-sm">
                                    {order.invoice || `INV-${order.id}`}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="text-sm font-semibold text-gray-800">{order.customerName}</div>
                                    <div className="text-xs text-gray-400">ID: #{order.customerId}</div>
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {order.totalItem} pcs
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <span className={`text-xs px-2.5 py-1.5 rounded-full font-bold border ${
                                        order.paymentStatus === "Paid"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                    }`}>
                                        {order.paymentMethod} ({order.paymentStatus})
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-bold text-gray-800">
                                    Rp {order.total.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-5 text-center text-sm text-gray-500 font-medium">
                                    {formatDate(order.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
