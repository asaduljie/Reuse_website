"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProductCard from "../../components/ProductCard";

import { getCategories } from "../../services/categoryService";
import {
  getProducts,
  Product
} from "../../services/productService";

export default function ProductsPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("Semua");

  const [sortBy, setSortBy] =
    useState("latest");

  const [currentPage, setCurrentPage] =
    useState(1);

  const productPerPage = 8;

  useEffect(() => {

    loadProducts();

    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      const allCategories = getCategories();
      const found = allCategories.find(c => c.slug.toLowerCase() === categoryParam.toLowerCase());
      if (found) {
        setSelectedCategory(found.name);
      }
    }

  }, []);

  const loadProducts = async () => {

    try {

      setLoading(true);

      const response =
        await getProducts();

      if (response.data.success) {

        setProducts(
          response.data.products
        );

      }

    } catch (err) {

      console.log(err);

      setError(
        "Gagal mengambil data produk."
      );

    } finally {

      setLoading(false);

    }

  };

  const categories = useMemo(() => {
    const allCategories = getCategories();
    const categoryNames = allCategories.map(c => c.name);

    return [
      "Semua",
      ...categoryNames
    ];
  }, []);

  const filteredProducts =
    useMemo(() => {

      let data = [...products];

      if (search) {

        data = data.filter(

          product =>

            product.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

        );

      }

      if (

        selectedCategory !== "Semua"

      ) {

        data = data.filter(

          product =>

            product.category?.toLowerCase() ===

            selectedCategory.toLowerCase()

        );

      }

      switch(sortBy){

        case "price_low":

          data.sort(

            (a,b)=>

              a.price-b.price

          );

          break;

        case "price_high":

          data.sort(

            (a,b)=>

              b.price-a.price

          );

          break;

        default:

          data.sort(

            (a,b)=>

              b.id-a.id

          );

      }

      return data;

    },[

      products,

      search,

      selectedCategory,

      sortBy

    ]);

  const lastIndex =
    currentPage * productPerPage;

  const firstIndex =
    lastIndex-productPerPage;

  const currentProducts =
    filteredProducts.slice(

      firstIndex,

      lastIndex

    );

  const totalPage =

    Math.ceil(

      filteredProducts.length/

      productPerPage

    );

  return(

    <>

      <Navbar/>

      <main className="bg-[#F7F8FA] min-h-screen">

        <div
          className="
          max-w-7xl
          mx-auto
          px-8
          py-10
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

                Marketplace

              </p>

              <h1
                className="
                text-5xl
                font-bold
                mt-2
                "
              >

                Semua Produk

              </h1>

            </div>

            <Link
              href="/"
              className="
              text-[#145A3B]
              font-semibold
              hover:underline
              "
            >

              ← Kembali ke Home

            </Link>

          </div>

          {/* FILTER */}
                    <section
            className="
            bg-white
            rounded-[32px]
            p-8
            shadow-sm
            mb-10
            "
          >

            <div
              className="
              grid
              lg:grid-cols-4
              gap-5
              "
            >

              {/* SEARCH */}

              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e)=>{

                  setSearch(e.target.value);

                  setCurrentPage(1);

                }}
                className="
                lg:col-span-2
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-[#145A3B]
                "
              />

              {/* CATEGORY */}

              <select
                value={selectedCategory}
                onChange={(e)=>{

                  setSelectedCategory(
                    e.target.value
                  );

                  setCurrentPage(1);

                }}
                className="
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                "
              >

                {

                  categories.map(

                    category=>(

                      <option
                        key={category}
                        value={category}
                      >

                        {category}

                      </option>

                    )

                  )

                }

              </select>

              {/* SORT */}

              <select
                value={sortBy}
                onChange={(e)=>{

                  setSortBy(
                    e.target.value
                  );

                  setCurrentPage(1);

                }}
                className="
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                "
              >

                <option value="latest">

                  Terbaru

                </option>

                <option value="price_low">

                  Harga Terendah

                </option>

                <option value="price_high">

                  Harga Tertinggi

                </option>

              </select>

            </div>

            <div
              className="
              mt-6
              text-gray-500
              "
            >

              Menampilkan

              <b>

                {" "}

                {filteredProducts.length}

              </b>

              {" "}produk

            </div>

          </section>

          {

            loading

            ?

            <div
              className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-8
              "
            >

              {

                [...Array(8)].map(

                  (_,index)=>(

                    <div
                      key={index}
                      className="
                      bg-white
                      rounded-3xl
                      overflow-hidden
                      animate-pulse
                      "
                    >

                      <div className="h-72 bg-gray-200"/>

                      <div className="p-5">

                        <div className="h-5 bg-gray-200 rounded mb-4"/>

                        <div className="h-6 bg-gray-200 rounded mb-3"/>

                        <div className="h-4 bg-gray-200 rounded mb-2"/>

                        <div className="h-4 w-2/3 bg-gray-200 rounded mb-5"/>

                        <div className="h-8 w-28 bg-gray-200 rounded"/>

                      </div>

                    </div>

                  )

                )

              }

            </div>

            :

            error

            ?

            <div
              className="
              bg-red-50
              border
              border-red-200
              rounded-3xl
              text-red-600
              p-10
              text-center
              "
            >

              {error}

            </div>

            :

            currentProducts.length===0

            ?

            <div
              className="
              bg-white
              rounded-3xl
              shadow-sm
              p-16
              text-center
              "
            >

              <h2
                className="
                text-3xl
                font-bold
                "
              >

                Produk Tidak Ditemukan

              </h2>

              <p
                className="
                mt-4
                text-gray-500
                "
              >

                Coba gunakan kata kunci
                atau kategori lain.

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

                currentProducts.map(

                  product=>(

                    <ProductCard

                      key={product.id}

                      product={product}

                    />

                  )

                )

              }

            </div>

          }
                    {/* PAGINATION */}

          {

            totalPage > 1 && (

              <section
                className="
                flex
                justify-center
                items-center
                gap-3
                mt-14
                "
              >

                <button

                  disabled={currentPage===1}

                  onClick={()=>setCurrentPage(currentPage-1)}

                  className="
                  px-5
                  py-3
                  rounded-xl
                  border
                  bg-white
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  hover:bg-gray-100
                  transition
                  "

                >

                  Previous

                </button>

                {

                  [...Array(totalPage)].map(

                    (_,index)=>(

                      <button

                        key={index}

                        onClick={()=>setCurrentPage(index+1)}

                        className={`

                        w-12

                        h-12

                        rounded-xl

                        transition

                        ${

                          currentPage===index+1

                          ?

                          "bg-[#145A3B] text-white"

                          :

                          "bg-white border hover:bg-gray-100"

                        }

                        `}

                      >

                        {index+1}

                      </button>

                    )

                  )

                }

                <button

                  disabled={currentPage===totalPage}

                  onClick={()=>setCurrentPage(currentPage+1)}

                  className="
                  px-5
                  py-3
                  rounded-xl
                  border
                  bg-white
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  hover:bg-gray-100
                  transition
                  "

                >

                  Next

                </button>

              </section>

            )

          }

          {/* MARKETPLACE BANNER */}

          <section
            className="
            mt-24
            "
          >

            <div
              className="
              bg-gradient-to-r
              from-[#145A3B]
              to-[#2E8B57]
              rounded-[40px]
              text-white
              overflow-hidden
              "
            >

              <div
                className="
                grid
                lg:grid-cols-2
                items-center
                "
              >

                <div
                  className="
                  p-14
                  "
                >

                  <p
                    className="
                    uppercase
                    tracking-[4px]
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
                    leading-tight
                    "
                  >

                    Punya Barang
                    Layak Pakai?

                  </h2>

                  <p
                    className="
                    mt-7
                    text-green-100
                    leading-8
                    "
                  >

                    Jadilah seller di ReUse
                    dan jual barang preloved
                    milikmu kepada ribuan
                    pengguna dengan mudah.

                  </p>

                  <div
                    className="
                    flex
                    gap-5
                    mt-10
                    "
                  >

                    <Link
                      href="/register"
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

                        Mulai Menjual

                      </button>

                    </Link>

                    <Link
                      href="/login"
                    >

                      <button
                        className="
                        border
                        border-white
                        px-8
                        py-4
                        rounded-2xl
                        hover:bg-white
                        hover:text-[#145A3B]
                        transition
                        "
                      >

                        Login Seller

                      </button>

                    </Link>

                  </div>

                </div>

                <div
                  className="
                  flex
                  justify-center
                  items-center
                  p-10
                  "
                >

                  <img
                    src="/images/seller-banner.png"
                    alt="Become Seller"
                    className="
                    w-full
                    max-w-lg
                    object-contain
                    "
                  />

                </div>

              </div>

            </div>

          </section>

        </div>
                <Footer />

      </main>

    </>

  );

}