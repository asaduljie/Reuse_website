"use client";

import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface Props {
    title?: string;
    description?: string;
    buttonText?: string;
    addUrl?: string;
}

export default function BannerHeader({
    title = "Banners",
    description = "Kelola seluruh banner promosi dan flash sale yang tampil di homepage.",
    buttonText = "Create Banner",
    addUrl = "/dashboard/admin/banners/create",
}: Props) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-500 mt-2">{description}</p>
            </div>
            {addUrl && (
                <Link href={addUrl}>
                    <button className="bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-sm transition shrink-0">
                        <FaPlus className="text-xs" />
                        <span>{buttonText}</span>
                    </button>
                </Link>
            )}
        </div>
    );
}
