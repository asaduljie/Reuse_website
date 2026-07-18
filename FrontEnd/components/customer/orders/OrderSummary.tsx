"use client";

import { Order } from "../../../services/orderService";
import { FaMapMarkerAlt, FaFileAlt, FaCalculator } from "react-icons/fa";

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  // Format price helper
  const formatPrice = (price: number) => {
    return `Rp ${Number(price || 0).toLocaleString("id-ID")}`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* Recipient Shipping Address & Notes */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="font-extrabold text-gray-800 text-lg border-b pb-3 flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#145A3B] text-base" /> Detail Pengiriman & Alamat
          </h3>
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Penerima</span>
              <span className="font-bold text-gray-800">{order.customerName || order.shipping?.recipient}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">No. WhatsApp</span>
              <span className="font-semibold text-gray-700">{order.phone || order.shipping?.phone}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Alamat Lengkap</span>
              <span className="font-semibold text-gray-700">
                {order.address || order.shipping?.address}
              </span>
            </div>
          </div>
        </div>

        {order.note && (
          <div className="border-t border-gray-50 pt-4 space-y-2">
            <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
              <FaFileAlt className="text-gray-400 text-xs" /> Catatan Pemesanan
            </h4>
            <p className="text-xs text-gray-500 italic bg-gray-50 rounded-xl p-3 leading-relaxed font-semibold">
              "{order.note}"
            </p>
          </div>
        )}
      </div>

      {/* Pricing Payment Summary */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-gray-800 text-lg border-b pb-3 mb-5 flex items-center gap-2">
            <FaCalculator className="text-[#145A3B] text-base" /> Ringkasan Pembayaran
          </h3>
          
          <div className="space-y-4 text-sm text-gray-600 font-semibold">
            <div className="flex justify-between">
              <span>Metode Pembayaran</span>
              <span className="text-gray-800 font-bold">{order.paymentMethod || "COD (Bayar di Tempat)"}</span>
            </div>
            <div className="flex justify-between">
              <span>Status Pembayaran</span>
              <span className={`font-bold ${order.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-500"}`}>
                {order.paymentStatus === "Paid" ? "Lunas (Paid)" : "Belum Lunas (Pending)"}
              </span>
            </div>
            <hr className="border-gray-50" />
            <div className="flex justify-between">
              <span>Subtotal produk ({order.totalItem} item)</span>
              <span className="text-gray-850 font-bold">{formatPrice(order.subtotal || order.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Pengiriman</span>
              <span className="text-emerald-600 font-bold">Gratis Ongkir</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 mt-6 flex justify-between items-center">
          <span className="text-base font-extrabold text-gray-800">Total Pembayaran</span>
          <span className="text-2xl font-black text-[#145A3B]">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

    </div>
  );
}
