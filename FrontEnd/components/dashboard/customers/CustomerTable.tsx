"use client";

import Link from "next/link";
import { FaEye } from "react-icons/fa";
import StatusBadge from "../common/statusBadge";
import { User } from "../../../services/userService";

export interface CustomerWithStats extends User {
    totalOrders: number;
    totalSpent: number;
}

interface Props {
    customers: CustomerWithStats[];
}

export default function CustomerTable({ customers }: Props) {
    return (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#145A3B] text-white">
                        <tr>
                            <th className="px-6 py-5 font-semibold text-sm">Customer</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Phone</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Total Orders</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Total Spent</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Status</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-50 relative shrink-0 border">
                                            {customer.avatar ? (
                                                <img
                                                    src={customer.avatar}
                                                    alt={customer.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            customer.name
                                                        )}&background=145A3B&color=fff&size=48`;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#145A3B] text-white flex items-center justify-center font-bold">
                                                    {customer.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-sm">
                                                {customer.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-0.5">{customer.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-medium">
                                    {customer.phone || "-"}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {customer.totalOrders} Orders
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold text-gray-800">
                                    Rp {customer.totalSpent.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <StatusBadge status={customer.status} />
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex justify-center">
                                        <Link
                                            href={`/dashboard/admin/customers/${customer.id}`}
                                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                                            title="View Customer Details"
                                        >
                                            <FaEye />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
