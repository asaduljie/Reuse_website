"use client";

import Link from "next/link";
import { FaArrowLeft, FaEdit, FaEnvelope, FaPhone, FaCalendarAlt, FaShieldAlt, FaShoppingCart, FaBox, FaDollarSign, FaHeart, FaStar, FaFolder } from "react-icons/fa";
import StatusBadge from "../common/statusBadge";
import { User } from "../../../services/userService";

interface UserDetailProps {
    user: User;
    backUrl?: string;
    editUrl?: string;
}

export default function UserDetail({
    user,
    backUrl = "/dashboard/admin/users",
    editUrl,
}: UserDetailProps) {
    const defaultEditUrl = editUrl || `/dashboard/admin/users/${user.id}/edit`;

    const getRoleDetails = (role: string) => {
        switch (role) {
            case "super_admin":
                return {
                    label: "Super Admin",
                    color: "bg-purple-100 text-purple-700 border-purple-200",
                    description: "Hak akses penuh ke seluruh konfigurasi sistem, manajemen peran, database, dan audit logs.",
                };
            case "admin":
                return {
                    label: "Admin",
                    color: "bg-blue-100 text-blue-700 border-blue-200",
                    description: "Hak akses manajemen produk, kategori, banner, verifikasi penjual, serta memantau seluruh transaksi pesanan.",
                };
            case "seller":
                return {
                    label: "Seller",
                    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
                    description: "Hak akses pengelolaan toko, pendaftaran produk dagangan, update stok barang, dan pemrosesan pesanan pelanggan.",
                };
            case "customer":
                return {
                    label: "Customer",
                    color: "bg-gray-100 text-gray-700 border-gray-200",
                    description: "Hak akses penelusuran marketplace, pembelian produk, manajemen keranjang belanja, transaksi, dan riwayat pesanan.",
                };
            default:
                return {
                    label: role,
                    color: "bg-gray-100 text-gray-700 border-gray-200",
                    description: "Peran pengguna reguler dengan hak akses dasar dalam sistem.",
                };
        }
    };

    const roleInfo = getRoleDetails(user.role);

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
                <Link
                    href={backUrl}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#145A3B] transition font-medium"
                >
                    <FaArrowLeft />
                    <span>Kembali ke Daftar</span>
                </Link>

                <Link
                    href={defaultEditUrl}
                    className="inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                    <FaEdit />
                    <span>Edit Pengguna</span>
                </Link>
            </div>

            {/* Profile Detail Card */}
            <div className="bg-white rounded-[30px] shadow-sm p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Avatar & Badges */}
                    <div className="flex flex-col items-center text-center lg:border-r lg:border-gray-100 lg:pr-10">
                        <div className="w-40 h-40 rounded-full border-4 border-gray-50 shadow-md relative overflow-hidden bg-gray-50 flex items-center justify-center">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=145A3B&color=fff&size=160`;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-[#145A3B] text-white flex items-center justify-center font-bold text-5xl">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mt-6 leading-tight">
                            {user.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">ID Pengguna: #{user.id}</p>

                        <div className="flex flex-wrap gap-2 justify-center mt-4">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${roleInfo.color}`}>
                                {roleInfo.label}
                            </span>
                            <StatusBadge status={user.status} />
                        </div>
                    </div>

                    {/* Right: Detailed Fields */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Section 1: Akun & Kontak */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3 border-b border-gray-100 pb-3">
                                <FaEnvelope className="text-[#145A3B]" />
                                Informasi Kontak & Akun
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 mt-4">
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Alamat Email</span>
                                    <p className="text-gray-800 font-medium text-base">
                                        <a href={`mailto:${user.email}`} className="hover:underline hover:text-[#145A3B] transition">
                                            {user.email}
                                        </a>
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Nomor Telepon</span>
                                    <p className="text-gray-800 font-medium text-base">
                                        {user.phone ? (
                                            <a href={`tel:${user.phone}`} className="hover:underline hover:text-[#145A3B] transition">
                                                {user.phone}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 italic">Tidak tersedia</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Informasi Sistem */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3 border-b border-gray-100 pb-3">
                                <FaShieldAlt className="text-[#145A3B]" />
                                Hak Akses & Status Sistem
                            </h3>
                            <div className="space-y-4 mt-4">
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-1">Deskripsi Wewenang</span>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {roleInfo.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Riwayat */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3 border-b border-gray-100 pb-3">
                                <FaCalendarAlt className="text-[#145A3B]" />
                                Log & Riwayat Aktivitas
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 mt-4">
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Dibuat Pada</span>
                                    <p className="text-gray-800 text-sm font-medium">
                                        {formatDate(user.createdAt)}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Terakhir Diperbarui</span>
                                    <p className="text-gray-800 text-sm font-medium">
                                        {formatDate(user.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistik Section */}
            <div className="bg-white rounded-[30px] shadow-sm p-8 md:p-10">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <FaShieldAlt className="text-[#145A3B]" />
                    Statistik Pengguna ({roleInfo.label})
                </h3>

                {user.role === "seller" && (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Products</span>
                                <span className="text-2xl font-bold text-gray-800 mt-2 block">18</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#145A3B] flex items-center justify-center text-xl">
                                <FaBox />
                            </div>
                        </div>
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Orders</span>
                                <span className="text-2xl font-bold text-gray-800 mt-2 block">120</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                                <FaShoppingCart />
                            </div>
                        </div>
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Revenue</span>
                                <span className="text-2xl font-bold text-gray-800 mt-2 block">Rp 15.240.000</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl">
                                <FaDollarSign />
                            </div>
                        </div>
                    </div>
                )}

                {user.role === "customer" && (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Orders</span>
                                <span className="text-2xl font-bold text-gray-800 mt-2 block">5</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                                <FaShoppingCart />
                            </div>
                        </div>
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Wishlist</span>
                                <span className="text-2xl font-bold text-gray-800 mt-2 block">12</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl">
                                <FaHeart />
                            </div>
                        </div>
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Reviews</span>
                                <span className="text-2xl font-bold text-gray-800 mt-2 block">4</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl">
                                <FaStar />
                            </div>
                        </div>
                    </div>
                )}

                {(user.role === "admin" || user.role === "super_admin") && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Managed Products</span>
                                <span className="text-2xl font-bold text-gray-800 mt-2 block">340</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#145A3B] flex items-center justify-center text-xl">
                                <FaBox />
                            </div>
                        </div>
                        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Managed Categories</span>
                                <span className="text-2xl font-bold text-gray-800 mt-2 block">15</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                                <FaFolder />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Aktivitas Section */}
            <div className="bg-white rounded-[30px] shadow-sm p-8 md:p-10 space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <FaShoppingCart className="text-[#145A3B]" />
                        Recent Orders (Aktivitas)
                    </h3>
                    <div className="border border-gray-100 rounded-2xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 font-semibold text-sm border-b">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Tanggal</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-gray-700">
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-[#145A3B]">#ORD-9821</td>
                                    <td className="px-6 py-4 text-sm">08 Jul 2026, 14:32</td>
                                    <td className="px-6 py-4 text-sm font-semibold">Rp 320.000</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-semibold">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-[#145A3B]">#ORD-9755</td>
                                    <td className="px-6 py-4 text-sm">06 Jul 2026, 09:15</td>
                                    <td className="px-6 py-4 text-sm font-semibold">Rp 1.450.000</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1.5 rounded-full font-semibold">Pending</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {user.role === "seller" && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                            <FaBox className="text-[#145A3B]" />
                            Daftar Produk Toko
                        </h3>
                        <div className="border border-gray-100 rounded-2xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 font-semibold text-sm border-b">
                                        <th className="px-6 py-4">Product ID</th>
                                        <th className="px-6 py-4">Nama Produk</th>
                                        <th className="px-6 py-4">Harga</th>
                                        <th className="px-6 py-4">Stok</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y text-gray-700">
                                    <tr>
                                        <td className="px-6 py-4 font-semibold text-[#145A3B]">#PRD-102</td>
                                        <td className="px-6 py-4 font-semibold text-sm">Kaos Katun Ramah Lingkungan</td>
                                        <td className="px-6 py-4 text-sm">Rp 120.000</td>
                                        <td className="px-6 py-4 text-sm">15 pcs</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-semibold text-[#145A3B]">#PRD-105</td>
                                        <td className="px-6 py-4 font-semibold text-sm">Tas Belanja Canvas Reusable</td>
                                        <td className="px-6 py-4 text-sm">Rp 45.000</td>
                                        <td className="px-6 py-4 text-sm">50 pcs</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
