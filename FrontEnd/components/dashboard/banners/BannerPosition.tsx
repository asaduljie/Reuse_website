"use client";

interface Props {
    position: "Hero" | "Homepage Promo" | "Flash Sale" | "Category Banner" | "Footer Banner";
}

export default function BannerPosition({ position }: Props) {
    const map = {
        Hero: "bg-blue-50 text-blue-700 border-blue-200",
        "Homepage Promo": "bg-purple-50 text-purple-700 border-purple-200",
        "Flash Sale": "bg-red-50 text-red-700 border-red-200",
        "Category Banner": "bg-yellow-50 text-yellow-700 border-yellow-200",
        "Footer Banner": "bg-gray-50 text-gray-700 border-gray-200",
    };
    return (
        <span className={`text-xs px-2.5 py-1.5 rounded-full font-semibold border ${map[position] || "bg-gray-50 text-gray-500"}`}>
            {position}
        </span>
    );
}
