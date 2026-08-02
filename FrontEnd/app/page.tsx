"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { FaLeaf } from "react-icons/fa";

import {
  getLatestProducts,
  getFeaturedProducts,
  Product,
} from "../services/productService";
import { getHomepageConfig, HomepageConfig } from "../services/homepageService";
import { getCategories, Category } from "../services/categoryService";
import { getBanners, Banner } from "../services/bannerService";
import { getRecommendedForYou } from "../services/recommendationService";
import { getSellerProfiles } from "../services/sellerService";
import { getOrders } from "../services/orderService";

export default function HomePage() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promoBanners, setPromoBanners] = useState<Banner[]>([]);
  const [cmsConfig, setCmsConfig] = useState<HomepageConfig | null>(null);
  const [stats, setStats] = useState<{ sellers: number; sold: number }>({ sellers: 0, sold: 0 });

  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorLatest, setErrorLatest] = useState("");
  const [errorFeatured, setErrorFeatured] = useState("");
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const { isLoggedIn } = require("../utils/auth");
    const hasSeen = sessionStorage.getItem("has_seen_landing");
    if (!isLoggedIn() && !hasSeen) {
      setShowLanding(true);
    }

    loadLatestProducts();
    loadFeaturedProducts();

    // Load configs from local services
    setCmsConfig(getHomepageConfig());
    setCategories(getCategories().slice(0, 4));
    setPromoBanners(getBanners().filter((b) => b.position === "Homepage Promo" && b.status === "Published"));
    
    const loadRecommendations = async () => {
      const { getUser } = require("../utils/auth");
      const userId = getUser()?.id || 4;
      const recs = await getRecommendedForYou(userId);
      setRecommended(recs);
    };
    loadRecommendations();

    const fetchRealStats = async () => {
      try {
        const sellersList = getSellerProfiles();
        const ordersList = await getOrders();
        const totalSold = ordersList.reduce((acc, order) => {
          return acc + (order.items ? order.items.reduce((s, i) => s + (i.quantity || 1), 0) : 1);
        }, 0);
        setStats({
          sellers: sellersList.length,
          sold: totalSold,
        });
      } catch (e) {
        // ignore
      }
    };
    fetchRealStats();
  }, []);

  const loadLatestProducts = async () => {
    try {
      setLoadingLatest(true);
      const response = await getLatestProducts();
      if (response.data.success) {
        setLatestProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      setErrorLatest("Gagal memuat produk terbaru.");
    } finally {
      setLoadingLatest(false);
    }
  };

  const loadFeaturedProducts = async () => {
    try {
      setLoadingFeatured(true);
      const response = await getFeaturedProducts();
      if (response.data.success) {
        setFeaturedProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      setErrorFeatured("Gagal memuat produk unggulan.");
    } finally {
      setLoadingFeatured(false);
    }
  };

  if (showLanding) {
    return (
      <div 
        className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-[#145A3B] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/green-landing-bg.png')" }}
      >

        {/* Navigation Bar for Landing */}
        <header className="w-full px-6 lg:px-12 h-20 flex items-center justify-between bg-[#145A3B]/40 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
          <Link href="/" className="flex items-center gap-1 select-none">
            <span className="text-3xl font-black tracking-tight">
              <span className="text-[#2ecc71]">Re</span>
              <span className="text-white">Use</span>
            </span>
          </Link>
          <div className="flex gap-4">
            <button
              onClick={() => {
                sessionStorage.setItem("has_seen_landing", "true");
                setShowLanding(false);
              }}
              className="text-emerald-100 hover:text-white font-bold text-sm px-4 py-2 transition"
            >
              Jelajahi Produk
            </button>
            <Link href="/login">
              <button className="bg-white text-[#145A3B] font-extrabold text-sm px-6 py-2.5 rounded-2xl transition hover:bg-emerald-50 shadow-md">
                Masuk
              </button>
            </Link>
          </div>
        </header>

        {/* Ambient blobs */}
        <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-emerald-700/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-green-700/20 blur-[100px] pointer-events-none" />

        {/* Hero Section */}
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <span className="inline-block bg-emerald-800/40 text-emerald-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-emerald-700/40">
              Sustainable circular economy
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Titip Jual Tanpa Ribet, <span className="bg-gradient-to-r from-[#2ecc71] to-[#a3e635] bg-clip-text text-transparent">Belanja Preloved</span> Terpercaya
            </h1>
            <p className="text-base lg:text-lg text-emerald-100/90 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Kurangi limbah, hemat pengeluaran, dan temukan produk berkualitas terverifikasi dari seller tepercaya. Mulai langkah ramah lingkungan Anda hari ini bersama ReUse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => {
                  sessionStorage.setItem("has_seen_landing", "true");
                  setShowLanding(false);
                }}
                className="bg-white hover:bg-emerald-50 text-[#145A3B] font-extrabold text-base px-8 py-4 rounded-2xl transition duration-300 shadow-lg shadow-emerald-950/20 hover:scale-[1.01]"
              >
                Mulai Jelajahi
              </button>
              <Link href="/register">
                <button className="bg-transparent border border-white/30 text-white font-extrabold text-base px-8 py-4 rounded-2xl transition hover:bg-white/10 shadow-sm">
                  Daftar Akun Baru
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 max-w-md lg:max-w-none relative shrink-0">
            <div className="relative rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl bg-white p-6 max-w-lg mx-auto">
              <img
                src="/images/sellers/reuse-banner.jpg"
                alt="ReUse Circular Economy Mockup"
                className="w-full h-80 object-cover rounded-[32px] mb-6"
              />
              <div className="flex justify-between items-center bg-emerald-50/50 border border-emerald-100 rounded-3xl p-5">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">Barang Preloved</h4>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Pilihan Barang Bekas Berkualitas Terbaik</p>
                </div>
                <FaLeaf className="text-2xl text-[#145A3B] animate-pulse" />
              </div>
            </div>
          </div>
        </main>

        {/* Feature Grid */}
        <section className="bg-white border-t border-gray-100 py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Mengapa Memilih ReUse?</h2>
              <p className="text-sm text-slate-400 font-semibold mt-2">Platform tepercaya untuk gaya hidup yang lebih berkelanjutan</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 border border-slate-100/50 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#145A3B] text-xl mb-6 font-bold shadow-sm">
                  🌱
                </div>
                <h4 className="text-lg font-extrabold text-gray-800">100% Ramah Lingkungan</h4>
                <p className="text-sm text-slate-500 font-medium mt-3 leading-relaxed">
                  Setiap transaksi memperpanjang siklus pakai produk, mengurangi konsumsi barang baru, dan menurunkan emisi karbon global.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100/50 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#145A3B] text-xl mb-6 font-bold shadow-sm">
                  🛡️
                </div>
                <h4 className="text-lg font-extrabold text-gray-800">Kondisi Terjamin</h4>
                <p className="text-sm text-slate-500 font-medium mt-3 leading-relaxed">
                  Kami memverifikasi seller dan memberikan panduan deskripsi kondisi barang yang transparan agar tidak ada kejutan tak menyenangkan.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100/50 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#145A3B] text-xl mb-6 font-bold shadow-sm">
                  🤝
                </div>
                <h4 className="text-lg font-extrabold text-gray-800">Seller Terpercaya</h4>
                <p className="text-sm text-slate-500 font-medium mt-3 leading-relaxed">
                  Seluruh mitra penjual terdaftar melewati proses verifikasi demi menjamin keaslian, kejujuran, dan kepuasan transaksi Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs border-t border-slate-800 font-semibold">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} ReUse Eco-Friendly Marketplace. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FA] relative">


        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-10">
          
          {/* HERO SLIDER SECTION */}
          {cmsConfig?.heroEnabled && <HeroSlider />}

          {/* FEATURED CATEGORIES SECTION */}
          {cmsConfig?.featuredCategoriesEnabled && categories.length > 0 && (
            <section className="mt-20">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <p className="text-[#145A3B] font-semibold uppercase tracking-widest">Kategori Pilihan</p>
                  <h2 className="text-xl sm:text-4xl font-black text-gray-900 mt-2">Featured Categories</h2>
                </div>
                <Link href="/categories" className="text-[#145A3B] font-bold text-sm hover:underline">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center hover:scale-105 hover:shadow-md transition duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-[#145A3B] font-black text-sm sm:text-lg mb-3 sm:mb-4">
                      {cat.name.charAt(0)}
                    </div>
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm truncate">{cat.name}</h4>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1 line-clamp-1">{cat.description || "Lihat produk pilihan"}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* LATEST COLLECTION SECTION */}
          {cmsConfig?.latestProductsEnabled && (
            <section className="mt-20">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <p className="text-[#145A3B] font-semibold uppercase tracking-widest text-xs">New Arrival</p>
                  <h2 className="text-xl sm:text-4xl font-black text-gray-900 mt-2">Latest Collection</h2>
                </div>
                <Link href="/products" className="text-[#145A3B] font-bold text-sm hover:underline">
                  View All →
                </Link>
              </div>
              
              {loadingLatest ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-3xl overflow-hidden animate-pulse shadow-sm">
                      <div className="h-40 sm:h-56 lg:h-72 bg-gray-200" />
                      <div className="p-4 sm:p-6">
                        <div className="h-4 w-16 rounded bg-gray-200 mb-4" />
                        <div className="h-5 rounded bg-gray-200 mb-3" />
                        <div className="h-3 rounded bg-gray-200 mb-2" />
                        <div className="h-3 w-2/3 rounded bg-gray-200 mb-5" />
                        <div className="h-8 w-24 rounded bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : errorLatest ? (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-8 text-center text-sm">
                  {errorLatest}
                </div>
              ) : latestProducts.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm p-16 text-center">
                  <h3 className="text-xl font-bold">Belum Ada Produk</h3>
                  <p className="text-gray-500 text-sm mt-3">Produk terbaru akan muncul di sini setelah seller mengunggah produk.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {latestProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* PROMO BANNER SECTION */}
          {cmsConfig?.promoBannerEnabled && promoBanners.length > 0 && (
            <section className="mt-24">
              <div className="grid md:grid-cols-2 gap-8">
                {promoBanners.map((banner) => (
                  <div
                    key={banner.id}
                    className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl p-8 text-white flex items-center justify-between shadow-sm relative overflow-hidden min-h-[180px]"
                  >
                    <div className="space-y-4 max-w-[60%] z-10">
                      <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Promo</span>
                      <h3 className="text-2xl font-bold">{banner.title}</h3>
                      <p className="text-xs text-green-100 font-medium leading-relaxed">{banner.subtitle}</p>
                      <Link href={banner.buttonLink}>
                        <button className="bg-white text-emerald-800 text-xs font-bold px-5 py-3 rounded-xl mt-2 transition hover:bg-green-50 shadow-sm">
                          {banner.buttonText}
                        </button>
                      </Link>
                    </div>
                    <div className="w-24 h-24 relative overflow-hidden rounded-2xl shrink-0 border border-white/20">
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FEATURED PRODUCTS SECTION */}
          {cmsConfig?.popularProductsEnabled && (
            <section className="mt-24">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <p className="text-[#145A3B] font-semibold uppercase tracking-widest text-xs">Featured</p>
                  <h2 className="text-xl sm:text-4xl font-black text-gray-900 mt-2">Popular Products</h2>
                </div>
                <Link href="/products" className="text-[#145A3B] font-bold text-sm hover:underline">
                  View All →
                </Link>
              </div>
              
              {loadingFeatured ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-3xl overflow-hidden animate-pulse shadow-sm">
                      <div className="h-40 sm:h-56 lg:h-72 bg-gray-200" />
                      <div className="p-4 sm:p-6">
                        <div className="h-4 w-16 rounded bg-gray-200 mb-4" />
                        <div className="h-5 rounded bg-gray-200 mb-3" />
                        <div className="h-3 rounded bg-gray-200 mb-2" />
                        <div className="h-3 w-2/3 rounded bg-gray-200 mb-5" />
                        <div className="h-8 w-24 rounded bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : errorFeatured ? (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-8 text-center text-sm">
                  {errorFeatured}
                </div>
              ) : featuredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm p-16 text-center">
                  <h3 className="text-xl font-bold">Belum Ada Produk</h3>
                  <p className="text-gray-500 text-sm mt-3">Produk populer akan muncul di sini setelah ada riwayat pembelian/favorit.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {featuredProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* PERSONALIZED RECOMMENDATION SECTION */}
          {recommended.length > 0 && (
            <section className="mt-28">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <p className="text-[#145A3B] font-semibold uppercase tracking-widest text-xs">Recommended for You</p>
                  <h2 className="text-xl sm:text-4xl font-black text-gray-900 mt-2">Disesuaikan Untuk Anda</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {recommended.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* STATS SECTION - Automatically appears when real sellers count >= 10 OR sold products >= 50 */}
          {(stats.sellers >= 10 || stats.sold >= 50) && (
            <section className="mt-28">
              <div className="bg-gradient-to-tr from-[#145A3B] to-[#1e7a50] rounded-[40px] p-12 text-white shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                <div className="grid md:grid-cols-3 gap-10 text-center relative z-10">
                  <div className="space-y-2">
                    <h3 className="text-5xl font-black">{stats.sold}+</h3>
                    <p className="text-green-100 text-sm font-semibold uppercase tracking-wider">Produk Terjual</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-black">{stats.sellers}+</h3>
                    <p className="text-green-100 text-sm font-semibold uppercase tracking-wider">Seller Terdaftar</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-black">{(stats.sold * 0.005).toFixed(1)} Ton</h3>
                    <p className="text-green-100 text-sm font-semibold uppercase tracking-wider">Limbah Karbon Terkurangi</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* WHY CHOOSE REUSE SECTION */}
          <section className="mt-28">
            <div className="text-center mb-16">
              <p className="uppercase tracking-widest text-[#145A3B] font-semibold">Why ReUse</p>
              <h2 className="text-4xl font-bold mt-3">Mengapa Memilih ReUse?</h2>
              <p className="mt-5 text-gray-500 max-w-3xl mx-auto leading-8">
                ReUse membantu memperpanjang umur barang berkualitas melalui marketplace yang aman, terpercaya, dan ramah lingkungan.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-[#145A3B]">Sustainable</h3>
                <p className="mt-4 text-gray-500 leading-7">Mengurangi limbah dengan memperpanjang siklus hidup produk.</p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-[#145A3B]">Trusted Seller</h3>
                <p className="mt-4 text-gray-500 leading-7">Semua seller telah melalui proses verifikasi.</p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-[#145A3B]">Fast Transaction</h3>
                <p className="mt-4 text-gray-500 leading-7">Proses transaksi mudah melalui WhatsApp dengan seller.</p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-[#145A3B]">Affordable Price</h3>
                <p className="mt-4 text-gray-500 leading-7">Harga lebih hemat dibandingkan membeli produk baru.</p>
              </div>
            </div>
          </section>



          {/* FAQ SECTION */}
          {cmsConfig?.faqEnabled && cmsConfig.faq.length > 0 && (
            <section className="mt-28">
              <div className="text-center mb-16">
                <p className="uppercase tracking-widest text-[#145A3B] font-semibold">FAQ</p>
                <h2 className="text-4xl font-bold mt-3">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {cmsConfig.faq.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 text-base">{item.question}</h4>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA SECTION */}
          <section className="mt-28">
            <div className="rounded-[40px] bg-gradient-to-r from-[#145A3B] to-[#2E8B57] text-white px-10 py-20 text-center">
              <p className="uppercase tracking-[5px] text-green-200">ReUse Marketplace</p>
              <h2 className="text-5xl font-bold mt-5">Mulai Belanja Produk Preloved Berkualitas</h2>
              <p className="max-w-3xl mx-auto mt-8 leading-8 text-green-100">
                Temukan berbagai produk pilihan dengan harga terbaik serta ikut mendukung gaya hidup berkelanjutan.
              </p>
              <div className="flex flex-wrap justify-center gap-5 mt-10">
                <Link href="/products">
                  <button className="bg-white text-[#145A3B] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition shadow-sm">
                    Belanja Sekarang
                  </button>
                </Link>
                <Link href="/register">
                  <button className="border border-white px-8 py-4 rounded-2xl hover:bg-white hover:text-[#145A3B] transition shadow-sm">
                    Menjadi Seller
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* NEWSLETTER SECTION */}
          <section className="mt-28 mb-24">
            <div className="bg-white rounded-[40px] shadow-sm p-12">
              <div className="text-center">
                <p className="uppercase tracking-widest text-[#145A3B] font-semibold">Newsletter</p>
                <h2 className="text-4xl font-bold mt-4">Dapatkan Informasi Produk Terbaru</h2>
                <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
                  Berlangganan newsletter untuk mendapatkan update produk terbaru serta promo menarik dari ReUse.
                </p>
              </div>
              <div className="max-w-3xl mx-auto mt-10 flex flex-col md:flex-row gap-5">
                <input
                  type="email"
                  placeholder="Masukkan Email Anda"
                  className="flex-1 border rounded-2xl px-6 py-4 outline-none text-sm text-gray-700"
                />
                <button className="bg-[#145A3B] text-white px-8 rounded-2xl hover:bg-green-900 transition py-4 font-bold text-sm shadow-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </section>

        </div>
        <Footer />
      </main>
    </>
  );
}