import Link from "next/link";

export default function AboutHero() {

  return (

    <section

      className="
      relative
      overflow-hidden
      rounded-[35px]
      "

      style={{

        backgroundImage:
          "url('/images/about-banner.png')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",

      }}

    >

      <div

        className="
        absolute
        inset-0
        bg-gradient-to-r
        from-[#145A3B]/90
        via-[#145A3B]/70
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
          bg-white/20
          backdrop-blur
          rounded-full
          px-5
          py-2
          text-sm
          font-semibold
          tracking-widest
          uppercase
          text-white
          "

        >

          About ReUse

        </span>

        <h1

          className="
          mt-6
          text-5xl
          lg:text-6xl
          font-bold
          text-white
          leading-tight
          max-w-2xl
          "

        >

          Sustainable Marketplace

          <br />

          For Everyone

        </h1>

        <p

          className="
          mt-6
          text-lg
          text-green-100
          leading-8
          max-w-2xl
          "

        >

          ReUse hadir untuk membantu masyarakat
          menjual dan membeli produk preloved
          berkualitas sehingga dapat mengurangi
          limbah, memperpanjang usia produk,
          dan mendukung gaya hidup yang lebih
          ramah lingkungan.

        </p>

        <div

          className="
          flex
          flex-wrap
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

          <Link href="/categories">

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

              Lihat Kategori

            </button>

          </Link>

        </div>

      </div>

    </section>

  );

}