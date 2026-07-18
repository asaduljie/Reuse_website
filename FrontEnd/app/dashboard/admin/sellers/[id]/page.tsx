"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaEdit, FaShieldAlt, FaCheckCircle, FaTimesCircle, FaPlusCircle } from "react-icons/fa";
import SellerProfileCard from "@/components/dashboard/sellers/SellerProfileCard";
import SellerStatistic from "@/components/dashboard/sellers/SellerStatistic";
import SellerProducts from "@/components/dashboard/sellers/SellerProducts";
import SellerOrders from "@/components/dashboard/sellers/SellerOrders";
import { getSellerProfile, getSellerStatistics, updateSellerProfile } from "@/services/sellerService";
import { getProducts, Product } from "@/services/productService";
import { getOrders, Order } from "@/services/orderService";
import { getUser } from "@/services/userService";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function SellerDetailPage({ params }: Props) {
    const router = useRouter();
    const resolvedParams = use(params);
    const sellerId = Number(resolvedParams.id);
    const seller = getSellerProfile(sellerId);

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        revenue: 0,
    });
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [ownerUser, setOwnerUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        if (!seller) return;

        const loadStatsAndRecentData = async () => {
            setLoading(true);
            const user = getUser(seller.userId);
            setOwnerUser(user ? { name: user.name, email: user.email } : { name: "Unknown", email: "Unknown" });

            // Fetch statistics
            const sStats = await getSellerStatistics(sellerId);
            setStats(sStats);

            // Fetch products
            const productsResp = await getProducts();
            const rawProducts: Product[] = productsResp?.data?.products || productsResp?.data || [];
            const sellerProducts = rawProducts.filter((p) => p.sellerId === sellerId);
            setRecentProducts(sellerProducts.slice(0, 5));

            // Fetch orders
            const orders = await getOrders();
            const sellerOrders = orders.filter((o) => o.sellerId === sellerId);
            setRecentOrders(sellerOrders.slice(0, 5));

            setLoading(false);
        };

        loadStatsAndRecentData();
    }, [sellerId, seller]);

    if (!seller) {
        return (
            <div className="bg-white rounded-[30px] shadow-sm p-8 text-center border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-700">Store Profile Not Found</h2>
                <p className="text-gray-500 mt-2">Toko seller yang Anda cari tidak ditemukan.</p>
                <Link
                    href="/dashboard/admin/sellers"
                    className="inline-flex items-center gap-2 mt-4 text-[#145A3B] hover:underline font-semibold"
                >
                    <FaArrowLeft /> Kembali ke Daftar
                </Link>
            </div>
        );
    }

    function toggleVerification() {
        if (!seller) return;
        const newVerifiedStatus = !seller.verified;
        updateSellerProfile(seller.id, {
            verified: newVerifiedStatus,
            verifiedDate: newVerifiedStatus ? new Date().toISOString() : undefined,
            verifiedBy: newVerifiedStatus ? "Admin" : undefined,
            verificationNotes: newVerifiedStatus
                ? "Disetujui secara manual oleh Admin setelah validasi dokumen toko."
                : "Dibatalkan verifikasinya oleh Admin.",
        });
        window.location.reload();
    }

    return (
        <div className="space-y-8">
            {/* Header / Action Bar */}
            <div className="flex items-center justify-between">
                <Link
                    href="/dashboard/admin/sellers"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#145A3B] transition font-medium"
                >
                    <FaArrowLeft />
                    <span>Kembali ke Daftar Toko</span>
                </Link>

                <Link
                    href={`/dashboard/admin/sellers/${seller.id}/edit`}
                    className="inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-3 rounded-xl font-semibold transition shadow-sm"
                >
                    <FaEdit />
                    <span>Edit Toko</span>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20 bg-white rounded-[30px] border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto"></div>
                    <p className="text-gray-500 mt-4 font-semibold">Loading store profile...</p>
                </div>
            ) : (
                <>
                    {/* Bagian 1: Store Information Card */}
                    <SellerProfileCard
                        seller={seller}
                        ownerName={ownerUser?.name || "Unknown"}
                        email={ownerUser?.email || "Unknown"}
                    />

                    {/* Bagian 2: Statistics Grid */}
                    <SellerStatistic
                        productsCount={stats.totalProducts}
                        ordersCount={stats.totalOrders}
                        revenue={stats.revenue}
                        rating={seller.rating}
                    />

                    {/* Bagian 3: Verification Panel */}
                    <div className="bg-white rounded-[30px] shadow-sm p-8 md:p-10 border border-gray-100 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b pb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                    <FaShieldAlt className="text-[#145A3B]" />
                                    Verifikasi Toko
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">Status sertifikasi toko mitra penjual marketplace.</p>
                            </div>
                            <button
                                onClick={toggleVerification}
                                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold transition shadow-sm text-white ${
                                    seller.verified
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-green-700 hover:bg-green-800"
                                }`}
                            >
                                {seller.verified ? (
                                    <>
                                        <FaTimesCircle /> Unverify Store
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle /> Verify Store
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 text-sm">
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <span className="text-xs text-gray-400 font-semibold uppercase block tracking-wider">Tanggal Verifikasi</span>
                                <span className="text-gray-800 font-bold block mt-1.5">
                                    {seller.verifiedDate
                                        ? new Date(seller.verifiedDate).toLocaleDateString("id-ID", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : "Belum Verifikasi"}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <span className="text-xs text-gray-400 font-semibold uppercase block tracking-wider">Diverifikasi Oleh</span>
                                <span className="text-gray-800 font-bold block mt-1.5">
                                    {seller.verifiedBy || "Tidak Tersedia"}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <span className="text-xs text-gray-400 font-semibold uppercase block tracking-wider">Catatan Verifikasi</span>
                                <span className="text-gray-700 font-medium block mt-1.5 leading-relaxed">
                                    {seller.verificationNotes || "Tidak ada catatan verifikasi."}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bagian 4 & 5: Recent Products & Recent Orders Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        <SellerProducts products={recentProducts} />
                        <SellerOrders orders={recentOrders} />
                    </div>
                </>
            )}
        </div>
    );
}
