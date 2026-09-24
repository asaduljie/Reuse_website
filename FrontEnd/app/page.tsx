"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { FaLeaf, FaShieldAlt, FaRecycle, FaHandshake, FaArrowRight } from "react-icons/fa";

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
        className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-[#145A3B] bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/green-landing-bg.png')" }}
      >

        {/* Navigation Bar for Landing */}
        <header className="w-full px-6 lg:px-12 h-20 flex items-center justify-between bg-[#145A3B]/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-800">
          <Link href="/" className="flex items-center gap-2 select-none">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
              <FaLeaf className="text-base text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              <span className="text-emerald-400">Re</span>Use
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sessionStorage.setItem("has_seen_landing", "true");
                setShowLanding(false);
              }}
              className="text-emerald-100 hover:text-white font-bold text-xs sm:text-sm px-4 py-2 transition bg-white/10 rounded-xl hover:bg-white/20 cursor-pointer"
            >
              Jelajahi Produk →
            </button>
            <Link href="/login">
              <button className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-[#062416] font-black text-xs sm:text-sm px-5.5 py-2.5 rounded-xl transition shadow-md hover:shadow-emerald-400/20 cursor-pointer">
                Masuk
              </button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            
            <span className="inline-block bg-white/10 text-emerald-200 text-xs font-bold px-4 py-1.5 rounded-full border border-white/10">
              Platform Jual Beli Preloved Indonesia
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Titip Jual Mudah, <br />
              Belanja Barang Preloved Terpercaya
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Temukan pakaian, elektronik bekas, dan perlengkapan rumah tangga berkualitas dengan transaksi mudah dan transparan bersama ReUse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2">
              <button
                onClick={() => {
                  sessionStorage.setItem("has_seen_landing", "true");
                  setShowLanding(false);
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-[#062416] font-black text-sm sm:text-base px-8 py-3.5 rounded-xl hover:from-emerald-300 hover:to-teal-400 transition shadow-xl shadow-emerald-950/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Mulai Belanja</span>
                <FaArrowRight className="text-xs" />
              </button>

              <Link href="/register" className="w-full sm:w-auto">
                <button className="w-full border border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl transition cursor-pointer">
                  Daftar Akun Baru
                </button>
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-md lg:max-w-none relative shrink-0">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-xl bg-white/10 p-5 backdrop-blur-md max-w-lg mx-auto">
              <img
                src="/images/hero1.jpg"
                alt="ReUse Preloved Marketplace"
                className="w-full h-80 object-cover rounded-2xl mb-4"
              />
              <div className="bg-black/30 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Barang Preloved Pilihan</h4>
                  <p className="text-xs text-emerald-200/80 font-normal mt-0.5">Kondisi fisik teruji & layak pakai</p>
                </div>
                <FaLeaf className="text-xl text-emerald-400" />
              </div>
            </div>
          </div>
        </main>

        {/* Feature Grid */}
        <section className="bg-[#0e402a] border-t border-emerald-800 py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Mengapa Memilih ReUse?</h2>
              <p className="text-xs sm:text-sm text-emerald-200/80 font-normal mt-2">Platform praktis untuk jual beli barang bekas terpercaya</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-lg mb-4 font-bold">
                  <FaRecycle />
                </div>
                <h4 className="text-base font-bold text-white">Ramah Lingkungan</h4>
                <p className="text-xs text-emerald-200/80 font-normal mt-2 leading-relaxed">
                  Memperpanjang masa pakai produk untuk mengurangi penumpukan limbah barang bekas.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-lg mb-4 font-bold">
                  <FaShieldAlt />
                </div>
                <h4 className="text-base font-bold text-white">Kondisi Transparan</h4>
                <p className="text-xs text-emerald-200/80 font-normal mt-2 leading-relaxed">
                  Penjual memuat deskripsi dan foto kondisi barang secara jelas sebelum dibeli.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-lg mb-4 font-bold">
                  <FaHandshake />
                </div>
                <h4 className="text-base font-bold text-white">Penjual Terverifikasi</h4>
                <p className="text-xs text-emerald-200/80 font-normal mt-2 leading-relaxed">
                  Semua penjual terdaftar melewati proses verifikasi demi kenyamanan transaksi Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer for Landing */}
        <footer className="bg-[#0c3321] border-t border-emerald-900 py-6 text-center text-xs text-emerald-200/60 font-medium">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} ReUse Marketplace. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          
          {/* HERO SLIDER SECTION */}
          {cmsConfig?.heroEnabled && <HeroSlider />}

          {/* FEATURED CATEGORIES SECTION */}
          {cmsConfig?.featuredCategoriesEnabled && categories.length > 0 && (
            <section className="mt-12 sm:mt-16">
              <div className="flex justify-between items-end mb-6 sm:mb-8">
                <div>
                  <span className="text-[#145A3B] font-bold text-xs uppercase tracking-wider">
                    Kategori Pilihan
                  </span>
                  <h2 className="text-xl sm:text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">
                    Kategori Utama
                  </h2>
                </div>
                <Link href="/categories" className="text-[#145A3B] font-bold text-xs sm:text-sm hover:underline flex items-center gap-1">
                  <span>Lihat Semua</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 text-center transition duration-200 cursor-pointer flex flex-col items-center justify-between"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#145A3B] font-bold text-xl mb-3">
                      {cat.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{cat.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 font-medium">{cat.description || "Lihat produk pilihan"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* LATEST COLLECTION SECTION */}
          {cmsConfig?.latestProductsEnabled && (
            <section className="mt-12 sm:mt-16">
              <div className="flex justify-between items-end mb-6 sm:mb-8">
                <div>
                  <span className="text-[#145A3B] font-bold text-xs uppercase tracking-wider">
                    Produk Terbaru
                  </span>
                  <h2 className="text-xl sm:text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">
                    Baru Saja Diunggah
                  </h2>
                </div>
                <Link href="/products" className="text-[#145A3B] font-bold text-xs sm:text-sm hover:underline flex items-center gap-1">
                  <span>Lihat Semua</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
              
              {loadingLatest ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 h-72 animate-pulse">
                      <div className="h-44 bg-slate-100" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 w-16 bg-slate-200 rounded" />
                        <div className="h-4 bg-slate-200 rounded" />
                        <div className="h-5 w-20 bg-slate-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : errorLatest ? (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center text-xs font-bold">
                  {errorLatest}
                </div>
              ) : latestProducts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-10 text-center">
                  <h3 className="text-base font-bold text-slate-800">Belum Ada Produk</h3>
                  <p className="text-slate-400 text-xs mt-1">Produk terbaru akan ditampilkan di sini.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {latestProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* PROMO BANNER SECTION */}
          {cmsConfig?.promoBannerEnabled && promoBanners.length > 0 && (
            <section className="mt-12 sm:mt-16">
              <div className="grid md:grid-cols-2 gap-6">
                {promoBanners.map((banner) => (
                  <div
                    key={banner.id}
                    className="bg-[#145A3B] rounded-2xl p-6 text-white flex items-center justify-between shadow-md border border-emerald-800 min-h-[160px]"
                  >
                    <div className="space-y-2 max-w-[65%]">
                      <span className="text-[10px] bg-white/20 text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        Promo
                      </span>
                      <h3 className="text-lg font-bold">{banner.title}</h3>
                      <p className="text-xs text-emerald-100/90 font-normal">{banner.subtitle}</p>
                      <Link href={banner.buttonLink || "/products"}>
                        <button className="bg-gradient-to-r from-emerald-400 to-teal-400 text-[#062416] text-xs font-black px-4 py-2 rounded-xl mt-2 hover:from-emerald-300 hover:to-teal-300 transition shadow-md cursor-pointer">
                          {banner.buttonText || "Lihat Promo"}
                        </button>
                      </Link>
                    </div>
                    <div className="w-24 h-24 relative overflow-hidden rounded-xl shrink-0 border border-white/20 bg-white/10 p-2 flex items-center justify-center">
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FEATURED PRODUCTS SECTION */}
          {cmsConfig?.popularProductsEnabled && (
            <section className="mt-12 sm:mt-16">
              <div className="flex justify-between items-end mb-6 sm:mb-8">
                <div>
                  <span className="text-[#145A3B] font-bold text-xs uppercase tracking-wider">
                    Produk Unggulan
                  </span>
                  <h2 className="text-xl sm:text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">
                    Populer Pilihan
                  </h2>
                </div>
                <Link href="/products" className="text-[#145A3B] font-bold text-xs sm:text-sm hover:underline flex items-center gap-1">
                  <span>Lihat Semua</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>

              {loadingFeatured ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 h-72 animate-pulse">
                      <div className="h-44 bg-slate-100" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 w-16 bg-slate-200 rounded" />
                        <div className="h-4 bg-slate-200 rounded" />
                        <div className="h-5 w-20 bg-slate-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : errorFeatured ? (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center text-xs font-bold">
                  {errorFeatured}
                </div>
              ) : featuredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-10 text-center">
                  <h3 className="text-base font-bold text-slate-800">Produk Unggulan</h3>
                  <p className="text-slate-400 text-xs mt-1">Produk populer akan muncul di sini.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* PERSONALIZED RECOMMENDATION SECTION */}
          {recommended.length > 0 && (
            <section className="mt-12 sm:mt-16">
              <div className="mb-6 sm:mb-8">
                <span className="text-[#145A3B] font-bold text-xs uppercase tracking-wider">
                  Rekomendasi
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">
                  Disesuaikan Untuk Anda
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {recommended.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* STATS SECTION */}
          {(stats.sellers >= 10 || stats.sold >= 50) && (
            <section className="mt-12 sm:mt-16">
              <div className="bg-[#145A3B] rounded-2xl p-8 sm:p-10 text-white shadow-md relative overflow-hidden border border-emerald-800">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-1">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{stats.sold}+</h3>
                    <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Produk Terjual</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{stats.sellers}+</h3>
                    <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Penjual Terdaftar</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white">{(stats.sold * 0.005).toFixed(1)} Ton</h3>
                    <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Limbah Karbon Terkurangi</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* WHY CHOOSE REUSE SECTION */}
          <section className="mt-12 sm:mt-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="uppercase tracking-wider text-[#145A3B] font-bold text-xs">
                Keunggulan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">Mengapa Memilih ReUse?</h2>
              <p className="mt-2 text-slate-500 text-xs sm:text-sm font-normal">
                Platform terpercaya untuk jual beli barang preloved berkualitas dengan mudah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                <h3 className="text-base font-bold text-[#145A3B]">Ramah Lingkungan</h3>
                <p className="mt-2 text-slate-500 text-xs leading-relaxed">Mengurangi limbah dengan memanfaatkan barang layak pakai kembali.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                <h3 className="text-base font-bold text-[#145A3B]">Penjual Terverifikasi</h3>
                <p className="mt-2 text-slate-500 text-xs leading-relaxed">Penjual melalui verifikasi profil demi kenyamanan transaksi.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                <h3 className="text-base font-bold text-[#145A3B]">Chat Langsung</h3>
                <p className="mt-2 text-slate-500 text-[#555] text-xs leading-relaxed">Fitur pesan interaktif & obrolan WhatsApp dengan penjual.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                <h3 className="text-base font-bold text-[#145A3B]">Harga Terjangkau</h3>
                <p className="mt-2 text-slate-500 text-xs leading-relaxed">Dapatkan produk berkualitas dengan harga lebih hemat.</p>
              </div>
            </div>
          </section>

          {/* CTA BANNER */}
          <section className="mt-12 sm:mt-16">
            <div className="rounded-2xl bg-[#145A3B] text-white px-6 sm:px-10 py-12 text-center shadow-md border border-emerald-800">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Mulai Belanja & Titip Jual Produk Preloved</h2>
              <p className="max-w-xl mx-auto mt-3 text-xs sm:text-sm text-emerald-100/90 font-normal">
                Temukan berbagai pilihan barang bekas berkualitas dengan harga terjangkau.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Link href="/products">
                  <button className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-[#062416] px-7 py-3 rounded-xl font-black text-xs sm:text-sm hover:from-emerald-300 hover:to-teal-400 transition shadow-lg cursor-pointer">
                    Belanja Produk
                  </button>
                </Link>
                <Link href="/register">
                  <button className="border border-white/30 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-white/10 transition cursor-pointer">
                    Daftar Sebagai Penjual
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