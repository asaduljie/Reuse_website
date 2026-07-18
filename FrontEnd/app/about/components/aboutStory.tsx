export default function AboutStory() {

  return (

    <section

      className="
      py-20
      "

    >

      <div

        className="
        grid
        lg:grid-cols-2
        gap-14
        items-center
        "

      >

        {/* LEFT */}

        <div>

          <span

            className="
            uppercase
            tracking-[4px]
            font-semibold
            text-[#145A3B]
            "

          >

            Our Story

          </span>

          <h2

            className="
            mt-4
            text-4xl
            lg:text-5xl
            font-bold
            leading-tight
            "

          >

            Memberikan Kehidupan Baru

            <br />

            Untuk Setiap Produk

          </h2>

          <p

            className="
            mt-8
            text-gray-600
            leading-8
            "

          >

            Banyak produk yang masih memiliki
            kualitas sangat baik berakhir
            menjadi limbah hanya karena sudah
            tidak digunakan oleh pemiliknya.

          </p>

          <p

            className="
            mt-6
            text-gray-600
            leading-8
            "

          >

            ReUse hadir sebagai marketplace
            yang menghubungkan penjual dan
            pembeli untuk memperpanjang umur
            produk melalui konsep jual beli
            barang preloved secara aman,
            mudah, dan terpercaya.

          </p>

          <p

            className="
            mt-6
            text-gray-600
            leading-8
            "

          >

            Dengan membeli produk preloved,
            pengguna tidak hanya memperoleh
            harga yang lebih terjangkau,
            tetapi juga ikut berkontribusi
            terhadap pengurangan limbah dan
            pelestarian lingkungan.

          </p>

        </div>

        {/* RIGHT */}

        <div

          className="
          relative
          "

        >

          <img

            src="/images/about-story.png"

            alt="About Story"

            className="
            w-full
            rounded-[30px]
            object-cover
            shadow-xl
            "

          />

          <div

            className="
            absolute
            -bottom-6
            left-8
            bg-white
            rounded-3xl
            shadow-xl
            px-8
            py-6
            "

          >

            <h3

              className="
              text-3xl
              font-bold
              text-[#145A3B]
              "

            >

              500+

            </h3>

            <p

              className="
              text-gray-500
              mt-2
              "

            >

              Produk tersedia
              di marketplace

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}