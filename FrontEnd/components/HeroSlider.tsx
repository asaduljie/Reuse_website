"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
  FaShieldAlt,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

import { getBanners, Banner } from "../services/bannerService";

export default function HeroSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loaded = getBanners().filter(
      (b) => b.position === "Hero" && b.status === "Published"
    );
    setBanners(loaded);
  }, []);

  useEffect(() => {
    if (banners.length === 0 || isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide, banners, isHovered]);

  const nextSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  if (banners.length === 0) {
    return (
      <div className="h-[420px] w-full rounded-[40px] bg-gradient-to-r from-[#145A3B] to-[#0D3B26] flex items-center justify-center text-white/70 animate-pulse border border-emerald-500/20 shadow-2xl">
        <div className="flex items-center gap-3">
          <FaLeaf className="animate-spin text-emerald-400 text-xl" />
          <p className="text-sm font-bold tracking-wide">Memuat Koleksi Premium ReUse...</p>
        </div>
      </div>
    );
  }

  const activeBanner = banners[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] bg-gradient-to-br from-[#0c3824] via-[#145A3B] to-[#0A2E1E] text-white shadow-2xl border border-emerald-500/20 transition-all duration-500 group select-none"
    >
      {/* Luxurious Ambient Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-400/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-lime-400/10 blur-[100px] pointer-events-none" />

      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[460px] sm:min-h-[500px] relative z-10">
        
        {/* LEFT CONTENT COLUMN */}
        <div className="lg:col-span-7 px-6 py-12 sm:p-12 lg:p-16 text-center lg:text-left flex flex-col justify-center">
          
          {/* Top Badge Pill */}
          <div className="inline-flex items-center gap-2.5 bg-emerald-950/60 border border-emerald-400/30 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black tracking-widest text-emerald-300 uppercase mb-6 shadow-inner mx-auto lg:mx-0 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <FaLeaf className="text-emerald-400 text-xs" />
            <span>Curated Sustainable Luxury</span>
          </div>

          {/* Banner Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white drop-shadow-md">
            {activeBanner.title}
          </h1>

          {/* Banner Subtitle */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-emerald-100/90 font-medium max-w-xl mx-auto lg:mx-0">
            {activeBanner.subtitle}
          </p>

          {/* Value Props Micro Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-xs text-emerald-200/80 font-bold">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <FaShieldAlt className="text-emerald-400" />
              <span>100% Terverifikasi</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <FaStar className="text-amber-400" />
              <span>Kondisi Kurasi Terbaik</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10 justify-center lg:justify-start items-center">
            <Link href={activeBanner.buttonLink || "/products"}>
              <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-[#0c3824] px-8 py-4 rounded-2xl text-sm sm:text-base font-extrabold transition-all duration-300 shadow-xl shadow-emerald-950/40 hover:shadow-emerald-400/20 hover:scale-[1.02] flex items-center justify-center gap-3 group/btn cursor-pointer">
                <span>{activeBanner.buttonText || "Jelajahi Sekarang"}</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </Link>

            <Link href="/about">
              <button className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white px-7 py-4 rounded-2xl text-sm sm:text-base font-extrabold transition-all duration-300 backdrop-blur-md hover:border-white/30 cursor-pointer">
                Visi Zero-Waste
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE COLUMN */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex items-center justify-center relative">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square flex items-center justify-center">
            {/* Glowing Backdrop Circle */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-400/20 to-lime-400/20 blur-2xl animate-pulse" />
            
            {/* Glass Card Container */}
            <div className="relative z-10 w-full h-full rounded-3xl sm:rounded-[36px] bg-gradient-to-b from-white/15 to-white/5 border border-white/20 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden group/img">
              <div className="flex justify-between items-start">
                <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg backdrop-blur-md">
                  ReUse Certified
                </span>
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 text-xs font-bold border border-white/10">
                  #{currentSlide + 1}
                </span>
              </div>

              {/* Main Banner Image */}
              <div className="flex-1 flex items-center justify-center py-4">
                <img
                  src={activeBanner.image || "/images/hero1.jpg"}
                  alt={activeBanner.title}
                  className="w-full h-48 sm:h-64 object-contain filter drop-shadow-2xl transition-all duration-500 group-hover/img:scale-105"
                />
              </div>

              {/* Card Footer Caption */}
              <div className="bg-emerald-950/50 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold text-white truncate max-w-[180px] sm:max-w-[220px]">
                    {activeBanner.title}
                  </p>
                  <p className="text-[10px] text-emerald-200/70 font-semibold mt-0.5">
                    Verified High Quality Preloved
                  </p>
                </div>
                <FaLeaf className="text-emerald-400 text-lg animate-bounce" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SLIDER NAVIGATION BUTTONS (DESKTOP & MOBILE) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-black/30 hover:bg-emerald-500/80 border border-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 z-20 cursor-pointer shadow-lg hover:scale-110 active:scale-95 group/nav"
      >
        <FaChevronLeft className="text-xs sm:text-sm transition-transform duration-200 group-hover/nav:-translate-x-0.5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-black/30 hover:bg-emerald-500/80 border border-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 z-20 cursor-pointer shadow-lg hover:scale-110 active:scale-95 group/nav"
      >
        <FaChevronRight className="text-xs sm:text-sm transition-transform duration-200 group-hover/nav:translate-x-0.5" />
      </button>

      {/* BOTTOM SLIDE PROGRESS INDICATOR BAR */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-20 bg-black/30 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index
                ? "bg-gradient-to-r from-emerald-400 to-lime-400 w-8 sm:w-10"
                : "bg-white/30 hover:bg-white/60 w-2 sm:w-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}