"use client";

import { useEffect, useState } from "react";
import { getRecentOrders } from "../../services/dashboard/dashboardService";
import type { Order } from "../../services/orderService";

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadRecentOrders = async () => {
      const data = await getRecentOrders();
      setOrders(data);
    };
    loadRecentOrders();
  }, []);

  return (
    <div className="bg-white rounded-[30px] shadow-sm p-8 h-[380px]">
      <h2 className="text-2xl font-bold">Recent Orders</h2>

      <div className="mt-6 space-y-4">
        {orders.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada pesanan.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h3 className="font-semibold">{order.customerName}</h3>
                <p className="text-sm text-gray-500">#{order.id}</p>
              </div>

              <div className="text-right">
                <p>Rp {order.total.toLocaleString("id-ID")}</p>
                <span className="text-xs text-green-700">{order.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}