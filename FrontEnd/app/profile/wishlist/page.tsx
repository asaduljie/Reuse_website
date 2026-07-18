"use client";

import { useEffect, useState } from "react";
import { getUser } from "../../../utils/auth";
import { getWishlist, WishlistItem } from "../../../services/wishlistService";
import AccountMenu from "../../../components/customer/AccountMenu";
import WishlistGrid from "../../../components/customer/WishlistGrid";
import { FaHeart } from "react-icons/fa";

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [userId, setUserId] = useState(4); // fallback to demo user

  const loadWishlist = () => {
    const u = getUser();
    const uid = u?.id ?? 4;
    setUserId(uid);
    setItems(getWishlist(uid));
  };

  useEffect(() => { loadWishlist(); }, []);

  const handleMoveToCart = (item: WishlistItem) => {
    // Cart integration: add to reuse_cart localStorage
    const cart = JSON.parse(localStorage.getItem("reuse_cart") || "[]");
    const exists = cart.some((c: any) => c.id === item.productId);
    if (!exists) {
      cart.push({ id: item.productId, name: item.productName, price: item.price, image: item.productImage, qty: 1 });
      localStorage.setItem("reuse_cart", JSON.stringify(cart));
    }
    // Remove from wishlist
    const { removeFromWishlist } = require("../../../services/wishlistService");
    removeFromWishlist(userId, item.productId);
    loadWishlist();
    alert(`${item.productName} ditambahkan ke cart!`);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Akun Saya</p>
          <h1 className="text-3xl font-black text-gray-900 mt-1 flex items-center gap-3">
            <FaHeart className="text-red-400" /> Wishlist Saya
          </h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">{items.length} produk favorit</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-56 shrink-0"><AccountMenu /></div>
          <div className="flex-1 min-w-0">
            <WishlistGrid items={items} userId={userId} onMoveToCart={handleMoveToCart} onUpdate={loadWishlist} />
          </div>
        </div>
      </div>
    </div>
  );
}
