"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/services/productService";

interface LowStockProductsProps {
    products: Product[];
}

export default function LowStockProducts({
    products,
}: LowStockProductsProps) {
    const getProductImage = (product: Product) => {
        if (product.image) {
            if (product.image.startsWith("http") || product.image.startsWith("/") || product.image.startsWith("data:")) {
                return product.image;
            }
            return `http://localhost:5000/uploads/${product.image}`;
        }
        if (product.imageUrl) return product.imageUrl;
        return "/images/product1.jpg";
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold">
                        Low Stock
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Produk yang hampir habis.
                    </p>
                </div>
                <Link
                    href="/dashboard/admin/products"
                    className="text-[#145A3B] font-medium"
                >
                    Manage
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
                                    ID #{product.id}
                                </p>
                            </div>
                            <div className="shrink-0">
                                <span
                                    className={`
                                        px-3
                                        py-2
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        ${
                                            product.stock <= 2
                                                ? "bg-red-100 text-red-600"
                                                : "bg-yellow-100 text-yellow-700"
                                        }
                                    `}
                                >
                                    {product.stock} Stock
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
