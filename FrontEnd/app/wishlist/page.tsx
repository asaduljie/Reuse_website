"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { getUser } from "@/utils/auth";
import { getWishlist, removeFromWishlist, WishlistItem } from "@/services/wishlistService";
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

export default function StandaloneWishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [userId, setUserId] = useState(4); // fallback to demo user
  const [loading, setLoading] = useState(true);

  const loadWishlist = () => {
    setLoading(true);
    const u = getUser();
    const uid = u?.id ?? 4;
    setUserId(uid);
    setItems(getWishlist(uid));
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = (productId: number) => {
    removeFromWishlist(userId, productId);
    loadWishlist();
  };

  const handleMoveToCart = (item: WishlistItem) => {
    // Add to cart
    const cart = JSON.parse(localStorage.getItem("reuse_cart") || "[]");
    const exists = cart.some((c: any) => c.id === item.productId);
    if (!exists) {
      cart.push({
        id: item.productId,
        name: item.productName,
        price: item.price,
        image: item.productImage,
        qty: 1
      });
      localStorage.setItem("reuse_cart", JSON.stringify(cart));
    }
    // Remove from wishlist
    removeFromWishlist(userId, item.productId);
    loadWishlist();
    alert(`${item.productName} dimasukkan ke keranjang belanja.`);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Pilihan Anda</p>
              <h1 className="text-4xl font-black text-gray-900 mt-1 flex items-center gap-3">
                <FaHeart className="text-red-500" /> Wishlist Saya
              </h1>
              <p className="text-sm text-gray-500 font-semibold mt-1">
                Simpan produk yang Anda sukai dan beli kapan saja.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#145A3B] hover:underline"
            >
              <FaArrowLeft /> Lanjut Belanja
            </Link>
          </div>

          {/* Grid Content */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white h-80 rounded-[32px] border animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white rounded-[32px] border border-gray-100 p-16 text-center shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 text-3xl mb-6">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Wishlist Kosong</h3>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto text-sm font-semibold leading-relaxed">
                Anda belum menambahkan produk apa pun ke daftar keinginan Anda. Jelajahi katalog kami sekarang!
              </p>
              <Link
                href="/products"
                className="inline-block mt-8 bg-[#145A3B] text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#0f462d] transition"
              >
                Mulai Cari Produk
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <img
                        src={item.productImage || "/images/product1.jpg"}
                        alt={item.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/product1.jpg";
                        }}
                      />
                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-gray-400 hover:text-red-500 flex items-center justify-center shadow-sm transition"
                        title="Hapus dari Wishlist"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="p-6">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.sellerName || "Toko Penjual"}</p>
                      <h3 className="font-extrabold text-gray-800 text-lg mt-1 line-clamp-1">
                        {item.productName}
                      </h3>
                      <p className="text-[#145A3B] font-black text-xl mt-2">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full bg-[#145A3B] text-white py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#0f462d] flex items-center justify-center gap-2 transition"
                    >
                      <FaShoppingCart /> Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
