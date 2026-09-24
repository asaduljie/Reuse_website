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
      <div className="h-64 sm:h-96 w-full rounded-3xl bg-[#145A3B] flex items-center justify-center text-white">
        <p className="text-sm font-semibold">Memuat spanduk...</p>
      </div>
    );
  }

  const activeBanner = banners[currentSlide];

  return (
    <section className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-[#145A3B] text-white shadow-lg border border-emerald-800/40 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px] sm:min-h-[440px] relative z-10">
        
        {/* TEXT CONTENT */}
        <div className="lg:col-span-7 px-6 py-10 sm:p-12 lg:p-14 text-center lg:text-left flex flex-col justify-center">
          <span className="inline-block bg-white/10 text-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold w-fit mx-auto lg:mx-0 mb-4 border border-white/10">
            ReUse Marketplace
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
            {activeBanner.title}
          </h1>

          <p className="mt-3 sm:mt-5 text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
            {activeBanner.subtitle}
          </p>

          <div className="flex flex-row gap-3 mt-6 sm:mt-8 justify-center lg:justify-start items-center">
            <Link href={activeBanner.buttonLink || "/products"}>
              <button className="bg-white text-[#145A3B] hover:bg-emerald-50 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition-colors cursor-pointer flex items-center gap-2 shadow-sm">
                <span>{activeBanner.buttonText || "Belanja Sekarang"}</span>
                <FaArrowRight className="text-xs" />
              </button>
            </Link>

            <Link href="/about">
              <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer">
                Tentang Kami
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGE DISPLAY */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-sm aspect-video sm:aspect-square flex items-center justify-center">
            <img
              src={activeBanner.image || "/images/hero1.jpg"}
              alt={activeBanner.title}
              className="w-full h-44 sm:h-64 object-contain filter drop-shadow-xl"
            />
          </div>
        </div>

      </div>

      {/* ARROW NAVIGATION */}
      <button
        onClick={prevSlide}
        aria-label="Slide Sebelumnya"
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
      >
        <FaChevronLeft className="text-xs sm:text-sm" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide Selanjutnya"
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
      >
        <FaChevronRight className="text-xs sm:text-sm" />
      </button>

      {/* PAGE DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ke slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? "bg-white w-6" : "bg-white/40 hover:bg-white/70 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}