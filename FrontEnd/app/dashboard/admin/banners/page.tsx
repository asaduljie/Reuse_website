"use client";

import { useMemo, useState, useEffect } from "react";
import BannerHeader from "@/components/dashboard/banners/BannerHeader";
import BannerFilter from "@/components/dashboard/banners/BannerFilter";
import BannerTable from "@/components/dashboard/banners/BannerTable";
import Pagination from "@/components/dashboard/common/Pagination";
import ConfirmDeleteModal from "@/components/dashboard/common/confirmdeleteModal";
import EmptyState from "@/components/dashboard/common/EmptyState";
import { getBanners, deleteBanner, Banner } from "@/services/bannerService";

export default function BannersPage() {
    const [search, setSearch] = useState("");
    const [positionFilter, setPositionFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("priority");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [bannersList, setBannersList] = useState<Banner[]>([]);
    const perPage = 10;

    useEffect(() => {
        setBannersList(getBanners());
    }, []);

    const filteredBanners = useMemo(() => {
        let result = [...bannersList];

        if (search) {
            const query = search.toLowerCase();
            result = result.filter((b) => b.title.toLowerCase().includes(query));
        }

        if (positionFilter !== "all") {
            result = result.filter((b) => b.position === positionFilter);
        }

        if (statusFilter !== "all") {
            result = result.filter((b) => b.status === statusFilter);
        }

        result.sort((a, b) => {
            if (sortBy === "priority") {
                return a.priority - b.priority;
            }
            if (sortBy === "position") {
                return a.position.localeCompare(b.position);
            }
            if (sortBy === "latest") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            if (sortBy === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return 0;
        });

        return result;
    }, [bannersList, search, positionFilter, statusFilter, sortBy]);

    const totalPages = Math.ceil(filteredBanners.length / perPage);
    const currentBanners = filteredBanners.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    function handleDelete(id: number) {
        setSelectedId(id);
        setDeleteOpen(true);
    }

    function confirmDelete() {
        if (selectedId === null) return;
        deleteBanner(selectedId);
        setDeleteOpen(false);
        setSelectedId(null);
        window.location.reload();
    }

    return (
        <div className="space-y-8">
            <BannerHeader />

            <BannerFilter
                search={search}
                onSearchChange={setSearch}
                positionFilter={positionFilter}
                onPositionFilterChange={setPositionFilter}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                sortBy={sortBy}
                onSortByChange={setSortBy}
            />

            {filteredBanners.length === 0 ? (
                <EmptyState
                    title="No Banners Found"
                    description="Coba ubah kata kunci pencarian atau filter Anda."
                />
            ) : (
                <>
                    <BannerTable banners={currentBanners} onDelete={handleDelete} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}

            <ConfirmDeleteModal
                open={deleteOpen}
                title="Delete Homepage Banner"
                message="Are you sure you want to permanently delete this homepage banner? This action will remove it from the home slider or promo sections immediately."
                onClose={() => {
                    setDeleteOpen(false);
                    setSelectedId(null);
                }}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
