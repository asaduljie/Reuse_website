"use client";

import { OrderSummaryProps } from "../types";

export default function OrderSummary({
  cart,
  totalItem,
  totalPrice,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 h-fit sticky top-28">

      <p className="uppercase tracking-widest text-[#145A3B] font-semibold">
        Order Summary
      </p>

      <h2 className="text-3xl font-bold mt-3 mb-8">
        Ringkasan Pesanan
      </h2>

      <div className="space-y-6">

        {cart.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Keranjang masih kosong.
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b pb-5"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />

              <div className="flex-1">

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.category}
                </p>

                <p className="mt-3 font-bold text-[#145A3B]">
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </p>

              </div>

              <div className="text-right">

                <p>x{item.qty}</p>

                <p className="mt-8 font-bold">
                  Rp {(item.qty * item.price).toLocaleString("id-ID")}
                </p>

              </div>

            </div>
          ))
        )}

      </div>

      <div className="space-y-4 pt-6">

        <div className="flex justify-between">
          <span>Total Item</span>
          <b>{totalItem}</b>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <b>
            Rp {totalPrice.toLocaleString("id-ID")}
          </b>
        </div>

        <div className="flex justify-between">
          <span>Ongkir</span>
          <span className="font-bold text-green-600">
            Gratis
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">
          <span>Total</span>

          <span className="text-[#145A3B]">
            Rp {totalPrice.toLocaleString("id-ID")}
          </span>
        </div>

      </div>

      <button
        onClick={onCheckout}
        className="w-full mt-10 bg-[#145A3B] text-white py-4 rounded-2xl font-semibold hover:bg-green-900 transition"
      >
        Checkout via WhatsApp
      </button>

    </div>
  );
}