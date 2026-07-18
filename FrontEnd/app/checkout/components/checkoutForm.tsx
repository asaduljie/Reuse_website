"use client";

import { CheckoutFormProps } from "../types";

export default function CheckoutForm({
  name,
  phone,
  address,
  note,
  setName,
  setPhone,
  setAddress,
  setNote,
}: CheckoutFormProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h2 className="text-3xl font-bold mb-8">
          Data Pembeli
        </h2>

        <div className="space-y-6">

          <div>
            <label className="font-semibold block mb-3">
              Nama Lengkap
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-[#145A3B]"
            />
          </div>

          <div>
            <label className="font-semibold block mb-3">
              Nomor WhatsApp
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full border rounded-2xl px-5 py-4 outline-none focus:border-[#145A3B]"
            />
          </div>

          <div>
            <label className="font-semibold block mb-3">
              Alamat Lengkap
            </label>

            <textarea
              rows={5}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukkan alamat lengkap"
              className="w-full border rounded-2xl px-5 py-4 outline-none resize-none focus:border-[#145A3B]"
            />
          </div>

          <div>
            <label className="font-semibold block mb-3">
              Catatan Tambahan
            </label>

            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Tolong dikemas dengan baik."
              className="w-full border rounded-2xl px-5 py-4 outline-none resize-none focus:border-[#145A3B]"
            />
          </div>

        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          Informasi Checkout
        </h3>

        <ul className="space-y-3 text-gray-600 leading-7">
          <li>• Pastikan data pembeli sudah benar.</li>
          <li>• Nomor WhatsApp digunakan untuk konfirmasi pesanan.</li>
          <li>• Alamat akan dikirim kepada penjual melalui WhatsApp.</li>
          <li>• Checkout belum melakukan pembayaran otomatis.</li>
        </ul>
      </div>
    </div>
  );
}