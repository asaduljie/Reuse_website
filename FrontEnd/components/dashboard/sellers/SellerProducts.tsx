"use client";

import { Product } from "../../../services/productService";

interface Props {
    products: Product[];
}

export default function SellerProducts({ products }: Props) {
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
        <div className="bg-white rounded-[30px] shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Products</h3>
            {products.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No products found for this seller.</p>
            ) : (
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 font-semibold text-sm border-b">
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4 text-center">Price</th>
                                <th className="px-6 py-4 text-center">Stock</th>
                                <th className="px-6 py-4 text-center">Sold</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-gray-700">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
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
                                    <td className="px-6 py-4 text-center text-sm font-semibold">
                                        Rp {product.price.toLocaleString("id-ID")}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm">
                                        {product.stock} pcs
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm font-semibold">
                                        {product.sold || 0} sold
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
