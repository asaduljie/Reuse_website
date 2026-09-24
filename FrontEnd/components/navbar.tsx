"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { getProducts, Product } from "../services/productService";

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
  FaBoxOpen,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Click outside to close suggestion dropdown and profile dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current && !searchRef.current.contains(e.target as Node) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setMenuOpen(false);
    if (keyword.trim()) {
      router.push(`/products?search=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const refreshUser = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistCount(wishlist.length);

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

  useEffect(() => {
    window.addEventListener("storage", refreshUser);
    return () => window.removeEventListener("storage", refreshUser);
  }, []);

  const menus = useMemo(() => [
    { name: "Beranda", href: "/" },
    { name: "Koleksi Produk", href: "/products" },
    { name: "Kategori", href: "/categories" },
    { name: "Tentang ReUse", href: "/about" },
  ], []);

  return (
    <header className="sticky top-0 z-50 bg-[#145A3B]/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group select-none shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-lime-400 p-0.5 shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#145A3B] rounded-[14px] flex items-center justify-center text-white">
              <FaLeaf className="text-lg text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white">
              <span className="text-emerald-400">Re</span>Use
            </span>
            <span className="text-[9px] font-extrabold text-emerald-300/80 tracking-widest uppercase mt-0.5">
              Eco Luxury
            </span>
          </div>
        </Link>

        {/* SEARCH BAR (DESKTOP) */}
        <div ref={searchRef} className="hidden lg:flex flex-1 max-w-lg mx-6 relative">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <button
              type="submit"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200/70 hover:text-white transition-colors bg-transparent border-none p-0 outline-none cursor-pointer z-10"
              aria-label="Search"
            >
              <FaSearch className="text-sm" />
            </button>
            <input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Cari fashion preloved, elektronik, aksesoris..."
              className="w-full rounded-2xl bg-emerald-950/40 border border-emerald-400/20 text-white placeholder-emerald-200/40 pl-11 pr-4 py-2.5 text-xs outline-none focus:bg-emerald-950/70 focus:border-emerald-400 transition-all duration-300 shadow-inner"
            />
          </form>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-[110%] left-0 right-0 bg-[#0f402a] border border-emerald-500/30 rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto divide-y divide-emerald-800/40 backdrop-blur-xl">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={() => {
                    setShowSuggestions(false);
                    setKeyword(product.name);
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition-colors duration-200 cursor-pointer"
                >
                  <img
                    src={product.imageUrl || product.image || "/images/product1.jpg"}
                    alt={product.name}
                    className="w-11 h-11 rounded-xl object-cover border border-emerald-500/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{product.name}</p>
                    <p className="text-[10px] text-emerald-300 font-extrabold mt-0.5">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP NAVIGATION MENU */}
        <nav className="hidden lg:flex items-center gap-7">
          {menus.map((menu, index) => {
            const active = pathname === menu.href;
            return (
              <Link
                key={index}
                href={menu.href}
                className={`text-xs font-extrabold transition-all duration-300 relative py-1 ${
                  active
                    ? "text-emerald-400"
                    : "text-emerald-100/90 hover:text-white"
                }`}
              >
                <span>{menu.name}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTION BUTTONS (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-4 ml-4">
          
          {/* Wishlist Link */}
          <Link href="/wishlist" className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-100 hover:text-red-400 transition-all duration-300 border border-white/10">
            <FaHeart className="text-base" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Link */}
          <Link href="/cart" className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-100 hover:text-white transition-all duration-300 border border-white/10">
            <FaShoppingCart className="text-base" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-emerald-400 text-[#145A3B] text-[9px] font-black flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER PROFILE OR AUTH */}
          {isLogin ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-400/30 p-1.5 pr-3 rounded-2xl transition-all duration-300 cursor-pointer"
              >
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-8 h-8 rounded-xl object-cover border border-emerald-400/40" />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-lime-400 text-[#145A3B] font-black text-xs flex items-center justify-center shadow-inner">
                    {initials}
                  </div>
                )}
                <span className="text-xs font-bold text-white max-w-[100px] truncate">
                  {userName || "Akun Saya"}
                </span>
                <FaChevronDown className={`text-[10px] text-emerald-300 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-2xl bg-[#0e3b26] border border-emerald-500/30 shadow-2xl overflow-hidden backdrop-blur-2xl z-50 text-white divide-y divide-emerald-800/50">
                  
                  <div className="px-5 py-4 bg-emerald-950/40">
                    <p className="text-xs font-extrabold text-white truncate">{userName || "Pengguna ReUse"}</p>
                    <p className="text-[10px] text-emerald-300/80 font-semibold capitalize mt-0.5">
                      Role: {userRole || "Buyer"}
                    </p>
                  </div>

                  <div className="py-2">
                    {(userRole === "seller" || userRole === "admin" || userRole === "super_admin") && (
                      <Link
                        href={
                          userRole === "super_admin"
                            ? "/dashboard/super-admin"
                            : userRole === "admin"
                              ? "/dashboard/admin"
                              : "/dashboard/seller"
                        }
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-emerald-800/40 text-xs font-bold text-emerald-300 transition"
                      >
                        <FaTachometerAlt className="text-emerald-400" />
                        <span>{userRole === "seller" ? "Dashboard Seller" : "Dashboard Admin"}</span>
                      </Link>
                    )}

                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-emerald-800/40 text-xs font-bold text-emerald-100 transition"
                    >
                      <FaUser className="text-emerald-400" />
                      <span>Profil Saya</span>
                    </Link>

                    <Link
                      href="/profile/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-emerald-800/40 text-xs font-bold text-emerald-100 transition"
                    >
                      <FaBoxOpen className="text-emerald-400" />
                      <span>Riwayat Pesanan</span>
                    </Link>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.href = "/";
                      }}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-500/20 text-xs font-bold text-red-400 transition text-left"
                    >
                      <FaSignOutAlt />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="px-5 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition text-xs font-bold">
                  Masuk
                </button>
              </Link>
              <Link href="/register">
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-lime-400 text-[#145A3B] hover:opacity-95 transition text-xs font-extrabold shadow-lg shadow-emerald-950/40">
                  Daftar
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>

      </div>

      {/* MOBILE DRAWER SHEET */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0c3321] border-t border-emerald-800/80 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-6 py-6 space-y-4">
            
            {/* Mobile Search */}
            <div ref={mobileSearchRef} className="relative mb-4">
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
                  placeholder="Cari barang preloved..."
                  className="w-full bg-emerald-950/60 border border-emerald-700/50 rounded-full pl-11 pr-4 py-3 text-xs text-white placeholder-emerald-200/40 outline-none focus:border-emerald-400 transition"
                />
              </form>

              {/* Mobile Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-[105%] left-0 right-0 bg-[#0e3b26] border border-emerald-500/30 rounded-2xl shadow-xl py-2 z-50 max-h-56 overflow-y-auto divide-y divide-emerald-800/50 text-white">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => {
                        setShowSuggestions(false);
                        setMenuOpen(false);
                        setKeyword(product.name);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-800/50 transition-colors cursor-pointer"
                    >
                      <img
                        src={product.imageUrl || product.image || "/images/product1.jpg"}
                        alt={product.name}
                        className="w-8 h-8 rounded-lg object-cover border border-emerald-500/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-white truncate">{product.name}</p>
                        <p className="text-[9px] text-emerald-300 font-extrabold mt-0.5">
                          Rp {product.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-2">
              {menus.map((menu, index) => {
                const active = pathname === menu.href;
                return (
                  <Link
                    key={index}
                    href={menu.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-emerald-400 to-lime-400 text-[#145A3B] shadow-md"
                        : "text-emerald-100 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{menu.name}</span>
                    <span className="text-[10px] opacity-60">→</span>
                  </Link>
                );
              })}

              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold text-emerald-100 hover:bg-white/10 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2">
                  <FaHeart className="text-red-400 text-xs shrink-0" />
                  <span>Wishlist Favorit</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold text-emerald-100 hover:bg-white/10 hover:text-white transition-all"
              >
                <div className="flex items-center gap-2">
                  <FaShoppingCart className="text-emerald-400 text-xs shrink-0" />
                  <span>Keranjang Belanja</span>
                </div>
                {cartCount > 0 && (
                  <span className="bg-emerald-400 text-[#145A3B] text-[10px] font-black px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-emerald-800/80">
              {isLogin ? (
                <div className="space-y-2">
                  {(userRole === "seller" || userRole === "admin" || userRole === "super_admin") && (
                    <Link
                      href={
                        userRole === "super_admin"
                          ? "/dashboard/super-admin"
                          : userRole === "admin"
                            ? "/dashboard/admin"
                            : "/dashboard/seller"
                      }
                      onClick={() => setMenuOpen(false)}
                      className="block w-full py-3 text-center rounded-2xl bg-emerald-500 text-white font-black text-xs shadow-md"
                    >
                      {userRole === "seller" ? "Dashboard Seller" : "Dashboard Admin"}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    className="w-full py-3 text-center rounded-2xl border border-red-500/40 text-red-400 font-bold text-xs hover:bg-red-500/10 transition"
                  >
                    Keluar Akun
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-3 rounded-2xl border border-white/20 text-white font-bold text-xs">
                      Masuk
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-lime-400 text-[#145A3B] font-extrabold text-xs shadow-md">
                      Daftar
                    </button>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}