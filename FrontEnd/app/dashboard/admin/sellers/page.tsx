"use client";

import { useMemo, useState, useEffect } from "react";
import SellerHeader from "@/components/dashboard/sellers/SellerHeader";
import SellerFilter from "@/components/dashboard/sellers/SellerFilter";
import SellerTable, { SellerWithStats } from "@/components/dashboard/sellers/SellerTable";
import Pagination from "@/components/dashboard/common/Pagination";
import ConfirmDeleteModal from "@/components/dashboard/common/confirmdeleteModal";
import EmptyState from "@/components/dashboard/common/EmptyState";
import { getSellerProfiles, deleteSellerProfile, getSellerStatistics } from "@/services/sellerService";
import { getUser } from "@/services/userService";
import { FaStore, FaCheckCircle, FaUsers, FaDollarSign, FaStar } from "react-icons/fa";

export default function SellersPage() {
    const [search, setSearch] = useState("");
    const [verifiedFilter, setVerifiedFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Dynamic stats and sellers state
    const [sellersList, setSellersList] = useState<SellerWithStats[]>([]);
    const [stats, setStats] = useState({
        totalSeller: 0,
        verifiedSeller: 0,
        activeSeller: 0,
        totalRevenue: 0,
        averageRating: 0,
    });
    const [loading, setLoading] = useState(true);

    const perPage = 10;

    useEffect(() => {
        const loadSellersData = async () => {
            setLoading(true);
            const profiles = getSellerProfiles();

            // Enrich each profile with stats and owner user info
            const enriched = await Promise.all(
                profiles.map(async (seller) => {
                    const sellerStats = await getSellerStatistics(seller.id);
                    const user = getUser(seller.userId);
                    return {
                        ...seller,
                        ownerName: user?.name || "Unknown Owner",
                        email: user?.email || "Unknown Email",
                        productsCount: sellerStats.totalProducts,
                        ordersCount: sellerStats.totalOrders,
                        revenue: sellerStats.revenue,
                    };
                })
            );

            setSellersList(enriched);

            // Calculate statistics summary
            const totalSeller = enriched.length;
            const verifiedSeller = enriched.filter((s) => s.verified).length;
            const activeSeller = enriched.filter((s) => s.status === "active").length;
            const totalRevenue = enriched.reduce((sum, s) => sum + s.revenue, 0);
            const averageRating = totalSeller > 0 ? enriched.reduce((sum, s) => sum + s.rating, 0) / totalSeller : 0;

            setStats({
                totalSeller,
                verifiedSeller,
                activeSeller,
                totalRevenue,
                averageRating,
            });

            setLoading(false);
        };

        loadSellersData();
    }, []);

    // Filter, search and sort
    const filteredSellers = useMemo(() => {
        let result = [...sellersList];

        if (search) {
            const query = search.toLowerCase();
            result = result.filter(
                (seller) =>
                    seller.storeName.toLowerCase().includes(query) ||
                    seller.ownerName.toLowerCase().includes(query) ||
                    seller.city.toLowerCase().includes(query) ||
                    seller.email.toLowerCase().includes(query)
            );
        }

        if (verifiedFilter !== "all") {
            const expectVerified = verifiedFilter === "verified";
            result = result.filter((seller) => seller.verified === expectVerified);
        }

        if (statusFilter !== "all") {
            result = result.filter((seller) => seller.status === statusFilter);
        }

        // Sorting
        result.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            if (sortBy === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            if (sortBy === "revenue") {
                return b.revenue - a.revenue;
            }
            if (sortBy === "products") {
                return b.productsCount - a.productsCount;
            }
            if (sortBy === "rating") {
                return b.rating - a.rating;
            }
            return 0;
        });

        return result;
    }, [sellersList, search, verifiedFilter, statusFilter, sortBy]);

    const totalPages = Math.ceil(filteredSellers.length / perPage);
    const currentSellers = filteredSellers.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    function handleDelete(id: number) {
        setSelectedId(id);
        setDeleteOpen(true);
    }

    function confirmDelete() {
        if (selectedId === null) return;
        deleteSellerProfile(selectedId);
        setDeleteOpen(false);
        setSelectedId(null);
        window.location.reload();
    }

    return (
        <div className="space-y-8">
            <SellerHeader />

            {/* Statistics Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center border border-gray-100">
                    <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Sellers</p>
                        <h2 className="text-2xl font-bold mt-2 text-gray-800">{stats.totalSeller}</h2>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#145A3B] flex items-center justify-center text-lg border border-emerald-100">
                        <FaStore />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center border border-gray-100">
                    <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Verified</p>
                        <h2 className="text-2xl font-bold mt-2 text-gray-800">{stats.verifiedSeller}</h2>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100">
                        <FaCheckCircle />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center border border-gray-100">
                    <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Active</p>
                        <h2 className="text-2xl font-bold mt-2 text-gray-800">{stats.activeSeller}</h2>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg border border-purple-100">
                        <FaUsers />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center border border-gray-100">
                    <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Revenue</p>
                        <h2 className="text-xl font-bold mt-2 text-gray-800 truncate max-w-[120px]" title={`Rp ${stats.totalRevenue.toLocaleString("id-ID")}`}>
                            Rp {stats.totalRevenue.toLocaleString("id-ID")}
                        </h2>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-lg border border-yellow-100">
                        <FaDollarSign />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center border border-gray-100 col-span-2 lg:col-span-1">
                    <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Avg Rating</p>
                        <h2 className="text-2xl font-bold mt-2 text-gray-800">{stats.averageRating.toFixed(1)} / 5.0</h2>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-lg border border-orange-100">
                        <FaStar />
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <SellerFilter
                search={search}
                onSearchChange={(val) => {
                    setSearch(val);
                    setCurrentPage(1);
                }}
                verifiedFilter={verifiedFilter}
                onVerifiedFilterChange={(val) => {
                    setVerifiedFilter(val);
                    setCurrentPage(1);
                }}
                statusFilter={statusFilter}
                onStatusFilterChange={(val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                }}
                sortBy={sortBy}
                onSortByChange={(val) => {
                    setSortBy(val);
                    setCurrentPage(1);
                }}
            />

            {/* Content Table / Empty State */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#145A3B] mx-auto"></div>
                    <p className="text-gray-500 mt-4 font-semibold">Loading sellers data...</p>
                </div>
            ) : filteredSellers.length === 0 ? (
                <EmptyState
                    title="No Sellers Found"
                    description="Coba ubah kata kunci pencarian atau filter Anda."
                />
            ) : (
                <>
                    <SellerTable sellers={currentSellers} onDelete={handleDelete} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}

            <ConfirmDeleteModal
                open={deleteOpen}
                title="Delete Store Profile"
                message="Are you sure you want to permanently delete this store profile? All connected products might need alignment. This action cannot be undone."
                onClose={() => {
                    setDeleteOpen(false);
                    setSelectedId(null);
                }}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
