"use client";

import { User } from "../../../services/userService";
import StatusBadge from "../common/statusBadge";

interface Props {
    customers: (User & { ordersCount: number; totalSpent: number; lastOrderDate: string })[];
}

export default function CustomerReportTable({ customers }: Props) {
    const formatDate = (dateStr: string) => {
        if (dateStr === "-") return "-";
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
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
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4 text-center">Orders</th>
                            <th className="px-6 py-4 text-center">Total Spending</th>
                            <th className="px-6 py-4 text-center">Last Order Date</th>
                            <th className="px-6 py-4 text-center">Account Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50 border relative shrink-0">
                                            {customer.avatar ? (
                                                <img
                                                    src={customer.avatar}
                                                    alt={customer.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            customer.name
                                                        )}&background=145A3B&color=fff&size=40`;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#145A3B] text-white flex items-center justify-center font-bold">
                                                    {customer.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-gray-800">{customer.name}</h4>
                                            <p className="text-xs text-gray-400">{customer.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {customer.ordersCount} Orders
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-bold text-gray-800">
                                    Rp {customer.totalSpent.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-5 text-center text-sm text-gray-500 font-medium">
                                    {formatDate(customer.lastOrderDate)}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <StatusBadge status={customer.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
