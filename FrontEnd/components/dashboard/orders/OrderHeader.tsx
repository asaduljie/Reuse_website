"use client";

import { FaSyncAlt } from "react-icons/fa";

interface OrderHeaderProps {

    title?: string;

    description?: string;

    totalOrders?: number;

    onRefresh?: () => void;

}

export default function OrderHeader({

    title = "Orders",

    description = "Manage customer orders.",

    totalOrders = 0,

    onRefresh,

}: OrderHeaderProps) {

    return (

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

            <div>

                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-4">

                    {title}

                    {totalOrders > 0 && (

                        <span className="text-sm font-medium bg-[#145A3B]/10 text-[#145A3B] px-4 py-1.5 rounded-full">

                            Total: {totalOrders}

                        </span>

                    )}

                </h1>

                <p className="mt-3 text-gray-500">

                    {description}

                </p>

            </div>

            {onRefresh && (

                <button

                    onClick={onRefresh}

                    className="inline-flex items-center gap-3 bg-[#145A3B] hover:bg-[#0F472E] text-white px-6 py-4 rounded-2xl font-semibold transition cursor-pointer"

                >

                    <FaSyncAlt />

                    Refresh

                </button>

            )}

        </div>

    );

}
