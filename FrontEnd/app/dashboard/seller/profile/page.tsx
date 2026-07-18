"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../../utils/roleGuard";
import {
  getSellerByUserId,
  SellerProfile,
  updateSellerProfile,
} from "../../../../services/sellerService";
import { FaStore, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaTimesCircle, FaSave } from "react-icons/fa";

export default function SellerProfilePage() {
  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const profile = getSellerByUserId(Number(user.id));
      setSeller(profile || null);
    }
  }, []);

  const handleChange = (key: keyof SellerProfile, value: string) => {
    if (!seller) return;
    setSeller({ ...seller, [key]: value });
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seller) return;
    setSaving(true);
    updateSellerProfile(seller.id, seller);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 500);
  };

  if (!seller) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FaStore className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Profil Toko Belum Tersedia</h2>
        <p className="text-gray-500 mt-2">Silakan login ulang dengan akun seller.</p>
      </div>
    );
  }

  const fields: { key: keyof SellerProfile; label: string; placeholder: string; icon?: React.ReactNode }[] = [
    { key: "storeName", label: "Nama Toko", placeholder: "Masukkan nama toko", icon: <FaStore /> },
    { key: "description", label: "Deskripsi Toko", placeholder: "Ceritakan tentang toko Anda" },
    { key: "phone", label: "Nomor Telepon", placeholder: "08xxxxxxxxxx", icon: <FaPhone /> },
    { key: "address", label: "Alamat", placeholder: "Jl. Contoh No. 123", icon: <FaMapMarkerAlt /> },
    { key: "city", label: "Kota", placeholder: "Jakarta" },
    { key: "province", label: "Provinsi", placeholder: "DKI Jakarta" },
    { key: "postalCode", label: "Kode Pos", placeholder: "10110" },
  ];

  const bankFields: { key: keyof SellerProfile; label: string; placeholder: string }[] = [
    { key: "bankName", label: "Nama Bank", placeholder: "BCA / BNI / Mandiri" },
    { key: "bankAccountName", label: "Nama Pemilik Rekening", placeholder: "Nama sesuai rekening" },
    { key: "bankAccountNumber", label: "Nomor Rekening", placeholder: "1234567890" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl text-[#145A3B]">
            <FaStore />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-gray-900">{seller.storeName}</h1>
              {seller.verified ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <FaCheckCircle /> Terverifikasi
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  <FaTimesCircle /> Belum Verifikasi
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1 font-semibold">
              Bergabung sejak {new Date(seller.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Info Toko */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-black text-gray-800 mb-6">Informasi Toko</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {fields.map((field) => (
              <label key={field.key} className={`block ${field.key === "description" ? "md:col-span-2" : ""}`}>
                <span className="text-sm font-bold text-gray-600 mb-2 block">{field.label}</span>
                {field.key === "description" ? (
                   <textarea
                    value={String(seller[field.key] || "")}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition resize-none"
                  />
                ) : (
                  <div className="relative">
                    {field.icon && (
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{field.icon}</span>
                    )}
                    <input
                      type="text"
                      value={String(seller[field.key] || "")}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition ${field.icon ? "pl-10" : ""}`}
                    />
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Info Bank */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-black text-gray-800 mb-6">Informasi Rekening Bank</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {bankFields.map((field) => (
              <label key={field.key} className="block">
                <span className="text-sm font-bold text-gray-600 mb-2 block">{field.label}</span>
                <input
                  type="text"
                  value={String(seller[field.key] || "")}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none transition"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#145A3B] text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition disabled:opacity-50"
          >
            <FaSave />
            {saving ? "Menyimpan..." : "Simpan Profil"}
          </button>
          {saved && (
            <span className="text-emerald-600 text-sm font-bold animate-pulse">
              Profil berhasil disimpan!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
