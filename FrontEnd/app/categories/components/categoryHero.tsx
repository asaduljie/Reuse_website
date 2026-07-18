import Link from "next/link";

export default function CategoryHero() {

  return (

    <section

      className="
      relative
      overflow-hidden
      rounded-[30px]
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
        bg-gradient-to-r
        from-[#145A3B]/90
        via-[#145A3B]/75
        to-transparent
        "

      />

      <div

        className="
        relative
        z-10
        px-10
        lg:px-20
        py-20
        lg:py-24
        "

      >

        <span

          className="
          inline-block
          px-5
          py-2
          rounded-full
          bg-white/15
          backdrop-blur
          text-sm
          font-semibold
          tracking-widest
          uppercase
          "

        >

          ReUse Marketplace

        </span>

        <h1

          className="
          mt-6
          text-5xl
          lg:text-6xl
          font-bold
          text-white
          leading-tight
          max-w-xl
          "

        >

          Explore Product

          <br/>

          Categories

        </h1>

        <p

          className="
          mt-6
          text-lg
          text-green-100
          leading-8
          max-w-xl
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
          gap-5
          mt-10
          "

        >

          <Link href="/products">

            <button

              className="
              bg-white
              text-[#145A3B]
              px-8
              py-4
              rounded-full
              font-semibold
              hover:bg-green-50
              transition
              "

            >

              Jelajahi Produk

            </button>

          </Link>

          <Link href="/about">

            <button

              className="
              border
              border-white
              text-white
              px-8
              py-4
              rounded-full
              hover:bg-white
              hover:text-[#145A3B]
              transition
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