"use client";

import { Product } from "../../../services/productService";
import StatusBadge from "../common/statusBadge";

interface Props {
    products: (Product & { categoryName: string; sellerName: string; revenue: number })[];
}

export default function ProductReportTable({ products }: Props) {
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
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                        <tr>
                            <th className="px-6 py-4">Produk</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4">Seller</th>
                            <th className="px-6 py-4 text-center">Stock</th>
                            <th className="px-6 py-4 text-center">Sold</th>
                            <th className="px-6 py-4 text-center">Revenue</th>
                            <th className="px-6 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={getProductImage(product)}
                                            alt={product.name}
                                            className="w-12 h-12 rounded-xl object-cover border"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/images/products/placeholder.jpg";
                                            }}
                                        />
                                        <div>
                                            <h4 className="font-semibold text-sm truncate max-w-[200px]" title={product.name}>
                                                {product.name}
                                            </h4>
                                            <p className="text-xs text-gray-400">ID: #{product.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-sm font-semibold text-gray-800">
                                    {product.categoryName}
                                </td>
                                <td className="px-6 py-5 text-sm font-medium">
                                    {product.sellerName}
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {product.stock} pcs
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-semibold">
                                    {product.sold || 0} sold
                                </td>
                                <td className="px-6 py-5 text-center text-sm font-bold text-gray-900">
                                    Rp {product.revenue.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <StatusBadge status={product.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
