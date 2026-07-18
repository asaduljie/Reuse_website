"use client";

import { FaDollarSign, FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";

interface Props {
    revenue: number;
    ordersCount: number;
    productsCount: number;
    customersCount: number;
}

export default function SummaryCard({
    revenue,
    ordersCount,
    productsCount,
    customersCount,
}: Props) {
    const stats = [
        {
            title: "Total Revenue",
            value: `Rp ${revenue.toLocaleString("id-ID")}`,
            icon: <FaDollarSign />,
            color: "bg-emerald-50 text-[#145A3B] border-emerald-100",
        },
        {
            title: "Total Orders",
            value: `${ordersCount} Orders`,
            icon: <FaShoppingCart />,
            color: "bg-blue-50 text-blue-600 border-blue-100",
        },
        {
            title: "Total Products",
            value: `${productsCount} Products`,
            icon: <FaBox />,
            color: "bg-yellow-50 text-yellow-600 border-yellow-100",
        },
        {
            title: "Total Customers",
            value: `${customersCount} Customers`,
            icon: <FaUsers />,
            color: "bg-purple-50 text-purple-600 border-purple-100",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="border rounded-3xl p-6 bg-white flex items-center justify-between shadow-sm border-gray-100"
                >
                    <div>
                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                            {stat.title}
                        </span>
                        <span className="text-xl font-bold text-gray-800 mt-2 block truncate max-w-[180px]" title={stat.value}>
                            {stat.value}
                        </span>
                    </div>
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg shrink-0 ${stat.color} border`}>
                        {stat.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}
