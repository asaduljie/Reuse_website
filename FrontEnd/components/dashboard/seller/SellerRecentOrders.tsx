"use client";

import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const STATUS_STYLE: Record<string, string> = {
  "Pending": "bg-amber-100 text-amber-700",
  "Seller Confirmed": "bg-blue-100 text-blue-700",
  "Packing": "bg-violet-100 text-violet-700",
  "Ready to Pickup": "bg-cyan-100 text-cyan-700",
  "Completed": "bg-emerald-100 text-emerald-700",
  "Cancelled": "bg-red-100 text-red-700",
};

interface Props {
  orders: any[];
}

export default function SellerRecentOrders({ orders }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-extrabold text-gray-800">Order Terbaru</h3>
        <Link href="/dashboard/seller/orders" className="text-xs text-[#145A3B] hover:underline font-bold flex items-center gap-1">
          Lihat Semua <FaExternalLinkAlt className="text-[10px]" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-sm font-semibold">
          Belum ada pesanan masuk.
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {orders.map((order, i) => (
            <Link
              key={order.id || i}
              href={`/dashboard/seller/orders/${order.id}`}
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-sm font-black text-gray-500 shrink-0">
                #{i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{order.invoice || `INV-${order.id}`}</p>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">{order.customerName || "Pelanggan"}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-gray-800">Rp {(order.total || 0).toLocaleString("id-ID")}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[order.status] || "bg-gray-100 text-gray-600"}`}>
                  {order.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
