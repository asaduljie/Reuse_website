"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { getBanners, Banner } from "../services/bannerService";

export default function HeroSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loaded = getBanners().filter(
      (b) => b.position === "Hero" && b.status === "Published"
    );
    setBanners(loaded);
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide, banners]);

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
      <div className="h-64 sm:h-96 w-full rounded-3xl bg-gradient-to-br from-[#0c3824] via-[#145A3B] to-[#072517] flex items-center justify-center text-white">
        <p className="text-sm font-semibold text-emerald-200 animate-pulse">Memuat spanduk...</p>
      </div>
    );
  }

  const activeBanner = banners[currentSlide];

  return (
    <section className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#0a3320] via-[#10472e] to-[#082819] text-white shadow-2xl border border-emerald-500/20 select-none group">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px] sm:min-h-[440px] relative z-10">
        
        {/* TEXT CONTENT */}
        <div className="lg:col-span-7 px-6 py-10 sm:p-12 lg:p-14 text-center lg:text-left flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 w-fit mx-auto lg:mx-0 mb-4 backdrop-blur-md shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ReUse Marketplace</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
            {activeBanner.title}
          </h1>

          <p className="mt-3 sm:mt-5 text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
            {activeBanner.subtitle}
          </p>

          <div className="flex flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start items-center">
            <Link href={activeBanner.buttonLink || "/products"}>
              <button className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-[#062416] font-black px-7 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2.5 shadow-xl shadow-emerald-950/50 hover:shadow-emerald-400/30 hover:-translate-y-0.5 active:translate-y-0 border border-emerald-300/30">
                <span>{activeBanner.buttonText || "Belanja Sekarang"}</span>
                <FaArrowRight className="text-xs" />
              </button>
            </Link>

            <Link href="/about">
              <button className="bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-400/30 hover:border-emerald-400/60 text-emerald-100 font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm backdrop-blur-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0">
                Tentang Kami
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGE DISPLAY */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-sm aspect-video sm:aspect-square flex items-center justify-center rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-2xl group hover:border-emerald-400/40 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-3xl pointer-events-none" />
            <img
              src={activeBanner.image || "/images/hero1.jpg"}
              alt={activeBanner.title}
              className="w-full h-44 sm:h-64 object-contain filter drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

      </div>

      {/* ARROW NAVIGATION */}
      <button
        onClick={prevSlide}
        aria-label="Slide Sebelumnya"
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 hover:bg-emerald-500 hover:border-emerald-400 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 z-20 cursor-pointer shadow-xl hover:scale-105 active:scale-95"
      >
        <FaChevronLeft className="text-xs sm:text-sm" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide Selanjutnya"
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 hover:bg-emerald-500 hover:border-emerald-400 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 z-20 cursor-pointer shadow-xl hover:scale-105 active:scale-95"
      >
        <FaChevronRight className="text-xs sm:text-sm" />
      </button>

      {/* PAGE DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ke slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index
                ? "bg-gradient-to-r from-emerald-400 to-teal-300 w-8 shadow-md shadow-emerald-400/50"
                : "bg-white/30 hover:bg-white/60 w-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}