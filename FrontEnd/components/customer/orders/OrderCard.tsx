"use client";

import Link from "next/link";
import { Order } from "../../../services/orderService";
import { addToCart, saveCart, getCart } from "../../../services/cartService";
import { FaStore, FaCalendarAlt, FaChevronRight, FaShoppingCart, FaRedo } from "react-icons/fa";

interface OrderCardProps {
  order: Order;
  onRefresh?: () => void;
}

export default function OrderCard({ order, onRefresh }: OrderCardProps) {
  // Format price helper
  const formatPrice = (price: number) => {
    return `Rp ${Number(price || 0).toLocaleString("id-ID")}`;
  };

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Status style helper
  const getStatusClass = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Seller Confirmed":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Packing":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200";
      case "Ready to Pickup":
        return "bg-cyan-50 text-cyan-700 border border-cyan-200";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  // Action: Buy Again (Appends to existing cart)
  const handleBuyAgain = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    order.items.forEach((item) => {
      addToCart({
        id: item.productId,
        name: item.name,
        description: "",
        price: item.price,
        stock: 99,
        imageUrl: item.image || "/images/products/placeholder.jpg",
        category: "Fashion",
        qty: item.quantity,
      });
    });

    alert("Produk berhasil ditambahkan ke keranjang belanja!");
    window.location.href = "/cart";
  };

  // Action: Order Again (Cancelled - overwrites cart)
  const handleOrderAgain = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newCart = order.items.map((item) => ({
      id: item.productId,
      name: item.name,
      description: "",
      price: item.price,
      stock: 99,
      imageUrl: item.image || "/images/products/placeholder.jpg",
      category: "Fashion",
      qty: item.quantity,
    }));

    saveCart(newCart);
    alert("Keranjang diatur ulang dengan produk pesanan ini.");
    window.location.href = "/cart";
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-md hover:border-emerald-100 transition duration-300">
      
      {/* Top Meta info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-50 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#145A3B] flex items-center justify-center font-bold shadow-sm">
            <FaStore className="text-sm" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
              Seller Store {order.sellerId}
            </h4>
            <span className="text-[11px] text-gray-400 font-medium font-mono">{order.invoice}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusClass(order.status)}`}>
            {order.status === "Pending" ? "Menunggu Konfirmasi" :
             order.status === "Seller Confirmed" ? "Seller Mengonfirmasi" :
             order.status === "Ready to Pickup" ? "Siap Diambil" :
             order.status === "Completed" ? "Selesai" :
             order.status === "Cancelled" ? "Dibatalkan" : order.status}
          </span>
        </div>
      </div>

      {/* Main product brief */}
      <div className="flex gap-4">
        {order.items[0] && (
          <img
            src={order.items[0].image || "/images/products/placeholder.jpg"}
            alt={order.items[0].name}
            className="w-20 h-20 rounded-2xl object-cover border shrink-0 bg-gray-50"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-800 truncate text-base">
            {order.items[0]?.name || "Produk Marketplace"}
          </h4>
          {order.items.length > 1 && (
            <p className="text-xs text-gray-400 mt-1 font-semibold">
              + {order.items.length - 1} produk lainnya
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-3 font-semibold">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-400" /> {formatDate(order.createdAt || order.date)}
            </span>
            <span>•</span>
            <span>{order.totalItem} item</span>
          </div>
        </div>
        <div className="text-right shrink-0 flex flex-col justify-center">
          <span className="text-xs text-gray-400 font-semibold block">Total Belanja</span>
          <span className="text-lg font-extrabold text-[#145A3B] mt-0.5">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-4 border-t border-gray-50 pt-5 mt-5">
        <Link href={`/profile/orders/${order.id}`} className="inline-flex items-center gap-1 text-[#145A3B] hover:text-[#0F472E] text-xs font-bold">
          Lihat Detail Transaksi <FaChevronRight className="text-[10px]" />
        </Link>

        <div className="flex gap-3">
          {order.status === "Cancelled" && (
            <button
              onClick={handleOrderAgain}
              className="inline-flex items-center gap-1.5 bg-[#145A3B] hover:bg-[#0F472E] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition"
            >
              <FaRedo className="text-[10px]" /> Pesan Lagi
            </button>
          )}
          {order.status === "Completed" && (
            <button
              onClick={handleBuyAgain}
              className="inline-flex items-center gap-1.5 bg-[#145A3B] hover:bg-[#0F472E] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition"
            >
              <FaShoppingCart className="text-[10px]" /> Beli Lagi
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
