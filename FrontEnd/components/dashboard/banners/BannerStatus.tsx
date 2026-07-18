"use client";

interface Props {
    status: "Draft" | "Published" | "Expired" | "Hidden";
}

export default function BannerStatus({ status }: Props) {
    const map = {
        Draft: "bg-gray-50 text-gray-600 border-gray-200",
        Published: "bg-green-50 text-green-700 border-green-200",
        Expired: "bg-red-50 text-red-700 border-red-200",
        Hidden: "bg-yellow-50 text-yellow-700 border-yellow-200",
    };
    return (
        <span className={`text-xs px-2.5 py-1.5 rounded-full font-bold border ${map[status] || "bg-gray-50 text-gray-500"}`}>
            {status}
        </span>
    );
}
