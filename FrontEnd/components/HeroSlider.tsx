"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

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
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, banners]);

  const nextSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  if (banners.length === 0) {
    return (
      <div className="h-[400px] w-full rounded-[40px] bg-[#145A3B] flex items-center justify-center text-white animate-pulse">
        <p className="text-sm font-semibold">Loading slideshow banners...</p>
      </div>
    );
  }

  return (

    <section
      className="
      relative
      overflow-hidden
      rounded-[32px] sm:rounded-[40px]
      bg-[#145A3B]
      text-white
      "
    >

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        items-center
        "
      >

        <div
          className="
          px-6 py-10
          sm:p-14
          lg:p-20
          text-center
          lg:text-left
          "
        >

          <span
            className="
            inline-block
            bg-white/10
            backdrop-blur-sm
            px-4
            py-1.5
            rounded-full
            text-xs sm:text-sm
            mb-4 lg:mb-6
            font-bold
            "
          >

            ReUse Marketplace

          </span>

          <h1
            className="
            text-2xl
            sm:text-4xl
            lg:text-6xl
            font-black
            leading-tight
            tracking-tight
            "
          >

            {

              banners[currentSlide]
                .title

            }

          </h1>

          <p
            className="
            mt-4 lg:mt-8
            text-sm
            sm:text-base
            lg:text-lg
            leading-relaxed
            text-emerald-100/90
            max-w-md
            mx-auto
            lg:mx-0
            "
          >

            {

              banners[currentSlide]
                .subtitle

            }

          </p>

          <div
            className="
            flex
            gap-3 sm:gap-4
            mt-6 lg:mt-10
            justify-center
            lg:justify-start
            "
          >

            <Link
              href="/products"
            >

              <button
                className="
                bg-white
                text-[#145A3B]
                px-5 sm:px-8
                py-3 sm:py-4
                rounded-xl sm:rounded-2xl
                text-xs sm:text-base
                font-extrabold
                hover:bg-emerald-50
                transition
                cursor-pointer
                "
              >

                Belanja Sekarang

              </button>

            </Link>

            <button
              className="
              border
              border-white/30
              px-5 sm:px-8
              py-3 sm:py-4
              rounded-xl sm:rounded-2xl
              text-xs sm:text-base
              font-extrabold
              hover:bg-white/10
              transition
              cursor-pointer
              "
            >

              Pelajari

            </button>

          </div>

        </div>

        <div
          className="
          flex
          justify-center
          items-center
          p-6 sm:p-10
          pt-0 lg:pt-10
          "
        >

          <img
            src={
              banners[currentSlide]
                .image
            }
            alt=""
            className="
            w-full
            max-w-xs
            sm:max-w-md
            lg:max-w-xl
            h-44 sm:h-64 lg:h-96
            object-contain
            "
          />

        </div>

      </div>

      <button
        onClick={prevSlide}
        className="
        absolute
        left-3 sm:left-4
        top-1/2
        -translate-y-1/2
        w-8 h-8
        sm:w-12 sm:h-12
        rounded-full
        bg-white/10
        backdrop-blur-sm
        text-white
        hover:bg-white/20
        flex
        items-center
        justify-center
        transition-all
        duration-300
        z-20
        cursor-pointer
        "
      >
        <FaChevronLeft className="text-xs sm:text-base" />
      </button>

      <button
        onClick={nextSlide}
        className="
        absolute
        right-3 sm:right-4
        top-1/2
        -translate-y-1/2
        w-8 h-8
        sm:w-12 sm:h-12
        rounded-full
        bg-white/10
        backdrop-blur-sm
        text-white
        hover:bg-white/20
        flex
        items-center
        justify-center
        transition-all
        duration-300
        z-20
        cursor-pointer
        "
      >
        <FaChevronRight className="text-xs sm:text-base" />
      </button>

      <div
        className="
        absolute
        bottom-4 sm:bottom-6
        left-1/2
        -translate-x-1/2
        flex
        gap-2 sm:gap-3
        "
      >

        {

          banners.map(

            (_, index) => (

              <button

                key={index}

                onClick={() =>
                  setCurrentSlide(index)
                }

                className={`

                  w-2 sm:w-3

                  h-2 sm:h-3

                  rounded-full

                  transition-all
                  duration-300

                  ${

                    currentSlide ===
                    index

                      ? "bg-white w-5 sm:w-6"

                      : "bg-white/40 hover:bg-white/60"

                  }

                `}

              />

            )

          )

        }

      </div>

    </section>

  );

}