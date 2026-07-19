import Link from "next/link";

export default function CategoryHero() {

  return (

    <section

      className="
      relative
      overflow-hidden
      rounded-[24px] sm:rounded-[30px]
      "

      style={{

        backgroundImage:

          "url('/images/category-banner.png')",

        backgroundSize:"cover",

        backgroundPosition:"center",

        backgroundRepeat:"no-repeat"

      }}

    >

      {/* Overlay */}

      <div

        className="
        absolute
        inset-0
        bg-[#145A3B]/90
        sm:bg-gradient-to-r
        sm:from-[#145A3B]/95
        sm:via-[#145A3B]/80
        sm:to-transparent
        "

      />

      <div

        className="
        relative
        z-10
        px-6 sm:px-10 lg:px-20
        py-12 sm:py-20 lg:py-24
        text-center sm:text-left
        "

      >

        <span

          className="
          inline-block
          px-4
          py-1.5
          rounded-full
          bg-white/15
          backdrop-blur
          text-[10px] sm:text-sm
          font-black
          tracking-widest
          uppercase
          text-green-200
          "

        >

          ReUse Marketplace

        </span>

        <h1

          className="
          mt-4 sm:mt-6
          text-2xl sm:text-5xl lg:text-6xl
          font-black
          text-white
          leading-tight
          max-w-xl
          tracking-tight
          "

        >

          Explore Product

          <br/>

          Categories

        </h1>

        <p

          className="
          mt-3 sm:mt-6
          text-xs sm:text-lg
          text-emerald-100
          leading-relaxed
          max-w-xl
          mx-auto sm:mx-0
          font-medium
          "

        >

          Temukan berbagai kategori produk
          preloved berkualitas mulai dari
          Fashion, Elektronik, Furniture,
          hingga kebutuhan sehari-hari.

        </p>

        <div

          className="
          flex
          flex-col sm:flex-row
          gap-3 sm:gap-4
          mt-6 sm:mt-10
          justify-center sm:justify-start
          "

        >

          <Link href="/products" className="w-full sm:w-auto">

            <button

              className="
              w-full sm:w-auto
              bg-white
              text-[#145A3B]
              px-6 sm:px-8
              py-3.5 sm:py-4
              rounded-xl sm:rounded-full
              text-sm
              font-extrabold
              hover:bg-green-50
              transition
              cursor-pointer
              "

            >

              Jelajahi Produk

            </button>

          </Link>

          <Link href="/about" className="w-full sm:w-auto">

            <button

              className="
              w-full sm:w-auto
              border
              border-white/30
              text-white
              px-6 sm:px-8
              py-3.5 sm:py-4
              rounded-xl sm:rounded-full
              text-sm
              font-extrabold
              hover:bg-white/10
              transition
              cursor-pointer
              "

            >

              Tentang Kami

            </button>

          </Link>

        </div>

      </div>

    </section>

  );

}