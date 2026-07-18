"use client";

import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Banner } from "../../../services/bannerService";
import BannerStatus from "./BannerStatus";
import BannerPosition from "./BannerPosition";

interface Props {
    banners: Banner[];
    onDelete: (id: number) => void;
}

export default function BannerTable({ banners, onDelete }: Props) {
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#145A3B] text-white">
                        <tr>
                            <th className="px-6 py-5 font-semibold text-sm">Image</th>
                            <th className="px-6 py-5 font-semibold text-sm">Title</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Position</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Priority</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Start Date</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">End Date</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Status</th>
                            <th className="px-6 py-5 font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                        {banners.map((banner) => (
                            <tr key={banner.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="w-16 h-12 rounded-lg overflow-hidden border bg-gray-50 relative shrink-0">
                                        <img
                                            src={banner.image}
                                            alt={banner.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=300";
                                            }}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-800 truncate max-w-[200px]" title={banner.title}>
                                            {banner.title}
                                        </h4>
                                        {banner.subtitle && (
                                            <p className="text-xs text-gray-400 truncate max-w-[200px]" title={banner.subtitle}>
                                                {banner.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <BannerPosition position={banner.position} />
                                </td>
                                <td className="px-6 py-4 text-center text-sm font-semibold">
                                    {banner.priority}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-500">
                                    {formatDate(banner.startDate)}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-500">
                                    {formatDate(banner.endDate)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <BannerStatus status={banner.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link
                                            href={`/dashboard/admin/banners/${banner.id}`}
                                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                                            title="Preview Banner"
                                        >
                                            <FaEye className="text-xs" />
                                        </Link>
                                        <Link
                                            href={`/dashboard/admin/banners/${banner.id}/edit`}
                                            className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center hover:bg-yellow-100 transition"
                                            title="Edit Banner"
                                        >
                                            <FaEdit className="text-xs" />
                                        </Link>
                                        <button
                                            onClick={() => onDelete(banner.id)}
                                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
                                            title="Delete Banner"
                                        >
                                            <FaTrash className="text-xs" />
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
