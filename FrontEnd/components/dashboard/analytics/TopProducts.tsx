"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/services/productService";

interface TopProductsProps {
    products: Product[];
}

export default function TopProducts({
    products,
}: TopProductsProps) {
    const getProductImage = (product: Product) => {
        if (product.imageUrl) return product.imageUrl;
        if (product.image) {
            if (product.image.startsWith("http") || product.image.startsWith("/")) {
                return product.image;
            }
            return `http://localhost:5000/uploads/${product.image}`;
        }
        return "/images/products/placeholder.jpg";
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold">
                        Top Products
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Produk dengan penjualan terbanyak.
                    </p>
                </div>
                <Link
                    href="/dashboard/admin/products"
                    className="text-[#145A3B] font-medium"
                >
                    View All
                </Link>
            </div>
            <div className="space-y-5">
                {
                    products.map(product => (
                        <div
                            key={product.id}
                            className="flex items-center gap-4"
                        >
                            <div className="relative w-[60px] h-[60px] shrink-0">
                                <Image
                                    src={getProductImage(product)}
                                    alt={product.name}
                                    width={60}
                                    height={60}
                                    unoptimized
                                    className="rounded-xl object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold truncate">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Terjual {product.sold || 0}
                                </p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="font-semibold">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </p>
                                <p className="text-sm text-green-600 font-medium">
                                    Stock {product.stock}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
