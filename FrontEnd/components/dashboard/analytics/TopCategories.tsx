"use client";

import Link from "next/link";

interface CategoryData {
    id: number;
    name: string;
    image: string;
    totalProducts: number;
}

interface Props {
    categories: CategoryData[];
}

export default function TopCategories({
    categories,
}: Props) {
    const totalProducts = categories.reduce(
        (sum, item) => sum + item.totalProducts,
        0
    );

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold">
                        Top Categories
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Berdasarkan jumlah produk.
                    </p>
                </div>
                <Link
                    href="/dashboard/admin/categories"
                    className="text-[#145A3B] font-medium"
                >
                    View All
                </Link>
            </div>
            <div className="space-y-5">
                {
                    categories.map(category => {
                        const percent =
                            totalProducts === 0
                                ? 0
                                : Math.round(
                                    (category.totalProducts /
                                        totalProducts) * 100
                                );
                        return (
                            <div
                                key={category.id}
                            >
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {category.totalProducts} Products
                                        </p>
                                    </div>
                                    <span className="font-semibold">
                                        {percent}%
                                    </span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-gray-100">
                                    <div
                                        className="h-2 rounded-full bg-[#145A3B]"
                                        style={{
                                            width: `${percent}%`
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
