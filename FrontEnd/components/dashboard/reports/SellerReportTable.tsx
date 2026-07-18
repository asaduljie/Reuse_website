"use client";

import { SellerProfile } from "../../../services/sellerService";
import VerificationBadge from "../sellers/VerificationBadge";
import { FaStar } from "react-icons/fa";

interface Props {
    sellers: (SellerProfile & { productsCount: number; ordersCount: number; revenue: number; ownerName: string })[];
}

export default function SellerReportTable({ sellers }: Props) {
    return (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                        <tr>
                            <th className="px-6 py-4">Seller Store</th>
                            <th className="px-6 py-4">Owner</th>
                            <th className="px-6 py-4 text-center">Products</th>
                            <th className="px-6 py-4 text-center">Orders</th>
                            <th className="px-6 py-4 text-center">Revenue</th>
                            <th className="px-6 py-4 text-center">Rating</th>
                            <th className="px-6 py-4 text-center">Verified</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                        {sellers.map((seller) => (
                            <tr key={seller.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50 border relative shrink-0">
                                            {seller.logo ? (
                                                <img
                                                    src={seller.logo}
                                                    alt={seller.storeName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            seller.storeName
                                                        )}&background=145A3B&color=fff&size=40`;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#145A3B] text-white flex items-center justify-center font-bold">
                                                    {seller.storeName.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-gray-800">{seller.storeName}</h4>
                                            <p className="text-xs text-gray-400">ID: #{seller.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-sm font-semibold text-gray-700">
                                    {seller.ownerName}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {seller.productsCount}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {seller.ordersCount}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-bold text-gray-800">
                                    Rp {seller.revenue.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <div className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-yellow-500">
                                        <FaStar />
                                        <span className="text-gray-700">{seller.rating.toFixed(1)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <VerificationBadge verified={seller.verified} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
