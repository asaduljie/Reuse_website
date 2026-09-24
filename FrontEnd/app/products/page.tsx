"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProductCard from "../../components/ProductCard";
import { FaSearch } from "react-icons/fa";

import { getCategories } from "../../services/categoryService";
import {
  getProducts,
  Product
} from "../../services/productService";

function ProductsPageContent() {

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

  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchParam !== null) {
      setSearch(searchParam);
    } else {
      setSearch("");
    }
  }, [searchParam]);

  useEffect(() => {
    if (categoryParam) {
      const allCategories = getCategories();
      const found = allCategories.find(c => c.slug.toLowerCase() === categoryParam.toLowerCase());
      if (found) {
        setSelectedCategory(found.name);
      }
    } else {
      setSelectedCategory("Semua");
    }
  }, [categoryParam]);

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
          {/* FILTER */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

              {/* SEARCH */}
              <div className="lg:col-span-2 relative flex items-center">
                <FaSearch className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari produk preloved..."
                  value={search}
                  onChange={(e)=>{
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-11 pr-5 py-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              {/* CATEGORY */}
              <select
                value={selectedCategory}
                onChange={(e)=>{
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-5 py-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "Semua" ? "Semua Kategori" : category}
                  </option>
                ))}
              </select>

              {/* SORT */}
              <select
                value={sortBy}
                onChange={(e)=>{
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-5 py-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
              >
                <option value="latest">Urutkan: Terbaru</option>
                <option value="price_low">Harga: Terendah</option>
                <option value="price_high">Harga: Tertinggi</option>
              </select>

            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Menampilkan <strong className="text-slate-800 font-bold">{filteredProducts.length}</strong> produk</span>
              {(search || selectedCategory !== "Semua" || sortBy !== "latest") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("Semua");
                    setSortBy("latest");
                    setCurrentPage(1);
                  }}
                  className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  Reset Filter
                </button>
              )}
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

          {totalPage > 1 && (
            <section className="flex justify-center items-center gap-2 sm:gap-3 mt-14">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
              >
                ← Prev
              </button>

              {[...Array(totalPage)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPage}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
              >
                Next →
              </button>
            </section>
          )}

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
              rounded-[32px] sm:rounded-[40px]
              text-white
              overflow-hidden
              shadow-sm
              "
            >

              <div
                className="
                grid
                grid-cols-1
                lg:grid-cols-2
                items-center
                "
              >

                <div
                  className="
                  px-6 py-10
                  sm:p-14
                  lg:p-20
                  text-center
                  lg:text-left
                  "
                >

                  <p
                    className="
                    uppercase
                    tracking-[4px]
                    text-green-200
                    text-xs
                    font-extrabold
                    "
                  >

                    ReUse Marketplace

                  </p>

                  <h2
                    className="
                    text-2xl
                    sm:text-4xl
                    lg:text-5xl
                    font-black
                    mt-3 lg:mt-5
                    leading-tight
                    tracking-tight
                    "
                  >

                    Punya Barang
                    Layak Pakai?

                  </h2>

                  <p
                    className="
                    mt-4 lg:mt-7
                    text-sm
                    sm:text-base
                    text-emerald-100/90
                    leading-relaxed
                    max-w-md
                    mx-auto
                    lg:mx-0
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
                    gap-3 sm:gap-4
                    mt-6 lg:mt-10
                    justify-center
                    lg:justify-start
                    "
                  >

                    <Link
                      href="/register"
                    >

                      <button
                        className="
                        bg-white
                        text-[#145A3B]
                        px-5 sm:px-8
                        py-3 sm:py-4
                        rounded-xl sm:rounded-2xl
                        text-xs sm:text-base
                        font-extrabold
                        hover:bg-gray-100
                        transition
                        cursor-pointer
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
                        border-white/30
                        px-5 sm:px-8
                        py-3 sm:py-4
                        rounded-xl sm:rounded-2xl
                        text-xs sm:text-base
                        font-extrabold
                        hover:bg-white/10
                        transition
                        cursor-pointer
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
                  p-6 sm:p-10
                  pt-0 lg:pt-10
                  "
                >

                  <img
                    src="/images/seller-banner.png"
                    alt="Become Seller"
                    className="
                    w-full
                    max-w-xs
                    sm:max-w-md
                    lg:max-w-lg
                    h-44 sm:h-64 lg:h-96
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA]">
        <div className="text-gray-400 text-sm font-semibold animate-pulse">Memuat Produk...</div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}