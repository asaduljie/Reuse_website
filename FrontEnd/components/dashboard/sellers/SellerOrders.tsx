"use client";

import { Order } from "../../../services/orderService";
import StatusBadge from "../common/statusBadge";

interface Props {
    orders: Order[];
}

export default function SellerOrders({ orders }: Props) {
    const formatDate = (dateStr?: string) => {
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
        <div className="bg-white rounded-[30px] shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h3>
            {orders.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No orders found for this seller.</p>
            ) : (
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 font-semibold text-sm border-b">
                                <th className="px-6 py-4">Invoice & Customer</th>
                                <th className="px-6 py-4 text-center">Date</th>
                                <th className="px-6 py-4 text-center">Total</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-gray-700">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-semibold text-sm text-[#145A3B]">
                                                {order.invoice || `INV-${order.id}`}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5">
                                                {order.customerName} (ID: #{order.customerId})
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm">
                                        {formatDate(order.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-semibold">
                                        Rp {order.total.toLocaleString("id-ID")}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={order.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
