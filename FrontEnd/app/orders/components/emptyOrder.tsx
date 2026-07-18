import Link from "next/link";

export default function EmptyOrder() {

  return (

    <div

      className="
      bg-white
      rounded-[40px]
      shadow-sm
      p-20
      text-center
      "

    >

      <div

        className="
        text-8xl
        mb-8
        "

      >

        📦

      </div>

      <h2

        className="
        text-4xl
        font-bold
        "

      >

        Belum Ada Riwayat Pesanan

      </h2>

      <p

        className="
        mt-5
        text-gray-500
        text-lg
        leading-8
        "

      >

        Anda belum pernah melakukan transaksi.
        Yuk mulai belanja produk terbaik
        di ReUse Marketplace.

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

          Mulai Belanja

        </button>

      </Link>

    </div>

  );

}