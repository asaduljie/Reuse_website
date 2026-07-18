"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import CustomerDetail from "@/components/dashboard/customers/CustomerDetail";
import { getUser } from "@/services/userService";
import { getOrders, Order } from "@/services/orderService";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function CustomerDetailPage({ params }: Props) {
    const resolvedParams = use(params);
    const customerId = Number(resolvedParams.id);
    const customer = getUser(customerId);

    const [loading, setLoading] = useState(true);
    const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [lastOrderDate, setLastOrderDate] = useState("");

    useEffect(() => {
        if (!customer) return;

        const loadCustomerStats = async () => {
            setLoading(true);
            const orders = await getOrders();
            const filteredOrders = orders.filter((o) => o.customerId === customerId);
            setCustomerOrders(filteredOrders);

            const spent = filteredOrders
                .filter((o) => o.status === "Completed")
                .reduce((sum, o) => sum + o.total, 0);
            setTotalSpent(spent);

            if (filteredOrders.length > 0) {
                const sorted = [...filteredOrders].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setLastOrderDate(sorted[0].createdAt);
            }

            setLoading(false);
        };

        loadCustomerStats();
    }, [customerId, customer]);

    if (!customer) {
        return (
            <div className="bg-white rounded-[30px] shadow-sm p-8 text-center border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-700">Customer Profile Not Found</h2>
                <p className="text-gray-500 mt-2">Profil customer yang Anda cari tidak ditemukan.</p>
                <Link
                    href="/dashboard/admin/customers"
                    className="inline-flex items-center gap-2 mt-4 text-[#145A3B] hover:underline font-semibold"
                >
                    <FaArrowLeft /> Kembali ke Daftar
                </Link>
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <div className="text-center py-20 bg-white rounded-[30px] border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto"></div>
                    <p className="text-gray-500 mt-4 font-semibold">Loading customer details...</p>
                </div>
            ) : (
                <CustomerDetail
                    customer={customer}
                    orders={customerOrders}
                    totalSpent={totalSpent}
                    lastOrderDate={lastOrderDate}
                />
            )}
        </>
    );
}
