"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import StatusBadge from "@/components/dashboard/common/statusBadge";
import OrderStatusForm from "@/components/dashboard/orders/OrderStatusForm";
import Invoice from "@/components/dashboard/orders/Invoice";
import { getOrderById, updateOrderStatus, Order } from "@/services/orderService";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function OrderDetailPage({
    params,
}: Props) {
    const { id } = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            const data = await getOrderById(Number(id));
            setOrder(data || null);
            setLoading(false);
        };
        loadOrder();
    }, [id]);

    const handleStatus = async (status: string) => {
        if (!order) return;
        const success = await updateOrderStatus(order.id, status as any);
        if (success) {
            setOrder({
                ...order,
                status: status as any
            });
        } else {
            alert("Gagal memperbarui status pesanan.");
        }
    };

    function printInvoice() {
        window.print();
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#145A3B]"></div>
            </div>
        );
    }

    if (!order) {
        notFound();
    }

    const cleanPhone = order.phone.replace(/[^0-9]/g, "");
    const waPhone = cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone;

    return (
        <div className="space-y-8 print:p-0 print:m-0">
            {/* Header - hidden during print */}
            <div className="flex items-center justify-between flex-wrap gap-4 print:hidden">
                <div>
                    <h1 className="text-3xl font-bold">
                        Order #{order.id}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Detail pesanan pelanggan
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={printInvoice}
                        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition cursor-pointer"
                    >
                        Print Invoice
                    </button>
                    <a
                        href={`https://wa.me/${waPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
                    >
                        Chat WhatsApp
                    </a>
                    <Link
                        href="/dashboard/admin/orders"
                        className="px-5 py-3 rounded-xl border hover:bg-gray-50 transition"
                    >
                        Back
                    </Link>
                </div>
            </div>

            {/* Customer & Order summary card - hidden during print */}
            <div className="bg-white rounded-3xl shadow-sm p-8 print:hidden">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="font-bold mb-4 text-lg text-gray-800">
                            Customer
                        </h2>
                        <div className="space-y-1 text-gray-600">
                            <p className="font-semibold text-gray-900">{order.customerName}</p>
                            <p>{order.phone}</p>
                            <p>{order.address}</p>
                            {order.note && (
                                <p className="mt-2 text-sm italic bg-gray-50 p-3 rounded-xl">
                                    Catatan: {order.note}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold mb-4 text-lg text-gray-800">
                            Order Information
                        </h2>
                        <div className="space-y-2 text-gray-600 mb-4">
                            <p>
                                <span className="font-medium text-gray-900">Date:</span> {order.date}
                            </p>
                            <p>
                                <span className="font-medium text-gray-900">Total Items:</span> {order.totalItem}
                            </p>
                            <p>
                                <span className="font-medium text-gray-900">Total Price:</span> Rp {order.total.toLocaleString("id-ID")}
                            </p>
                        </div>
                        <StatusBadge
                            status={order.status}
                        />
                    </div>
                </div>
            </div>

            {/* Status form - hidden during print */}
            <div className="print:hidden">
                <OrderStatusForm
                    currentStatus={order.status}
                    onSave={handleStatus}
                />
            </div>

            {/* Printable Invoice */}
            <div className="print:block">
                <Invoice
                    orderNumber={order.id}
                    customer={order.customerName}
                    phone={order.phone}
                    address={order.address}
                    date={order.date}
                    items={order.items.map(item => ({
                        id: item.id,
                        name: item.name,
                        quantity: item.qty || (item as any).quantity || 1,
                        price: item.price
                    }))}
                    total={order.total}
                />
            </div>

            {/* Product list details - hidden during print because they are in the invoice */}
            <div className="bg-white rounded-3xl shadow-sm p-8 print:hidden">
                <h2 className="font-bold text-xl mb-6 text-gray-800">
                    Ordered Products
                </h2>
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-gray-500">
                            <th className="text-left py-3">
                                Product
                            </th>
                            <th className="text-center py-3">
                                Qty
                            </th>
                            <th className="text-right py-3 pr-4">
                                Price
                            </th>
                            <th className="text-right py-3 pr-4">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.items.map(
                                item => {
                                    const itemQty = item.qty || (item as any).quantity || 1;
                                    return (
                                        <tr
                                            key={item.id}
                                            className="border-b text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            <td className="py-4 font-medium">
                                                {item.name}
                                            </td>
                                            <td className="text-center py-4">
                                                {itemQty}
                                            </td>
                                            <td className="text-right py-4 pr-4">
                                                Rp {item.price.toLocaleString("id-ID")}
                                            </td>
                                            <td className="text-right py-4 pr-4 font-semibold text-gray-900">
                                                Rp {(item.price * itemQty).toLocaleString("id-ID")}
                                            </td>
                                        </tr>
                                    );
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
