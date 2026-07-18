"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "../utils/roleGuard";

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
      } catch {
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  };

  useEffect(() => {
    refreshUser();
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
          className="
          hidden
          lg:flex
          flex-1
          mx-10
          "
        >

          <div
            className="
            w-full
            relative
            "
          >

            <FaSearch
              className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-emerald-200/80
              "
            />

            <input

              value={keyword}

              onChange={(e)=>
                setKeyword(e.target.value)
              }

              placeholder="Search product..."

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

          </div>

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
            bg-white
            border-t
            "
          >

            <div className="p-5">

              <div
                className="
                relative
                mb-5
                "
              >

                <FaSearch
                  className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  "
                />

                <input

                  placeholder="Search product..."

                  className="
                  w-full
                  border
                  rounded-full
                  pl-12
                  pr-4
                  py-3
                  "

                />

              </div>

              {

                menus.map((menu,index)=>(

                  <Link

                    key={index}

                    href={menu.href}

                    onClick={()=>
                      setMenuOpen(false)
                    }

                    className="
                    block
                    py-4
                    border-b
                    "

                  >

                    {menu.name}

                  </Link>

                ))

              }

              <Link
                href="/wishlist"
                className="
                block
                py-4
                border-b
                "
              >

                Wishlist

              </Link>

              <Link
                href="/cart"
                className="
                block
                py-4
                border-b
                "
              >

                Cart ({cartCount})

              </Link>

              {

                !isLogin && (

                  <>

                    <Link
                      href="/login"
                      className="
                      block
                      py-4
                      border-b
                      "
                    >

                      Login

                    </Link>

                    <Link
                      href="/register"
                      className="
                      block
                      py-4
                      "
                    >

                      Register

                    </Link>

                  </>

                )

              }

            </div>

          </div>

        )

      }

    </header>

  );

}