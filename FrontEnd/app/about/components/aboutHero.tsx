import Link from "next/link";

export default function AboutHero() {

  return (

    <section

      className="
      relative
      overflow-hidden
      rounded-[35px]
      border border-gray-150
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
          bg-[#145A3B]/10
          rounded-full
          px-5
          py-2
          text-sm
          font-semibold
          tracking-widest
          uppercase
          text-[#145A3B]
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
          text-[#145A3B]
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
          text-gray-650
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
              bg-[#145A3B]
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
              hover:bg-[#0c3a26]
              transition
              cursor-pointer
              "

            >

              Jelajahi Produk

            </button>

          </Link>

          <Link href="/categories">

            <button

              className="
              border
              border-[#145A3B]
              text-[#145A3B]
              px-8
              py-4
              rounded-full
              hover:bg-[#145A3B]
              hover:text-white
              transition
              cursor-pointer
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