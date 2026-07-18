import Link from "next/link";

export default function EmptyCategory() {

  return (

    <div

      className="
      bg-white
      rounded-[40px]
      p-20
      text-center
      shadow-sm
      "

    >

      <div

        className="
        text-8xl
        mb-8
        "

      >

        📂

      </div>

      <h2

        className="
        text-4xl
        font-bold
        "

      >

        Belum Ada Kategori

      </h2>

      <p

        className="
        mt-6
        text-gray-500
        leading-8
        max-w-xl
        mx-auto
        "

      >

        Saat ini belum terdapat kategori
        produk yang tersedia pada
        marketplace ReUse.

      </p>

      <Link href="/products">

        <button

          className="
          mt-10
          bg-[#145A3B]
          text-white
          px-10
          py-4
          rounded-2xl
          font-semibold
          hover:bg-green-900
          transition
          "

        >

          Lihat Produk

        </button>

      </Link>

    </div>

  );

}