"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUser } from "@/utils/auth";
import { getSellerByUserId } from "@/services/sellerService";
import { getProductsBySeller, Product } from "@/services/productService";

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    const seller = user ? getSellerByUserId(Number(user.id)) : undefined;
    if (seller) {
      getProductsBySeller(seller.id)
        .then(setProducts)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-800">Produk Saya</h1>
        <Link
          href="/dashboard/seller/products/new"
          className="rounded-xl bg-[#145A3B] px-5 py-3 font-extrabold text-sm text-white hover:bg-green-900 transition shadow-sm text-center"
        >
          Tambah Produk
        </Link>
      </div>

      <div className="rounded-3xl bg-white p-4 sm:p-6 border border-gray-100 shadow-sm">
        {loading ? (
          <div className="py-10 text-center animate-pulse text-gray-400 font-semibold">
            Loading products...
          </div>
        ) : products.length ? (
          <div className="space-y-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 gap-4"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-extrabold text-sm sm:text-base text-gray-800 block truncate">
                    {p.name}
                  </span>
                  <span className="inline-block mt-1 bg-emerald-50 text-[#145A3B] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {p.category}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Stok</p>
                  <p className="font-extrabold text-sm sm:text-base text-gray-700 mt-0.5">
                    {p.stock} pcs
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-400 font-semibold">Belum ada produk seller ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
