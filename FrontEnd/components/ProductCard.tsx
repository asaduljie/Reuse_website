"use client";

import Link from "next/link";
import ProductActions from "./products/productActions";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  imageUrl: string;
  createdAt?: string;
  created_at?: string;
  status?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew = (() => {
    const createdStr = product.createdAt || product.created_at;
    if (!createdStr) {
      return product.id > 2;
    }
    const createdDate = new Date(createdStr);
    const diffTime = Math.abs(new Date().getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 || product.id > 2;
  })();

  const formatPrice = (price: number) => {
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200/80 group flex flex-col justify-between h-full">
      
      {/* Top Image Box */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden bg-slate-50 aspect-square">
        
        {/* New Arrival Badge */}
        {isNew && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="bg-[#145A3B] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm">
              Baru
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="w-full h-full p-4 flex items-center justify-center">
          <img
            src={product.imageUrl || product.image || "/images/product1.jpg"}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-slate-100">
        <div>
          {/* Category Pill */}
          <span className="inline-block bg-emerald-50 text-[#145A3B] border border-emerald-100 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
            {product.category || "Preloved"}
          </span>

          {/* Product Title */}
          <Link href={`/products/${product.id}`} className="block mt-2 group/title">
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-2 leading-snug group-hover/title:text-[#145A3B] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Product Description */}
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
            {product.description || "Kondisi terawat, siap kirim."}
          </p>
        </div>

        {/* Footer Price & Action */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-sm sm:text-base font-extrabold text-[#145A3B]">
              {formatPrice(product.price)}
            </span>
          </div>

          <ProductActions product={product} />
        </div>

      </div>
    </div>
  );
}