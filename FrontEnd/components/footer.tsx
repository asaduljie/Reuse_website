import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLeaf
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer className="bg-[#145A3B] text-white mt-24">

      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        py-16
        grid
        lg:grid-cols-4
        md:grid-cols-2
        gap-12
        "
      >

        {/* COMPANY */}

        <div>

          <div className="flex items-center gap-3">
            <div
              className="
              w-11
              h-11
              rounded-2xl
              bg-white/20
              backdrop-blur-sm
              text-white
              flex
              items-center
              justify-center
              text-xl
              "
            >
              <FaLeaf className="text-lg rotate-[-15deg]" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white tracking-tight leading-none">
                ReUse
              </h2>
              <p className="text-[9px] font-extrabold text-green-200 tracking-widest uppercase mt-1.5">
                Sustainable Marketplace
              </p>
            </div>
          </div>

          <p
            className="
            mt-6
            text-green-100
            leading-7
            "
          >

            ReUse merupakan marketplace
            yang mempertemukan penjual dan
            pembeli produk preloved
            berkualitas sehingga barang
            layak pakai dapat digunakan
            kembali secara berkelanjutan.

          </p>

        </div>

        {/* QUICK LINKS */}

        <div>

          <h3
            className="
            text-xl
            font-semibold
            mb-6
            "
          >
            Quick Links
          </h3>

          <div
            className="
            flex
            flex-col
            gap-4
            "
          >

            <Link href="/">
              Home
            </Link>

            <Link href="/products">
              Products
            </Link>

            <Link href="/cart">
              Cart
            </Link>

            <Link href="/wishlist">
              Wishlist
            </Link>

            <Link href="/login">
              Login
            </Link>

          </div>

        </div>

        {/* CATEGORIES */}

        <div>

          <h3
            className="
            text-xl
            font-semibold
            mb-6
            "
          >
            Categories
          </h3>

          <div
            className="
            flex
            flex-col
            gap-4
            "
          >

            <Link href="/products">
              Fashion
            </Link>

            <Link href="/products">
              Shoes
            </Link>

            <Link href="/products">
              Bags
            </Link>

            <Link href="/products">
              Accessories
            </Link>

            <Link href="/products">
              Home Living
            </Link>

          </div>

        </div>

        {/* CONTACT */}

        <div>

          <h3
            className="
            text-xl
            font-semibold
            mb-6
            "
          >
            Contact
          </h3>

          <div
            className="
            flex
            flex-col
            gap-5
            "
          >

            <div className="flex gap-4">

              <FaMapMarkerAlt
                className="
                mt-1
                "
              />

              <span>

                Makassar,
                Indonesia

              </span>

            </div>

            <div className="flex gap-4 items-center">

              <FaPhoneAlt />

              <a
                href="https://wa.me/628789096692"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-semibold"
              >

                +62 878-9096-6692

              </a>

            </div>

            <div className="flex gap-4">

              <FaEnvelope />

              <span>

                reuse@email.com

              </span>

            </div>

          </div>

          {/* SOCIAL */}

          <div
            className="
            flex
            gap-4
            mt-8
            "
          >

            <a
              href="https://www.tiktok.com/@reusepedia?_r=1&_t=ZS-988fhCeaOdY"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok ReUse"
              className="
              w-11
              h-11
              rounded-full
              bg-white
              text-[#145A3B]
              flex
              items-center
              justify-center
              hover:scale-110
              transition
              "
            >

              <FaTiktok className="text-lg" />

            </a>

            <a
              href="https://www.instagram.com/reusepedia?igsh=bWd3ZjRoNWZjc3Zq"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram ReUse"
              className="
              w-11
              h-11
              rounded-full
              bg-white
              text-[#145A3B]
              flex
              items-center
              justify-center
              hover:scale-110
              transition
              "
            >

              <FaInstagram className="text-xl" />

            </a>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}

      <div
        className="
        border-t
        border-green-700
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto
          px-8
          py-6
          flex
          flex-col
          lg:flex-row
          justify-between
          items-center
          gap-4
          "
        >

          <p className="text-green-100">

            © {new Date().getFullYear()} ReUse Marketplace.
            All Rights Reserved.

          </p>

          <div
            className="
            flex
            gap-6
            text-green-100
            "
          >

            <Link href="#">

              Privacy Policy

            </Link>

            <Link href="#">

              Terms of Service

            </Link>

          </div>

        </div>

      </div>

    </footer>

  );

}