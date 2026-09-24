"use client";

import Link from "next/link";
import { FaShieldAlt, FaStar, FaLeaf } from "react-icons/fa";
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
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 group flex flex-col justify-between relative h-full">
      
      {/* Top Image Box with Gradient Background */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden bg-slate-50 aspect-square">
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          {isNew ? (
            <span className="bg-[#145A3B] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>New Arrival</span>
            </span>
          ) : (
            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
              <FaShieldAlt className="text-emerald-400 text-[10px]" />
              <span>Verified</span>
            </span>
          )}

          <span className="bg-white/90 text-slate-700 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-slate-100 flex items-center gap-1">
            <FaStar className="text-amber-400 text-[10px]" />
            <span>4.9</span>
          </span>
        </div>

        {/* Image Container with Zoom */}
        <div className="w-full h-full p-4 sm:p-6 flex items-center justify-center bg-gradient-to-b from-slate-50 to-emerald-50/20">
          <img
            src={product.imageUrl || product.image || "/images/product1.jpg"}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Soft Hover Overlay Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#145A3B]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-block bg-emerald-50 text-[#145A3B] border border-emerald-100 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              {product.category || "Fashion Preloved"}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
              <FaLeaf className="text-emerald-500 text-[9px]" />
              <span>Eco Choice</span>
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`} className="block mt-2 sm:mt-3 group/title">
            <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm lg:text-base line-clamp-2 leading-snug group-hover/title:text-[#145A3B] transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          {/* Product Description */}
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-medium">
            {product.description || "Kondisi sangat baik, kurasi terjamin ramah lingkungan."}
          </p>
        </div>

        {/* Footer Price & Action */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Harga</span>
            <span className="text-sm sm:text-lg font-black text-[#145A3B] tracking-tight">
              {formatPrice(Number(product.price))}
            </span>
          </div>

          {/* Add to Cart / Wishlist Actions */}
          <div className="mt-3">
            <ProductActions product={product} />
          </div>
        </div>

      </div>
    </div>
  );
}