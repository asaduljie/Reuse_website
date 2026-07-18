"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {

  const slides = [
    {
      title: "Barang Preloved Berkualitas",
      desc: "Temukan koleksi pilihan dengan kualitas terbaik dan harga bersahabat.",
      image: "/images/hero1.jpg"
    },
    {
      title: "Fashion Ramah Lingkungan",
      desc: "Berbelanja lebih bijak untuk masa depan yang lebih hijau.",
      image: "/images/hero2.jpg"
    },
    {
      title: "Koleksi Kurasi Terbaik",
      desc: "Produk pilihan yang sudah diseleksi khusus untuk kamu.",
      image: "/images/hero3.jpg"
    }
  ];

  return (

    <section className="max-w-7xl mx-auto px-8 py-12">

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000
        }}
        pagination={{
          clickable: true
        }}
        loop={true}
      >

        {slides.map((slide, index) => (

          <SwiperSlide key={index}>

            <div className="grid lg:grid-cols-2 gap-10 items-center">

              <div>

                <h1 className="text-6xl font-bold text-[#145A3B] leading-tight">

                  {slide.title}

                </h1>

                <p className="text-gray-600 mt-6 text-lg">

                  {slide.desc}

                </p>

                <button
                  className="
                  mt-8
                  bg-[#145A3B]
                  text-white
                  px-8
                  py-3
                  rounded-xl
                  hover:bg-[#0E442C]
                  transition
                  "
                >
                  Lihat Koleksi
                </button>

              </div>

              <img
                src={slide.image}
                alt="Hero"
                className="
                rounded-3xl
                shadow-xl
                w-full
                h-[500px]
                object-cover
                "
              />

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>

  );
}