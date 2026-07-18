"use client";

import { useState } from "react";
import { WishlistItem, removeFromWishlist } from "../../services/wishlistService";
import { FaTrash, FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";

interface Props {
  items: WishlistItem[];
  userId: number;
  onMoveToCart?: (item: WishlistItem) => void;
  onUpdate: () => void;
}

export default function WishlistGrid({ items, userId, onMoveToCart, onUpdate }: Props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  let filtered = items.filter((i) => i.productName.toLowerCase().includes(search.toLowerCase()));
  if (sort === "newest") filtered = [...filtered].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  else if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  const handleRemove = (productId: number) => {
    removeFromWishlist(userId, productId);
    onUpdate();
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 relative min-w-48">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari wishlist..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 focus:outline-none focus:border-emerald-300 shadow-sm transition"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-300 shadow-sm transition"
        >
          <option value="newest">Terbaru</option>
          <option value="price-asc">Harga: Rendah ke Tinggi</option>
          <option value="price-desc">Harga: Tinggi ke Rendah</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-16 text-center">
          <FaHeart className="text-5xl text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-bold">{search ? "Tidak ada produk yang cocok" : "Wishlist masih kosong"}</p>
          <p className="text-xs text-gray-400 mt-1 font-semibold">Tambahkan produk favorit dari halaman produk</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md hover:border-emerald-100 transition">
              <div className="relative">
                <img
                  src={item.productImage || "/images/products/placeholder.jpg"}
                  alt={item.productName}
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">{item.productName}</p>
                  <p className="text-xs text-gray-400 font-semibold mt-1">oleh {item.sellerName}</p>
                </div>

                <p className="text-base font-black text-[#145A3B]">Rp {item.price.toLocaleString("id-ID")}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => onMoveToCart?.(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#145A3B] hover:bg-[#0F472E] text-white py-2.5 rounded-2xl text-xs font-bold transition"
                  >
                    <FaShoppingCart className="text-[10px]" /> Ke Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="w-9 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-2xl transition"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
