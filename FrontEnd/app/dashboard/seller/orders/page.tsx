"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/utils/auth";
import { getSellerByUserId } from "@/services/sellerService";
import { getOrdersBySeller, Order } from "@/services/orderService";

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    const seller = user ? getSellerByUserId(Number(user.id)) : undefined;
    if (seller) {
      getOrdersBySeller(seller.id)
        .then(setOrders)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-800">Order Toko</h1>
      <div className="rounded-3xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
        {loading ? (
          <div className="py-10 text-center animate-pulse text-gray-400 font-semibold">
            Loading order data...
          </div>
        ) : orders.length ? (
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-extrabold text-sm sm:text-base text-gray-800">
                      {o.invoice}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${getStatusColor(
                        o.status
                      )}`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold">
                    Customer: <span className="text-gray-600">{o.customerName}</span>
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-400 font-semibold">Total Transaksi</p>
                  <p className="font-black text-sm sm:text-base text-[#145A3B] mt-0.5">
                    Rp {Number(o.total || 0).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-400 font-semibold">Belum ada order masuk.</p>
          </div>
        )}
      </div>
    </div>
  );
}
