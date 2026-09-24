"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { FaLeaf, FaShieldAlt, FaRecycle, FaHandshake, FaGem, FaArrowRight, FaCheckCircle, FaStar } from "react-icons/fa";

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
        className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-[#0b3320] bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/green-landing-bg.png')" }}
      >

        {/* Navigation Bar for Luxury Landing */}
        <header className="w-full px-6 lg:px-12 h-20 flex items-center justify-between bg-[#0b3320]/60 backdrop-blur-xl sticky top-0 z-50 border-b border-emerald-500/20 shadow-2xl">
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-lime-400 p-0.5 shadow-lg shadow-emerald-950/40">
              <div className="w-full h-full bg-[#145A3B] rounded-[14px] flex items-center justify-center text-white">
                <FaLeaf className="text-lg text-emerald-400" />
              </div>
            </div>
            <span className="text-3xl font-black tracking-tight text-white">
              <span className="text-emerald-400">Re</span>Use
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sessionStorage.setItem("has_seen_landing", "true");
                setShowLanding(false);
              }}
              className="text-emerald-200 hover:text-white font-extrabold text-xs sm:text-sm px-4 py-2 transition backdrop-blur-md bg-white/5 rounded-xl border border-white/10 hover:bg-white/15 cursor-pointer"
            >
              Jelajahi Marketplace →
            </button>
            <Link href="/login">
              <button className="bg-gradient-to-r from-emerald-400 to-lime-400 text-[#0b3320] font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl transition hover:opacity-95 shadow-lg shadow-emerald-950/40 cursor-pointer">
                Masuk
              </button>
            </Link>
          </div>
        </header>

        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-emerald-500/20 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-lime-500/15 blur-[150px] pointer-events-none" />

        {/* Hero Section */}
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2.5 bg-emerald-950/70 border border-emerald-400/30 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black tracking-widest text-emerald-300 uppercase shadow-inner mx-auto lg:mx-0 w-fit">
              <FaGem className="text-emerald-400 text-xs" />
              <span>Sustainable Luxury Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight drop-shadow-md">
              Titip Jual Berkelas, <br />
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
                Belanja Preloved Premium
              </span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Temukan barang preloved terverifikasi, fashion vintage branded, dan gaya hidup ramah lingkungan dengan garansi keamanan seller terbaik di Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2">
              <button
                onClick={() => {
                  sessionStorage.setItem("has_seen_landing", "true");
                  setShowLanding(false);
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-lime-400 text-[#0b3320] font-black text-base px-8 py-4 rounded-2xl transition duration-300 shadow-xl shadow-emerald-950/50 hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Mulai Jelajahi Koleksi</span>
                <FaArrowRight className="text-xs" />
              </button>

              <Link href="/register" className="w-full sm:w-auto">
                <button className="w-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-extrabold text-base px-8 py-4 rounded-2xl transition backdrop-blur-md shadow-sm cursor-pointer">
                  Daftar Akun Seller
                </button>
              </Link>
            </div>

            {/* Micro Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-emerald-200/80 font-bold">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400 text-xs" />
                ))}
              </div>
              <span>4.9/5 dari 10.000+ Transaksi Terverifikasi</span>
            </div>
          </div>

          <div className="flex-1 max-w-md lg:max-w-none relative shrink-0">
            <div className="relative rounded-[40px] overflow-hidden border border-emerald-400/20 shadow-2xl bg-gradient-to-b from-white/15 to-white/5 p-6 backdrop-blur-xl max-w-lg mx-auto">
              <img
                src="/images/hero1.jpg"
                alt="ReUse Premium Collection"
                className="w-full h-80 object-cover rounded-[32px] mb-6 shadow-inner"
              />
              <div className="flex justify-between items-center bg-emerald-950/60 border border-emerald-400/30 rounded-3xl p-5 backdrop-blur-md">
                <div>
                  <h4 className="font-extrabold text-white text-sm">Curated Preloved Choice</h4>
                  <p className="text-xs text-emerald-200/70 font-semibold mt-0.5">Kondisi 90%+ Mulus Terjamin</p>
                </div>
                <FaCheckCircle className="text-2xl text-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </main>

        {/* Feature Grid */}
        <section className="bg-[#082618] border-t border-emerald-800/60 py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Keunggulan Utama</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">Mengapa Memilih ReUse?</h2>
              <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-2">Standar tertinggi untuk marketplace barang bekas terpercaya</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-3xl p-8 hover:border-emerald-400/40 transition-all duration-300 backdrop-blur-md">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 text-xl mb-6 font-bold shadow-sm">
                  <FaRecycle />
                </div>
                <h4 className="text-lg font-extrabold text-white">Zero Waste & Sustainable</h4>
                <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-3 leading-relaxed">
                  Setiap transaksi memperpanjang siklus pakai produk berkualitas, mengurangi limbah tekstil, dan menekan emisi karbon.
                </p>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-3xl p-8 hover:border-emerald-400/40 transition-all duration-300 backdrop-blur-md">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 text-xl mb-6 font-bold shadow-sm">
                  <FaShieldAlt />
                </div>
                <h4 className="text-lg font-extrabold text-white">Transparansi & Kurasi Garansi</h4>
                <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-3 leading-relaxed">
                  Mitra seller diverifikasi ketat dengan panduan deskripsi kondisi fisik barang yang jujur tanpa ada yang disembunyikan.
                </p>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-3xl p-8 hover:border-emerald-400/40 transition-all duration-300 backdrop-blur-md">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 text-xl mb-6 font-bold shadow-sm">
                  <FaHandshake />
                </div>
                <h4 className="text-lg font-extrabold text-white">Kemudahan Transaksi Direct</h4>
                <p className="text-xs sm:text-sm text-emerald-200/70 font-medium mt-3 leading-relaxed">
                  Terhubung langsung dengan seller via fitur Live Chat & WhatsApp otomatis untuk negosiasi dan pengiriman cepat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer for Landing */}
        <footer className="bg-[#051a10] border-t border-emerald-900 py-8 text-center text-xs text-emerald-300/60 font-medium">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} ReUse Eco Luxury Marketplace Indonesia. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* HERO SLIDER SECTION */}
          {cmsConfig?.heroEnabled && <HeroSlider />}

          {/* FEATURED CATEGORIES SECTION */}
          {cmsConfig?.featuredCategoriesEnabled && categories.length > 0 && (
            <section className="mt-16 sm:mt-24">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
                <div>
                  <span className="text-[#145A3B] font-extrabold text-xs uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    Kategori Pilihan
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                    Koleksi Kurasi Utama
                  </h2>
                </div>
                <Link href="/categories" className="text-[#145A3B] font-extrabold text-xs sm:text-sm hover:underline flex items-center gap-1.5 group">
                  <span>Lihat Semua Kategori</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm hover:shadow-xl border border-slate-100 text-center hover:-translate-y-1 transition duration-300 group cursor-pointer flex flex-col items-center justify-between"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-emerald-50 to-lime-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-[#145A3B] font-black text-base sm:text-2xl mb-4 group-hover:scale-110 transition-transform">
                      {cat.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-xs sm:text-base group-hover:text-[#145A3B] transition-colors">{cat.name}</h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-1 line-clamp-1 font-medium">{cat.description || "Koleksi preloved terverifikasi"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* LATEST COLLECTION SECTION */}
          {cmsConfig?.latestProductsEnabled && (
            <section className="mt-16 sm:mt-24">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
                <div>
                  <span className="text-[#145A3B] font-extrabold text-xs uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    Koleksi Terbaru
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                    New Arrival Preloved
                  </h2>
                </div>
                <Link href="/products" className="text-[#145A3B] font-extrabold text-xs sm:text-sm hover:underline flex items-center gap-1.5 group">
                  <span>Lihat Semua Produk</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {loadingLatest ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-3xl overflow-hidden animate-pulse shadow-sm border border-slate-100 h-80">
                      <div className="h-48 bg-slate-100" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 w-16 bg-slate-200 rounded" />
                        <div className="h-5 bg-slate-200 rounded" />
                        <div className="h-6 w-24 bg-slate-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : errorLatest ? (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-8 text-center text-sm font-bold">
                  {errorLatest}
                </div>
              ) : latestProducts.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
                  <h3 className="text-lg font-bold text-slate-800">Koleksi Produk Terisi Otomatis</h3>
                  <p className="text-slate-400 text-xs mt-2 font-medium">Produk terbaru akan ditampilkan di sini.</p>
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
            <section className="mt-20 sm:mt-28">
              <div className="grid md:grid-cols-2 gap-8">
                {promoBanners.map((banner) => (
                  <div
                    key={banner.id}
                    className="bg-gradient-to-br from-[#0e3b26] via-[#145A3B] to-[#0A2E1E] rounded-3xl sm:rounded-[36px] p-8 sm:p-10 text-white flex items-center justify-between shadow-xl relative overflow-hidden border border-emerald-500/20 min-h-[200px]"
                  >
                    <div className="space-y-3 max-w-[65%] z-10">
                      <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full font-black uppercase tracking-wider backdrop-blur-md">
                        Promo Terbatas
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{banner.title}</h3>
                      <p className="text-xs text-emerald-100/80 font-medium leading-relaxed">{banner.subtitle}</p>
                      <Link href={banner.buttonLink || "/products"}>
                        <button className="bg-white text-[#145A3B] text-xs font-black px-6 py-3 rounded-xl mt-3 transition hover:bg-emerald-50 shadow-md cursor-pointer">
                          {banner.buttonText || "Lihat Promo"}
                        </button>
                      </Link>
                    </div>
                    <div className="w-28 h-28 sm:w-36 sm:h-36 relative overflow-hidden rounded-2xl shrink-0 border border-white/20 bg-white/5 backdrop-blur-md p-2 flex items-center justify-center">
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FEATURED PRODUCTS SECTION */}
          {cmsConfig?.popularProductsEnabled && (
            <section className="mt-20 sm:mt-28">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
                <div>
                  <span className="text-[#145A3B] font-extrabold text-xs uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    Koleksi Unggulan
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                    Populer & Paling Diminati
                  </h2>
                </div>
                <Link href="/products" className="text-[#145A3B] font-extrabold text-xs sm:text-sm hover:underline flex items-center gap-1.5 group">
                  <span>Lihat Semua Unggulan</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {loadingFeatured ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-3xl overflow-hidden animate-pulse shadow-sm border border-slate-100 h-80">
                      <div className="h-48 bg-slate-100" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 w-16 bg-slate-200 rounded" />
                        <div className="h-5 bg-slate-200 rounded" />
                        <div className="h-6 w-24 bg-slate-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : errorFeatured ? (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-8 text-center text-sm font-bold">
                  {errorFeatured}
                </div>
              ) : featuredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
                  <h3 className="text-lg font-bold text-slate-800">Produk Unggulan</h3>
                  <p className="text-slate-400 text-xs mt-2 font-medium">Produk populer akan muncul di sini setelah riwayat transaksi.</p>
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
            <section className="mt-20 sm:mt-28">
              <div className="mb-8 sm:mb-12">
                <span className="text-[#145A3B] font-extrabold text-xs uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  Rekomendasi Pintar
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                  Disesuaikan Khusus Untuk Anda
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {recommended.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* STATS SECTION */}
          {(stats.sellers >= 10 || stats.sold >= 50) && (
            <section className="mt-20 sm:mt-28">
              <div className="bg-gradient-to-tr from-[#0b3320] via-[#145A3B] to-[#1e7a50] rounded-[32px] sm:rounded-[44px] p-10 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-emerald-500/20">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
                <div className="grid md:grid-cols-3 gap-8 text-center relative z-10">
                  <div className="space-y-2">
                    <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-300">{stats.sold}+</h3>
                    <p className="text-emerald-100 text-xs sm:text-sm font-extrabold uppercase tracking-widest">Produk Preloved Terjual</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-300">{stats.sellers}+</h3>
                    <p className="text-emerald-100 text-xs sm:text-sm font-extrabold uppercase tracking-widest">Mitra Seller Terverifikasi</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-300">{(stats.sold * 0.005).toFixed(1)} Ton</h3>
                    <p className="text-emerald-100 text-xs sm:text-sm font-extrabold uppercase tracking-widest">Limbah Karbon Terkurangi</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* WHY CHOOSE REUSE SECTION */}
          <section className="mt-20 sm:mt-28">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="uppercase tracking-widest text-[#145A3B] font-extrabold text-xs bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                Ekosistem ReUse
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">Mengapa Memilih ReUse?</h2>
              <p className="mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                Standardisasi kualitas terbaik untuk transaksi barang preloved yang aman, mudah, dan berdampak positif bagi lingkungan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#145A3B] flex items-center justify-center text-xl font-bold mb-6">🌱</div>
                  <h3 className="text-lg font-extrabold text-slate-800">100% Sustainable</h3>
                  <p className="mt-3 text-slate-400 text-xs leading-relaxed font-medium">Mengurangi limbah tekstil dengan memperpanjang masa guna produk.</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#145A3B] flex items-center justify-center text-xl font-bold mb-6">🛡️</div>
                  <h3 className="text-lg font-extrabold text-slate-800">Verified Seller</h3>
                  <p className="mt-3 text-slate-400 text-xs leading-relaxed font-medium">Mitra seller melewati pengecekan profil resmi demi keamanan transaksi.</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#145A3B] flex items-center justify-center text-xl font-bold mb-6">💬</div>
                  <h3 className="text-lg font-extrabold text-slate-800">Live Chat Direct</h3>
                  <p className="mt-3 text-slate-400 text-xs leading-relaxed font-medium">Fitur pesan interaktif otomatis & obrolan WhatsApp dengan seller.</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#145A3B] flex items-center justify-center text-xl font-bold mb-6">💎</div>
                  <h3 className="text-lg font-extrabold text-slate-800">Harga Hemat Kurasi</h3>
                  <p className="mt-3 text-slate-400 text-xs leading-relaxed font-medium">Dapatkan kualitas barang branded dengan potongan harga hingga 70%.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA BANNER */}
          <section className="mt-20 sm:mt-28">
            <div className="rounded-[32px] sm:rounded-[44px] bg-gradient-to-r from-[#0b3320] via-[#145A3B] to-[#2E8B57] text-white px-8 sm:px-14 py-16 sm:py-20 text-center shadow-2xl relative overflow-hidden border border-emerald-500/20">
              <span className="uppercase tracking-[4px] text-emerald-300 font-extrabold text-xs">ReUse Sustainable Movement</span>
              <h2 className="text-3xl sm:text-5xl font-black mt-4 tracking-tight">Mulai Belanja & Titip Jual Produk Preloved</h2>
              <p className="max-w-2xl mx-auto mt-4 text-xs sm:text-sm leading-relaxed text-emerald-100/90 font-medium">
                Bergabunglah bersama ribuan pengguna yang aktif mengkampanyekan gaya hidup minim sampah demi masa depan bumi yang hijau.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8 sm:mt-10">
                <Link href="/products">
                  <button className="bg-gradient-to-r from-emerald-400 to-lime-400 text-[#0b3320] px-8 py-4 rounded-2xl font-black text-sm hover:opacity-95 transition shadow-lg shadow-emerald-950/40 cursor-pointer">
                    Belanja Produk Preloved
                  </button>
                </Link>
                <Link href="/register">
                  <button className="border border-white/30 bg-white/10 text-white px-8 py-4 rounded-2xl font-extrabold text-sm hover:bg-white/20 transition backdrop-blur-md shadow-sm cursor-pointer">
                    Daftar Sebagai Seller
                  </button>
                </Link>
              </div>
            </div>
          </section>

        </div>
        
        <Footer />
      </main>
    </>
  );
}