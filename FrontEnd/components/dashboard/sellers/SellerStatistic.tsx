"use client";

import { FaBox, FaShoppingCart, FaDollarSign, FaStar, FaUsers, FaClock } from "react-icons/fa";

interface Props {
    productsCount: number;
    ordersCount: number;
    revenue: number;
    rating: number;
    followers?: number;
    responseTime?: string;
}

export default function SellerStatistic({
    productsCount,
    ordersCount,
    revenue,
    rating,
    followers = 250,
    responseTime = "15 Menit",
}: Props) {
    const stats = [
        {
            title: "Total Products",
            value: productsCount,
            icon: <FaBox />,
            color: "bg-emerald-50 text-[#145A3B] border-emerald-100",
        },
        {
            title: "Total Orders",
            value: ordersCount,
            icon: <FaShoppingCart />,
            color: "bg-blue-50 text-blue-600 border-blue-100",
        },
        {
            title: "Revenue (Completed)",
            value: `Rp ${revenue.toLocaleString("id-ID")}`,
            icon: <FaDollarSign />,
            color: "bg-yellow-50 text-yellow-600 border-yellow-100",
        },
        {
            title: "Average Rating",
            value: `${rating.toFixed(1)} / 5.0`,
            icon: <FaStar />,
            color: "bg-orange-50 text-orange-500 border-orange-100",
        },
        {
            title: "Followers",
            value: followers.toLocaleString("id-ID"),
            icon: <FaUsers />,
            color: "bg-purple-50 text-purple-600 border-purple-100",
        },
        {
            title: "Avg Response Time",
            value: responseTime,
            icon: <FaClock />,
            color: "bg-cyan-50 text-cyan-600 border-cyan-100",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className={`border rounded-3xl p-6 bg-white flex items-center justify-between shadow-sm border-gray-100`}
                >
                    <div>
                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                            {stat.title}
                        </span>
                        <span className="text-2xl font-bold text-gray-800 mt-2 block truncate max-w-[200px]" title={String(stat.value)}>
                            {stat.value}
                        </span>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${stat.color} border`}>
                        {stat.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}
