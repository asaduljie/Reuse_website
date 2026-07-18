"use client";

import { use } from "react";
import Link from "next/link";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import BannerPreview from "@/components/dashboard/banners/BannerPreview";
import BannerStatus from "@/components/dashboard/banners/BannerStatus";
import BannerPosition from "@/components/dashboard/banners/BannerPosition";
import { getBanner } from "@/services/bannerService";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function BannerDetailPage({ params }: Props) {
    const resolvedParams = use(params);
    const id = Number(resolvedParams.id);
    const banner = getBanner(id);

    if (!banner) {
        return (
            <div className="bg-white rounded-[30px] shadow-sm p-8 text-center border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-700">Banner Profile Not Found</h2>
                <p className="text-gray-500 mt-2">Banner promosi tidak ditemukan.</p>
                <Link
                    href="/dashboard/admin/banners"
                    className="inline-flex items-center gap-2 mt-4 text-[#145A3B] hover:underline font-semibold"
                >
                    <FaArrowLeft /> Kembali ke Daftar
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/dashboard/admin/banners"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#145A3B] transition font-medium"
                >
                    <FaArrowLeft />
                    <span>Kembali ke Daftar Banner</span>
                </Link>

                <Link
                    href={`/dashboard/admin/banners/${banner.id}/edit`}
                    className="inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-3 rounded-xl font-semibold transition shadow-sm"
                >
                    <FaEdit />
                    <span>Edit Banner</span>
                </Link>
            </div>

            <div className="bg-white rounded-[30px] shadow-sm p-8 border border-gray-100 space-y-8">
                <h3 className="text-2xl font-bold text-gray-800">Banner Details</h3>

                <div className="max-w-2xl">
                    <BannerPreview
                        title={banner.title}
                        subtitle={banner.subtitle}
                        description={banner.description}
                        image={banner.image}
                        buttonText={banner.buttonText}
                        position={banner.position}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-1">
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Button Link URL</span>
                        <span className="text-gray-800 font-semibold block bg-gray-50 p-3 rounded-xl border">
                            {banner.buttonLink}
                        </span>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Priority (Order)</span>
                        <span className="text-gray-800 font-semibold block bg-gray-50 p-3 rounded-xl border">
                            Rank #{banner.priority}
                        </span>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Jadwal Tayang (Start)</span>
                        <span className="text-gray-800 font-semibold block bg-gray-50 p-3 rounded-xl border">
                            {new Date(banner.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Jadwal Tayang (End)</span>
                        <span className="text-gray-800 font-semibold block bg-gray-50 p-3 rounded-xl border">
                            {new Date(banner.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Status Tayang</span>
                        <div className="bg-gray-50 p-3 rounded-xl border flex items-center">
                            <BannerStatus status={banner.status} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">Posisi Banner</span>
                        <div className="bg-gray-50 p-3 rounded-xl border flex items-center">
                            <BannerPosition position={banner.position} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
