"use client";

import { OrderItem } from "../../../services/orderService";

interface OrderProductListProps {
  items: OrderItem[];
}

export default function OrderProductList({ items }: OrderProductListProps) {
  // Format price helper
  const formatPrice = (price: number) => {
    return `Rp ${Number(price || 0).toLocaleString("id-ID")}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
      <h3 className="font-extrabold text-gray-800 text-lg border-b pb-3 mb-4">Daftar Produk Yang Dibeli</h3>
      
      <div className="divide-y divide-gray-50">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center justify-between">
            <div className="flex gap-4 items-center">
              <img
                src={item.image || "/images/products/placeholder.jpg"}
                alt={item.name}
                className="w-20 h-20 rounded-2xl object-cover border bg-gray-50 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] bg-emerald-50 text-[#145A3B] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider block w-fit mb-1.5">
                  Fashion
                </span>
                <h4 className="font-bold text-gray-800 truncate text-base max-w-[240px] md:max-w-md">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-400 mt-1 font-semibold">
                  {formatPrice(item.price)} <span className="mx-1.5">•</span> Qty: <span className="text-gray-700 font-bold">{item.quantity || item.qty}</span>
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-gray-400 font-semibold block">Subtotal</span>
              <span className="text-base font-extrabold text-[#145A3B] mt-0.5">
                {formatPrice(item.subtotal || (item.price * (item.quantity || item.qty || 1)))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
