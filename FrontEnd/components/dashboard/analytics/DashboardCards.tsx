"use client";

import {
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaTags,
    FaMoneyBillWave,
} from "react-icons/fa";

interface Props {
    statistics: {
        totalRevenue: number;
        totalOrders: number;
        totalProducts: number;
        totalCategories: number;
        totalCustomers: number;
    };
}

export default function DashboardCards({
    statistics,
}: Props) {
    const cards = [
        {
            title: "Revenue",
            value: `Rp ${statistics.totalRevenue.toLocaleString("id-ID")}`,
            icon: <FaMoneyBillWave />,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Orders",
            value: statistics.totalOrders,
            icon: <FaShoppingCart />,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Products",
            value: statistics.totalProducts,
            icon: <FaBox />,
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            title: "Customers",
            value: statistics.totalCustomers,
            icon: <FaUsers />,
            color: "bg-purple-100 text-purple-600",
        },
        {
            title: "Categories",
            value: statistics.totalCategories,
            icon: <FaTags />,
            color: "bg-red-100 text-red-600",
        },
    ];

    return (
        <div className="grid xl:grid-cols-5 md:grid-cols-2 gap-6">
            {
                cards.map(card => (
                    <div
                        key={card.title}
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-emerald-100/50 transition-all duration-300"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                                    {card.title}
                                </p>
                                <h2 className="text-2xl font-black text-gray-800 mt-2 truncate max-w-[140px]" title={String(card.value)}>
                                    {card.value}
                                </h2>
                            </div>
                            <div
                                className={`
                                w-12
                                h-12
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                text-xl
                                shrink-0
                                ${card.color}
                                `}
                            >
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
