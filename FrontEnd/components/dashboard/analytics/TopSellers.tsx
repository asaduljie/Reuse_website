"use client";

import Link from "next/link";
import { FaStar, FaStore } from "react-icons/fa";

interface Seller {
    id: number;
    storeName: string;
    logo: string;
    rating: number;
    revenue: number;
}

interface TopSellersProps {
    sellers: Seller[];
}

export default function TopSellers({ sellers }: TopSellersProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold">Top Sellers</h2>
                    <p className="text-gray-500 text-sm">Mitra penjual dengan pendapatan tertinggi.</p>
                </div>
                <Link
                    href="/dashboard/admin/sellers"
                    className="text-[#145A3B] font-medium"
                >
                    View All
                </Link>
            </div>
            <div className="space-y-5">
                {sellers.map((seller) => (
                    <div key={seller.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-50 relative shrink-0 border">
                            {seller.logo ? (
                                <img
                                    src={seller.logo}
                                    alt={seller.storeName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(seller.storeName)}&background=145A3B&color=fff&size=48`;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-[#145A3B] text-white flex items-center justify-center font-bold">
                                    {seller.storeName.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-gray-800 truncate">{seller.storeName}</h3>
                            <div className="flex items-center gap-1.5 text-yellow-500 text-sm mt-0.5">
                                <FaStar />
                                <span className="font-semibold text-gray-700">{seller.rating.toFixed(1)}</span>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="font-semibold text-sm text-gray-800">
                                Rp {seller.revenue.toLocaleString("id-ID")}
                            </p>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Revenue</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
