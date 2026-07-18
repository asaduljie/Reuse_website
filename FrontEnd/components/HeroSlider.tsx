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
      rounded-[40px]
      bg-[#145A3B]
      text-white
      "
    >

      <div
        className="
        grid
        lg:grid-cols-2
        items-center
        "
      >

        <div
          className="
          p-14
          lg:p-20
          "
        >

          <span
            className="
            inline-block
            bg-green-600
            px-5
            py-2
            rounded-full
            text-sm
            mb-6
            "
          >

            ReUse Marketplace

          </span>

          <h1
            className="
            text-5xl
            lg:text-6xl
            font-bold
            leading-tight
            "
          >

            {

              banners[currentSlide]
                .title

            }

          </h1>

          <p
            className="
            mt-8
            text-lg
            leading-8
            text-green-100
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
            gap-4
            mt-10
            "
          >

            <Link
              href="/products"
            >

              <button
                className="
                bg-white
                text-[#145A3B]
                px-8
                py-4
                rounded-2xl
                font-semibold
                hover:bg-green-50
                "
              >

                Belanja Sekarang

              </button>

            </Link>

            <button
              className="
              border
              border-white
              px-8
              py-4
              rounded-2xl
              hover:bg-white
              hover:text-[#145A3B]
              transition
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
          p-10
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
            max-w-xl
            object-contain
            "
          />

        </div>

      </div>

      <button
  onClick={prevSlide}
  className="
  absolute
  left-3
  top-1/2
  -translate-y-1/2
  text-[#22C55E]
  hover:text-[#16A34A]
  transition-all
  duration-300
  hover:scale-125
  z-20
  "
>

  <FaChevronLeft className="text-6xl" />

</button>

      <button
  onClick={nextSlide}
  className="
  absolute
  right-3
  top-1/2
  -translate-y-1/2
  text-[#22C55E]
  hover:text-[#16A34A]
  transition-all
  duration-300
  hover:scale-125
  z-20
  "
>

  <FaChevronRight className="text-6xl" />

</button>

      <div
        className="
        absolute
        bottom-6
        left-1/2
        -translate-x-1/2
        flex
        gap-3
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

                  w-3

                  h-3

                  rounded-full

                  transition

                  ${

                    currentSlide ===
                    index

                      ? "bg-white"

                      : "bg-green-300"

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