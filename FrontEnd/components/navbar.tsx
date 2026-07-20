"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { getCurrentUser } from "../utils/roleGuard";
import { getProducts, Product } from "../services/productService";
import { logout } from "../utils/auth";

import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaChevronDown,
  FaTachometerAlt,
  FaLeaf,
} from "react-icons/fa";

export default function Navbar() {

  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cartCount, setCartCount] =
    useState(0);

  const [isLogin, setIsLogin] =
    useState(false);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [keyword, setKeyword] =
    useState("");

  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const initials = useMemo(() => {
    if (!userName) return "?";
    return userName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  }, [userName]);

  // Fetch products for suggestion on mount
  useEffect(() => {
    const fetchProductsForSuggestions = async () => {
      try {
        const response = await getProducts();
        if (response.data?.success) {
          setAllProducts(response.data.products);
        }
      } catch (err) {
        console.error("Gagal mengambil data untuk suggestion:", err);
      }
    };
    fetchProductsForSuggestions();
  }, []);

  // Filter products based on query keyword
  const suggestions = useMemo(() => {
    if (!keyword.trim() || keyword.length < 2) return [];
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 5);
  }, [keyword, allProducts]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        (searchRef.current && !searchRef.current.contains(e.target as Node)) &&
        (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node))
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setMenuOpen(false);
    router.push(`/products?search=${encodeURIComponent(keyword)}`);
  };

  const refreshUser = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCartCount(cart.length);

    const token = localStorage.getItem("token");
    setIsLogin(!!token);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser?.role || null);
        setUserName(parsedUser?.name || "");
        setUserAvatar(parsedUser?.avatar || "");
      } catch {
        setUserRole(null);
        setUserName("");
        setUserAvatar("");
      }
    } else {
      setUserRole(null);
      setUserName("");
      setUserAvatar("");
    }
  };

  useEffect(() => {
    refreshUser();

    // Sync search input keyword with URL on navigation
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search");
      if (searchParam) {
        setKeyword(searchParam);
      } else {
        setKeyword("");
      }
    }
  }, [pathname]);

  // Listen for storage changes (login/logout from other tabs or same page)
  useEffect(() => {
    window.addEventListener("storage", refreshUser);
    return () => window.removeEventListener("storage", refreshUser);
  }, []);


  const menus = useMemo(() => [

    {
      name: "Home",
      href: "/"
    },

    {
      name: "Products",
      href: "/products"
    },

    {
      name: "Categories",
      href: "/categories"
    },

    {
      name: "About",
      href: "/about"
    }

  ], []);

  return (

    <header
      className="
      sticky
      top-0
      z-50
      bg-[#145A3B]
      border-b
      border-emerald-800
      shadow-md
      "
    >

      <div
        className="
        w-full
        px-6
        lg:px-12
        h-20
        flex
        items-center
        justify-between
        "
      >

        {/* LOGO */}

        <Link
          href="/"
          className="flex items-center gap-1 group select-none"
        >
          <span className="text-3xl font-black tracking-tight">
            <span className="text-[#2ecc71]">Re</span>
            <span className="text-white">Use</span>
          </span>
        </Link>

        {/* SEARCH */}

        <div
          ref={searchRef}
          className="
          hidden
          lg:flex
          flex-1
          mx-10
          relative
          "
        >

          <form
            onSubmit={handleSearchSubmit}
            className="
            w-full
            relative
            "
          >

            <button
              type="submit"
              className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-emerald-200/80
              hover:text-white
              transition-colors
              duration-200
              bg-transparent
              border-none
              p-0
              outline-none
              cursor-pointer
              z-10
              "
            >
              <FaSearch />
            </button>

            <input

              value={keyword}

              onChange={(e)=> {
                setKeyword(e.target.value);
                setShowSuggestions(true);
              }}

              onFocus={() => setShowSuggestions(true)}

              placeholder="Cari produk..."

              className="
              w-full
              rounded-full
              bg-white/10
              border
              border-emerald-800
              text-white
              placeholder-emerald-200/50
              pl-14
              pr-5
              py-3
              outline-none
              focus:bg-white/20
              focus:border-emerald-400
              transition-all
              duration-300
              "

            />

          </form>

          {/* Desktop Product Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-[105%] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 z-50 max-h-72 overflow-y-auto divide-y divide-gray-100 text-gray-800 backdrop-blur-sm bg-white/95">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => {
                    setShowSuggestions(false);
                    setKeyword(product.name);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50/50 transition-colors duration-200 cursor-pointer"
                >
                  <img
                    src={product.image || "/images/product-placeholder.png"}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{product.name}</p>
                    <p className="text-[10px] text-[#145A3B] font-extrabold mt-0.5">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>

        {/* DESKTOP MENU */}

        <nav
          className="
          hidden
          lg:flex
          items-center
          gap-8
          "
        >

          {

            menus.map((menu,index)=>(

              <Link

                key={index}

                href={menu.href}

                className={`
                transition
                font-semibold
                hover:text-white
                ${
                  pathname===menu.href
                  ?
                  "text-white border-b-2 border-emerald-400 pb-1"
                  :
                  "text-emerald-100/90"
                }
                `}

              >

                {menu.name}

              </Link>

            ))

          }

        </nav>

        {/* RIGHT */}

        <div
          className="
          hidden
          lg:flex
          items-center
          gap-5
          ml-8
          "
        >

          <Link
            href="/wishlist"
            className="relative"
          >

            <FaHeart
              className="
              text-2xl
              text-emerald-100
              hover:text-red-400
              transition
              "
            />

          </Link>

          <Link
            href="/cart"
            className="relative"
          >

            <FaShoppingCart
              className="
              text-2xl
              text-emerald-100
              hover:text-white
              transition
              "
            />

            {

              cartCount>0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-red-500
                  text-white
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  "
                >

                  {cartCount}

                </span>

              )

            }

          </Link>
                    {

            isLogin

            ?

            <div className="relative">

              <button

                onClick={()=>
                  setDropdownOpen(
                    !dropdownOpen
                  )
                }

                className="
                flex
                items-center
                gap-2
                "
              >

                <FaUserCircle
                  className="
                  text-4xl
                  text-emerald-100
                  hover:text-white
                  transition
                  "
                />

                <FaChevronDown
                  className="
                  text-sm
                  text-emerald-200
                  "
                />

              </button>

              {

                dropdownOpen && (

                  <div
                    className="
                    absolute
                    right-0
                    mt-4
                    w-56
                    rounded-2xl
                    bg-white
                    shadow-xl
                    border
                    overflow-hidden
                    "
                  >

                    {/* Dashboard link — role-specific */}
                    {(userRole === "seller" || userRole === "admin" || userRole === "super_admin") && (
                    <Link
                      href={
                        userRole === "super_admin"
                          ? "/dashboard/super-admin"
                          : userRole === "admin"
                            ? "/dashboard/admin"
                            : "/dashboard/seller"
                      }
                      className="block px-5 py-4 hover:bg-emerald-50 flex items-center gap-2 font-semibold text-[#145A3B] border-b border-gray-100"
                    >
                      <FaTachometerAlt />
                      {userRole === "seller"
                        ? "Seller Dashboard"
                        : "Dashboard Admin"}
                    </Link>
                    )}

                    <Link
                      href="/profile"
                      className="block px-5 py-4 hover:bg-gray-50 font-semibold text-gray-700"
                    >
                      Profil Saya
                    </Link>

                    <Link
                      href="/wishlist"
                      className="block px-5 py-4 hover:bg-gray-50 font-semibold text-gray-700"
                    >
                      Wishlist
                    </Link>

                    <Link
                      href="/profile/orders"
                      className="block px-5 py-4 hover:bg-gray-50 font-semibold text-gray-700 border-b border-gray-100"
                    >
                      Pesanan Saya
                    </Link>

                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.href = "/";
                      }}
                      className="w-full text-left px-5 py-4 hover:bg-red-50 text-red-500 font-semibold"
                    >
                      Keluar
                    </button>

                  </div>

                )

              }

            </div>

            :

            <div
              className="
              flex
              gap-3
              "
            >

              <Link href="/login">

                <button
                  className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-white/20
                  text-white
                  hover:bg-white/10
                  transition
                  font-semibold
                  "
                >

                  Login

                </button>

              </Link>

              <Link href="/register">

                <button
                  className="
                  px-6
                  py-3
                  rounded-xl
                  bg-white
                  text-[#145A3B]
                  hover:bg-emerald-50
                  transition
                  font-extrabold
                  "
                >

                  Register

                </button>

              </Link>

            </div>

          }

        </div>

        {/* MOBILE BUTTON */}

        <button

          className="
          lg:hidden
          text-3xl
          text-white
          "

          onClick={()=>
            setMenuOpen(
              !menuOpen
            )
          }

        >

          {

            menuOpen

            ?

            <FaTimes/>

            :

            <FaBars/>

          }

        </button>

      </div>

      {

        menuOpen && (

          <div
            className="
            lg:hidden
            bg-[#0e402a]
            border-t
            border-emerald-800/80
            shadow-2xl
            "
          >

            <div className="px-6 py-6 space-y-4">

              {/* SEARCH */}
              <div ref={mobileSearchRef} className="relative mb-6">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <button
                    type="submit"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200/50 hover:text-white transition-colors bg-transparent border-none p-0 outline-none cursor-pointer z-10 text-xs"
                  >
                    <FaSearch />
                  </button>
                  <input
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Cari produk..."
                    className="w-full bg-white/10 border border-emerald-800/60 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-emerald-200/50 outline-none focus:bg-white/20 focus:border-emerald-400 transition"
                  />
                </form>

                {/* Mobile Product Search Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-[105%] left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-150 py-2 z-50 max-h-56 overflow-y-auto divide-y divide-gray-100 text-gray-800">
                    {suggestions.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={() => {
                          setShowSuggestions(false);
                          setMenuOpen(false);
                          setKeyword(product.name);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50/50 transition-colors duration-200 cursor-pointer"
                      >
                        <img
                          src={product.image || "/images/product-placeholder.png"}
                          alt={product.name}
                          className="w-8 h-8 rounded-lg object-cover border border-gray-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-gray-800 truncate">{product.name}</p>
                          <p className="text-[9px] text-[#145A3B] font-extrabold mt-0.5">
                            Rp {product.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* MENU LINKS */}
              {

                menus.map((menu,index)=>{
                  const active = pathname === menu.href;
                  return (

                    <Link

                      key={index}

                      href={menu.href}

                      onClick={()=>
                        setMenuOpen(false)
                      }

                      className={`
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3
                      rounded-2xl
                      text-sm
                      font-extrabold
                      transition-all
                      duration-200
                      ${
                        active
                          ? "bg-white text-[#145A3B] shadow-md"
                          : "text-emerald-100 hover:bg-white/10 hover:text-white"
                      }
                      `}

                    >

                      <span>{menu.name}</span>
                      <span className="text-[10px] opacity-60">→</span>

                    </Link>

                  );
                })

              }

              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className={`
                flex
                items-center
                justify-between
                px-4
                py-3
                rounded-2xl
                text-sm
                font-extrabold
                transition-all
                duration-200
                ${
                  pathname === "/wishlist"
                    ? "bg-white text-[#145A3B] shadow-md"
                    : "text-emerald-100 hover:bg-white/10 hover:text-white"
                }
                `}
              >
                <div className="flex items-center gap-2">
                  <FaHeart className="text-red-400 text-xs shrink-0" />
                  <span>Wishlist</span>
                </div>
                <span className="text-[10px] opacity-60">→</span>
              </Link>

              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className={`
                flex
                items-center
                justify-between
                px-4
                py-3
                rounded-2xl
                text-sm
                font-extrabold
                transition-all
                duration-200
                ${
                  pathname === "/cart"
                    ? "bg-white text-[#145A3B] shadow-md"
                    : "text-emerald-100 hover:bg-white/10 hover:text-white"
                }
                `}
              >
                <div className="flex items-center gap-2">
                  <FaShoppingCart className="text-emerald-300 text-xs shrink-0" />
                  <span>Keranjang</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                  <span className="text-[10px] opacity-60">→</span>
                </div>
              </Link>

              {/* AUTH ACTIONS */}
              {

                !isLogin ? (

                  <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-emerald-800/40">

                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="w-full"
                    >
                      <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-black py-3 rounded-xl border border-white/10 transition cursor-pointer">
                        Masuk
                      </button>
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="w-full"
                    >
                      <button className="w-full bg-white hover:bg-emerald-50 text-[#145A3B] text-xs font-black py-3 rounded-xl transition cursor-pointer">
                        Daftar
                      </button>
                    </Link>

                  </div>

                ) : (

                  <div className="mt-6 pt-4 border-t border-emerald-800/40 space-y-2">
                    {/* User profile card in mobile menu */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl mb-4 border border-emerald-800/20">
                      {userAvatar ? (
                        <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full object-cover border border-emerald-500/30" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-700/60 border border-emerald-500/30 flex items-center justify-center text-white text-sm font-black uppercase shrink-0">
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-white text-xs font-bold truncate max-w-[150px]">{userName}</p>
                        <p className="text-emerald-300 text-[10px] uppercase font-bold tracking-wider mt-0.5">{userRole === 'super_admin' ? 'Super Admin' : userRole}</p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold text-emerald-100 hover:bg-white/10 hover:text-white transition-all duration-200"
                    >
                      <span>Profil Saya</span>
                      <span className="text-[10px] opacity-60">→</span>
                    </Link>

                    {userRole && (userRole === "admin" || userRole === "seller" || userRole === "super_admin") && (
                      <Link
                        href={
                          userRole === "admin"
                            ? "/dashboard/admin"
                            : userRole === "super_admin"
                            ? "/dashboard/super-admin"
                            : "/dashboard/seller"
                        }
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold text-emerald-100 hover:bg-white/10 hover:text-white transition-all duration-200"
                      >
                        <span>Dashboard</span>
                        <span className="text-[10px] opacity-60">→</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                        window.location.reload();
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold text-red-300 hover:bg-red-950/20 hover:text-red-200 transition-all duration-200 cursor-pointer text-left"
                    >
                      <span>Keluar</span>
                      <span className="text-[10px] opacity-60">→</span>
                    </button>
                  </div>

                )

              }

            </div>

          </div>

        )

      }

    </header>

  );

}