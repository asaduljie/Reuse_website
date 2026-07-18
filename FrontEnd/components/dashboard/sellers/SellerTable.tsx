"use client";

import Link from "next/link";
import { FaEye, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import VerificationBadge from "./VerificationBadge";
import StatusBadge from "../common/statusBadge";
import { SellerProfile } from "../../../services/sellerService";

export interface SellerWithStats extends SellerProfile {
    ownerName: string;
    email: string;
    productsCount: number;
    ordersCount: number;
    revenue: number;
}

interface Props {
    sellers: SellerWithStats[];
    onDelete: (id: number) => void;
}

export default function SellerTable({ sellers, onDelete }: Props) {
    return (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                        <tr>
                            <th className="px-6 py-4">Store Logo & Name</th>
                            <th className="px-6 py-4">Owner & Email</th>
                            <th className="px-6 py-4 text-center">City</th>
                            <th className="px-6 py-4 text-center">Verification</th>
                            <th className="px-6 py-4 text-center">Products</th>
                            <th className="px-6 py-4 text-center">Orders</th>
                            <th className="px-6 py-4 text-center">Revenue</th>
                            <th className="px-6 py-4 text-center">Rating</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                        {sellers.map((seller) => (
                            <tr key={seller.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-50 relative shrink-0 border">
                                            {seller.logo ? (
                                                <img
                                                    src={seller.logo}
                                                    alt={seller.storeName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            seller.storeName
                                                        )}&background=145A3B&color=fff&size=56`;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#145A3B] text-white flex items-center justify-center font-bold">
                                                    {seller.storeName.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-sm">
                                                {seller.storeName}
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-0.5">ID: #{seller.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="text-sm font-semibold text-gray-800">{seller.ownerName}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{seller.email}</div>
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-medium">
                                    {seller.city}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <VerificationBadge verified={seller.verified} />
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {seller.productsCount}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {seller.ordersCount}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold text-gray-800">
                                    Rp {seller.revenue.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-500">
                                        <FaStar />
                                        <span className="text-gray-700">{seller.rating.toFixed(1)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <StatusBadge status={seller.status || "active"} />
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex justify-center gap-3">
                                        <Link
                                            href={`/dashboard/admin/sellers/${seller.id}`}
                                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </Link>
                                        <Link
                                            href={`/dashboard/admin/sellers/${seller.id}/edit`}
                                            className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center hover:bg-yellow-100 transition"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => onDelete(seller.id)}
                                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
