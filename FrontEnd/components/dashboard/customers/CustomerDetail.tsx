"use client";

import Link from "next/link";
import {
    FaArrowLeft,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaShieldAlt,
    FaShoppingCart,
    FaDollarSign,
    FaClock,
    FaMapMarkerAlt,
    FaHeart,
    FaStar,
} from "react-icons/fa";
import StatusBadge from "../common/statusBadge";
import { User } from "../../../services/userService";
import { Order } from "../../../services/orderService";

interface Props {
    customer: User;
    orders: Order[];
    totalSpent: number;
    lastOrderDate: string;
}

export default function CustomerDetail({
    customer,
    orders,
    totalSpent,
    lastOrderDate,
}: Props) {
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    const formatDateTime = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateStr;
        }
    };

    // Mock Wishlist
    const mockWishlist = [
        { id: 1, name: "Kaos Polo Katun Bekas Berkualitas", price: 85000, dateAdded: "2026-06-15T10:20:00Z" },
        { id: 2, name: "Sepatu Sneaker Kasual Converse", price: 320000, dateAdded: "2026-07-02T14:45:00Z" },
    ];

    // Mock Reviews
    const mockReviews = [
        { id: 1, productName: "Buku Novel Preloved Sapiens", rating: 5, comment: "Kondisi buku masih sangat bagus, pengiriman cepat!", date: "2026-05-10T08:30:00Z" },
        { id: 2, productName: "Tumbler Stainless Steel Reusable", rating: 4, comment: "Bagus dan tahan panas. Ada sedikit lecet halus tapi wajar.", date: "2026-06-22T11:15:00Z" },
    ];

    // Mock Address Book
    const mockAddresses = [
        {
            id: 1,
            label: "Alamat Utama / Rumah",
            recipient: customer.name,
            phone: customer.phone || "081234567890",
            address: "Perumahan Hijau Blok C No. 4, RT 02/05",
            city: "Bandung",
            province: "Jawa Barat",
            postalCode: "40123",
            isPrimary: true,
        },
        {
            id: 2,
            label: "Kantor",
            recipient: `${customer.name} (Gedung Jaya)`,
            phone: "081999888777",
            address: "Jl. Jendral Sudirman Kav 21, Lantai 5",
            city: "Jakarta Pusat",
            province: "DKI Jakarta",
            postalCode: "10220",
            isPrimary: false,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/admin/customers"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#145A3B] transition font-medium"
                >
                    <FaArrowLeft />
                    <span>Kembali ke Daftar Customer</span>
                </Link>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-white rounded-[30px] shadow-sm p-8 md:p-10 border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Avatar & Name */}
                    <div className="flex flex-col items-center text-center lg:border-r lg:border-gray-100 lg:pr-10">
                        <div className="w-36 h-36 rounded-full border-4 border-gray-50 shadow-md relative overflow-hidden bg-gray-50 flex items-center justify-center">
                            {customer.avatar ? (
                                <img
                                    src={customer.avatar}
                                    alt={customer.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            customer.name
                                        )}&background=145A3B&color=fff&size=144`;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-[#145A3B] text-white flex items-center justify-center font-bold text-4xl">
                                    {customer.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mt-6 leading-tight">
                            {customer.name}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Customer ID: #{customer.id}</p>

                        <div className="flex gap-2 justify-center mt-4">
                            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border">
                                Customer Role
                            </span>
                            <StatusBadge status={customer.status} />
                        </div>
                    </div>

                    {/* Right: Contact Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-3 flex items-center gap-2">
                            <FaUser className="text-[#145A3B]" />
                            Informasi Akun
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Email Address</span>
                                <span className="text-gray-800 font-semibold block mt-1.5">{customer.email}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Phone Number</span>
                                <span className="text-gray-800 font-semibold block mt-1.5">{customer.phone || "-"}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Dibuat Pada</span>
                                <span className="text-gray-800 font-semibold block mt-1.5">{formatDate(customer.createdAt)}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Terakhir Login</span>
                                <span className="text-gray-800 font-semibold block mt-1.5">{formatDate(customer.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Total Orders</span>
                        <span className="text-2xl font-bold text-gray-800 mt-2 block">{orders.length} Pesanan</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl border border-blue-100">
                        <FaShoppingCart />
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Total Spending</span>
                        <span className="text-2xl font-bold text-gray-800 mt-2 block">
                            Rp {totalSpent.toLocaleString("id-ID")}
                        </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#145A3B] flex items-center justify-center text-xl border border-emerald-100">
                        <FaDollarSign />
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Last Order Date</span>
                        <span className="text-2xl font-bold text-gray-800 mt-2 block">{formatDate(lastOrderDate)}</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl border border-yellow-100">
                        <FaClock />
                    </div>
                </div>
            </div>

            {/* Address Book & Order History Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Address Book */}
                <div className="lg:col-span-1 bg-white rounded-[30px] border border-gray-100 shadow-sm p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-4">
                        <FaMapMarkerAlt className="text-red-500" />
                        Address Book
                    </h3>
                    <div className="space-y-4">
                        {mockAddresses.map((addr) => (
                            <div key={addr.id} className="p-4 bg-gray-50 border rounded-2xl relative text-sm space-y-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-gray-800">{addr.label}</span>
                                    {addr.isPrimary && (
                                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                                            Primary
                                        </span>
                                    )}
                                </div>
                                <div className="font-semibold text-gray-700">{addr.recipient}</div>
                                <div className="text-gray-500 text-xs">{addr.phone}</div>
                                <p className="text-gray-600 leading-relaxed text-xs">
                                    {addr.address}
                                    <br />
                                    {addr.city}, {addr.province} - {addr.postalCode}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Order History */}
                <div className="lg:col-span-2 bg-white rounded-[30px] border border-gray-100 shadow-sm p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-4">
                        <FaShoppingCart className="text-[#145A3B]" />
                        Order History
                    </h3>
                    {orders.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No orders recorded for this customer.</p>
                    ) : (
                        <div className="border border-gray-100 rounded-2xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 font-semibold text-xs border-b">
                                        <th className="px-6 py-4">Invoice</th>
                                        <th className="px-6 py-4 text-center">Date</th>
                                        <th className="px-6 py-4 text-center">Total</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y text-gray-700">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition text-sm">
                                            <td className="px-6 py-4 font-bold text-[#145A3B]">
                                                {order.invoice || `INV-${order.id}`}
                                            </td>
                                            <td className="px-6 py-4 text-center text-xs">
                                                {formatDateTime(order.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 text-center font-semibold">
                                                Rp {order.total.toLocaleString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <StatusBadge status={order.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Wishlist & Reviews Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Wishlist */}
                <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-4">
                        <FaHeart className="text-pink-500" />
                        Wishlist Items
                    </h3>
                    <div className="space-y-4">
                        {mockWishlist.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border">
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-800">{item.name}</h4>
                                    <span className="text-xs text-gray-400 block mt-1">Ditambahkan: {formatDate(item.dateAdded)}</span>
                                </div>
                                <span className="font-semibold text-sm text-[#145A3B] shrink-0">
                                    Rp {item.price.toLocaleString("id-ID")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-8 space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-4">
                        <FaStar className="text-yellow-500" />
                        Reviews & Ratings
                    </h3>
                    <div className="space-y-4">
                        {mockReviews.map((rev) => (
                            <div key={rev.id} className="p-4 bg-gray-50 rounded-2xl border text-sm space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">{rev.productName}</span>
                                    <div className="flex items-center text-yellow-500 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < rev.rating ? "text-yellow-500" : "text-gray-200"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-xs italic">"{rev.comment}"</p>
                                <span className="text-[10px] text-gray-400 block text-right">{formatDate(rev.date)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
