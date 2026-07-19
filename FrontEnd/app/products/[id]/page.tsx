"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import ProductCard from "../../../components/ProductCard";

import {
  getProductById,
  getProducts,
  Product
} from "../../../services/productService";
import { getSimilarProducts } from "../../../services/recommendationService";

import {
  FaHeart,
  FaShoppingCart,
  FaWhatsapp,
  FaChevronRight
} from "react-icons/fa";

export default function ProductDetailPage() {

  const params = useParams();

  const id =
    Array.isArray(params.id)
      ? params.id[0]
      : params.id;

  const [product, setProduct] =
    useState<Product | null>(null);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [similarProducts, setSimilarProducts] =
    useState<Product[]>([]);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!id) return;
    loadProduct();
    loadProducts();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const fetchSimilar = async () => {
      const recs = await getSimilarProducts(product.id, 4);
      setSimilarProducts(recs);
    };
    fetchSimilar();
  }, [product]);

  const loadProduct = async () => {

    try {

      setLoading(true);

      const response =
        await getProductById(id);

      if (response.data.success) {

        setProduct(
          response.data.product
        );

        setSelectedImage(
          response.data.product.imageUrl
        );

      }

    } catch (err) {

      console.log(err);

      setError(
        "Produk tidak ditemukan."
      );

    } finally {

      setLoading(false);

    }

  };

  const loadProducts = async () => {

    try {

      const response =
        await getProducts();

      if (response.data.success) {

        setProducts(
          response.data.products
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  const addToCart = () => {

    if (!product) return;

    const cart =
      JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

    cart.push({

      ...product,

      qty: 1

    });

    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    );

    alert(
      "Produk berhasil ditambahkan ke keranjang."
    );

  };

  const buyViaWhatsapp = () => {

    if (!product) return;

    const message =

`Halo Admin ReUse 👋

Saya tertarik dengan produk berikut.

━━━━━━━━━━━━━━━

Nama :
${product.name}

Kategori :
${product.category}

Harga :
Rp ${Number(product.price).toLocaleString("id-ID")}

━━━━━━━━━━━━━━━

Mohon informasi
ketersediaannya.

Terima kasih.`;

    window.open(

`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`,

"_blank"

    );

  };

  const relatedProducts =
    similarProducts.length > 0
      ? similarProducts
      : products.filter(item => item.id !== product?.id).slice(0, 4);

  if(loading){

    return(

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }

  if(error){

    return(

      <div className="min-h-screen flex items-center justify-center">

        {error}

      </div>

    );

  }

  if(!product){

    return null;

  }

  return(

    <>

      <Navbar />

      <main className="bg-[#F7F8FA] min-h-screen">

        <div
          className="
          max-w-7xl
          mx-auto
          px-8
          py-10
          "
        >

          {/* Breadcrumb */}

          <div
            className="
            flex
            items-center
            gap-3
            text-gray-500
            text-sm
            mb-8
            "
          >

            <Link href="/">

              Home

            </Link>

            <FaChevronRight />

            <Link href="/products">

              Products

            </Link>

            <FaChevronRight />

            <span>

              {product.name}

            </span>

          </div>

          <div
            className="
            grid
            lg:grid-cols-2
            gap-16
            "
          >
                        {/* PRODUCT GALLERY */}

            <div>

              <div
                className="
                bg-white
                rounded-[32px]
                border
                h-[600px]
                flex
                items-center
                justify-center
                overflow-hidden
                "
              >

                <img
                  src={selectedImage}
                  alt={product.name}
                  className="
                  max-w-full
                  max-h-full
                  object-contain
                  hover:scale-105
                  transition
                  duration-300
                  "
                />

              </div>

              <div
                className="
                flex
                gap-4
                mt-5
                "
              >

                <button
                  onClick={() =>
                    setSelectedImage(
                      product.imageUrl
                    )
                  }
                  className={`
                  w-24
                  h-24
                  rounded-2xl
                  overflow-hidden
                  border-2
                  transition
                  ${
                    selectedImage === product.imageUrl
                      ? "border-[#145A3B]"
                      : "border-gray-200"
                  }
                  `}
                >

                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="
                    w-full
                    h-full
                    object-cover
                    "
                  />

                </button>

              </div>

            </div>

            {/* PRODUCT INFORMATION */}

            <div>

              <span
                className="
                inline-flex
                px-4
                py-2
                rounded-full
                bg-green-100
                text-[#145A3B]
                font-semibold
                "
              >

                {product.category}

              </span>

              <h1
                className="
                text-5xl
                font-bold
                mt-6
                "
              >

                {product.name}

              </h1>

              <div
                className="
                mt-6
                flex
                items-center
                gap-6
                "
              >

                <h2
                  className="
                  text-4xl
                  font-bold
                  text-[#145A3B]
                  "
                >

                  Rp{" "}

                  {Number(
                    product.price
                  ).toLocaleString("id-ID")}

                </h2>

                <span
                  className="
                  px-4
                  py-2
                  rounded-full
                  bg-emerald-50
                  text-[#145A3B]
                  text-xs
                  font-extrabold
                  uppercase
                  tracking-wider
                  "
                >
                  Kondisi: Preloved
                </span>
              </div>

              <div
                className="
                mt-10
                space-y-5
                "
              >

                <div
                  className="
                  flex
                  justify-between
                  border-b
                  pb-4
                  "
                >

                  <span className="text-gray-500">

                    Kategori

                  </span>

                  <b>

                    {product.category}

                  </b>

                </div>

                <div
                  className="
                  flex
                  justify-between
                  border-b
                  pb-4
                  "
                >

                  <span className="text-gray-500">

                    Kondisi

                  </span>

                  <b>

                    Preloved

                  </b>

                </div>

                <div
                  className="
                  flex
                  justify-between
                  border-b
                  pb-4
                  "
                >

                  <span className="text-gray-500">

                    Status

                  </span>

                  <b className="text-green-600">

                    Tersedia

                  </b>

                </div>

              </div>

              <div className="mt-10">

                <h3
                  className="
                  text-2xl
                  font-semibold
                  "
                >

                  Deskripsi Produk

                </h3>

                <p
                  className="
                  mt-5
                  leading-8
                  text-gray-600
                  "
                >

                  {product.description}

                </p>

              </div>

              <div
                className="
                grid
                grid-cols-3
                gap-2 sm:gap-4
                mt-12
                "
              >

                <button
                  className="
                  border
                  border-gray-200
                  rounded-2xl
                  py-3 sm:py-4
                  flex
                  flex-col sm:flex-row
                  items-center
                  justify-center
                  gap-1 sm:gap-3
                  text-[10px] sm:text-sm lg:text-base
                  font-extrabold
                  text-gray-600
                  hover:bg-red-50 hover:text-red-500
                  transition
                  cursor-pointer
                  "
                >

                  <FaHeart className="text-xs sm:text-base shrink-0" />

                  <span>Wishlist</span>

                </button>

                <button
                  onClick={addToCart}
                  className="
                  bg-[#145A3B]
                  text-white
                  rounded-2xl
                  py-3 sm:py-4
                  flex
                  flex-col sm:flex-row
                  items-center
                  justify-center
                  gap-1 sm:gap-3
                  text-[10px] sm:text-sm lg:text-base
                  font-extrabold
                  hover:bg-emerald-900
                  transition
                  cursor-pointer
                  "
                >

                  <FaShoppingCart className="text-xs sm:text-base shrink-0" />

                  <span>Keranjang</span>

                </button>

                <button
                  onClick={buyViaWhatsapp}
                  className="
                  bg-[#25D366]
                  text-white
                  rounded-2xl
                  py-3 sm:py-4
                  flex
                  flex-col sm:flex-row
                  items-center
                  justify-center
                  gap-1 sm:gap-3
                  text-[10px] sm:text-sm lg:text-base
                  font-extrabold
                  hover:bg-green-600
                  transition
                  cursor-pointer
                  "
                >

                  <FaWhatsapp className="text-xs sm:text-base shrink-0" />

                  <span>WhatsApp</span>

                </button>

              </div>

            </div>

          </div>
                    {/* RELATED PRODUCTS */}

          <section
            className="
            mt-24
            "
          >

            <div
              className="
              flex
              justify-between
              items-center
              mb-10
              "
            >

              <div>

                <p
                  className="
                  uppercase
                  tracking-widest
                  text-[#145A3B]
                  font-semibold
                  "
                >

                  Recommendation

                </p>

                <h2
                  className="
                  text-4xl
                  font-bold
                  mt-2
                  "
                >

                  Mungkin Kamu Suka

                </h2>

              </div>

              <Link
                href="/products"
                className="
                text-[#145A3B]
                font-semibold
                hover:underline
                "
              >

                View All →

              </Link>

            </div>

            {

              relatedProducts.length === 0

              ?

              <div
                className="
                bg-white
                rounded-3xl
                p-16
                text-center
                shadow-sm
                "
              >

                <h3
                  className="
                  text-2xl
                  font-semibold
                  "
                >

                  Belum Ada Produk Lain

                </h3>

                <p
                  className="
                  mt-4
                  text-gray-500
                  "
                >

                  Produk rekomendasi akan muncul
                  setelah seller menambahkan produk.

                </p>

              </div>

              :

              <div
                className="
                grid
                md:grid-cols-2
                lg:grid-cols-4
                gap-8
                "
              >

                {

                  relatedProducts.map(

                    (item) => (

                      <ProductCard

                        key={item.id}

                        product={item}

                      />

                    )

                  )

                }

              </div>

            }

          </section>

          {/* CTA */}

          <section
            className="
            mt-24
            "
          >

            <div
              className="
              rounded-[40px]
              bg-gradient-to-r
              from-[#145A3B]
              to-[#2E8B57]
              text-white
              px-10
              py-20
              text-center
              "
            >

              <p
                className="
                uppercase
                tracking-widest
                text-green-200
                "
              >

                ReUse Marketplace

              </p>

              <h2
                className="
                text-5xl
                font-bold
                mt-5
                "
              >

                Temukan Produk
                Preloved Lainnya

              </h2>

              <p
                className="
                max-w-3xl
                mx-auto
                mt-6
                leading-8
                text-green-100
                "
              >

                Jelajahi berbagai produk
                berkualitas dengan harga
                terbaik dari seller
                terpercaya.

              </p>

              <div
                className="
                flex
                justify-center
                gap-5
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
                    hover:bg-gray-100
                    transition
                    "
                  >

                    Lihat Semua Produk

                  </button>

                </Link>

              </div>

            </div>

          </section>

        </div>
                <Footer />

      </main>

    </>

  );

}