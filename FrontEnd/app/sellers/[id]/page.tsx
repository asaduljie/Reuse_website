"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import ProductCard from "../../../components/ProductCard";
import { getSellerProfile, SellerProfile } from "../../../services/sellerService";
import { getProducts, Product } from "../../../services/productService";
import { sendChatMessage } from "../../../services/sellerChatService";
import {
  FaCheckCircle,
  FaStar,
  FaMapMarkerAlt,
  FaPlus,
  FaCheck,
  FaComments,
  FaShoppingBag,
  FaClock,
  FaSearch,
  FaArrowLeft,
  FaStore
} from "react-icons/fa";

interface SellerProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function SellerProfilePage({ params }: SellerProfilePageProps) {
  const resolvedParams = use(params);
  const sellerId = Number(resolvedParams.id) || 3;

  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1280);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = getSellerProfile(sellerId) || {
      id: sellerId,
      userId: sellerId,
      storeName: sellerId === 3 ? "ReUse Store" : `Toko Thrift #${sellerId}`,
      description: "Toko resmi penjual barang bekas berkualitas tinggi & terverifikasi. Kami menjamin semua produk yang dijual dalam kondisi layak pakai dan bergaransi.",
      logo: sellerId === 3 ? "/images/sellers/reuse-logo.png" : "/images/product1.jpg",
      banner: sellerId === 3 ? "/images/sellers/reuse-banner.jpg" : "/images/hero1.jpg",
      address: "Jl. Sudirman No. 123",
      city: "Makassar",
      province: "Sulawesi Selatan",
      verified: true,
      rating: 4.8,
      totalSales: 45,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };

    setSeller(profile);

    const loadProducts = async () => {
      try {
        const response = await getProducts();
        if (response.data?.success) {
          const allProds: Product[] = response.data.products;
          const matched = allProds.filter((p) => p.sellerId === sellerId || sellerId === 3);
          setSellerProducts(matched.length > 0 ? matched : allProds.slice(0, 8));
          setFilteredProducts(matched.length > 0 ? matched : allProds.slice(0, 8));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [sellerId]);

  useEffect(() => {
    let result = sellerProducts;
    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "Semua") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sellerProducts]);

  const toggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  const handleStartChat = () => {
    if (!seller) return;
    sendChatMessage(seller.id, `Halo ${seller.storeName} 👋, saya melihat profil toko Anda dan ingin bertanya mengenai produk.`);
    window.dispatchEvent(new CustomEvent("open_seller_chat", { detail: { sellerId: seller.id } }));
  };

  const categories = ["Semua", ...Array.from(new Set(sellerProducts.map((p) => p.category)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#145A3B] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#145A3B] mb-6 transition"
        >
          <FaArrowLeft /> Kembali ke Katalog Produk
        </Link>

        {/* STORE HEADER CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          {/* Banner */}
          <div className="h-44 sm:h-64 bg-gradient-to-r from-[#145A3B] to-[#1e7a50] relative overflow-hidden">
            {seller?.banner ? (
              <img
                src={seller.banner}
                alt="Store Banner"
                className="w-full h-full object-cover opacity-60"
              />
            ) : (
              <div className="absolute inset-0 bg-emerald-900/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Profile Info Bar */}
          <div className="px-6 sm:px-10 pb-8 relative -mt-16 sm:-mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              {/* Left: Avatar & Title */}
              <div className="flex items-end gap-5">
                <div className="relative">
                  <img
                    src={seller?.logo || "/images/sellers/reuse-logo.png"}
                    alt={seller?.storeName}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
                  />
                  {seller?.verified && (
                    <div
                      title="Toko Terverifikasi"
                      className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-md border-2 border-white"
                    >
                      <FaCheckCircle className="text-base sm:text-lg" />
                    </div>
                  )}
                </div>

                <div className="mb-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                      {seller?.storeName}
                    </h1>
                    {seller?.verified && (
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                        <FaCheckCircle className="text-emerald-600" /> Terverifikasi
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 font-semibold mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <FaMapMarkerAlt className="text-[#145A3B]" /> {seller?.city || "Makassar"}, {seller?.province || "Indonesia"}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <FaStar /> {seller?.rating || 4.8} / 5.0 (120+ Ulasan)
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <FaClock /> Online 5 min lalu
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons (+ Ikuti Toko & Chat Seller) */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={toggleFollow}
                  className={`px-5 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2 transition cursor-pointer shadow-sm ${
                    isFollowing
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                      : "bg-[#145A3B] text-white hover:bg-emerald-900 shadow-emerald-950/20"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <FaCheck className="text-xs" /> Mengikuti
                    </>
                  ) : (
                    <>
                      <FaPlus className="text-xs" /> Ikuti Toko
                    </>
                  )}
                </button>

                <button
                  onClick={handleStartChat}
                  className="bg-emerald-50 text-[#145A3B] hover:bg-emerald-100 border border-emerald-200 px-5 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <FaComments className="text-base" /> Chat Seller
                </button>
              </div>
            </div>

            {/* Store Description & Stats Grid */}
            <div className="mt-8 pt-6 border-t border-gray-100 grid md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">Tentang Toko</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {seller?.description || "Toko resmi penjual barang bekas berkualitas tinggi & terverifikasi di marketplace ReUse."}
                </p>
              </div>

              <div className="bg-[#F7F8FA] rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#145A3B] flex items-center justify-center text-lg">
                  <FaShoppingBag />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Produk Terjual</p>
                  <p className="text-xl font-black text-gray-800">{seller?.totalSales || 45}+ Produk</p>
                </div>
              </div>

              <div className="bg-[#F7F8FA] rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
                  <FaStar />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Pengikut Toko</p>
                  <p className="text-xl font-black text-gray-800">{followerCount.toLocaleString("id-ID")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SELLER PRODUCTS CATALOG */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                <FaStore className="text-[#145A3B]" /> Barang yang Dijual oleh {seller?.storeName}
              </h2>
              <p className="text-gray-500 text-xs font-bold mt-1">
                Menampilkan {filteredProducts.length} produk pilihan dari toko ini
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Cari di toko ini..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs font-bold outline-none focus:border-[#145A3B] w-48 sm:w-60 shadow-xs"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-[#145A3B] text-white shadow-xs"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
              <p className="text-gray-400 font-bold text-base">Tidak ada produk yang sesuai pencarian di toko ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
