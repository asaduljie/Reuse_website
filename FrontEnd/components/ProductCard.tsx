"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import ProductActions from "./products/productActions";
import { getUser } from "../utils/auth";
import { addToWishlist, removeFromWishlist, isInWishlist } from "../services/wishlistService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFavorite(isInWishlist(user.id, product.id));
    }
  }, [product.id]);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const user = getUser();
    if (!user) {
      alert("Silakan login terlebih dahulu untuk menggunakan fitur Wishlist.");
      router.push("/login");
      return;
    }

    if (favorite) {
      removeFromWishlist(user.id, product.id);
      setFavorite(false);
    } else {
      addToWishlist({
        userId: user.id,
        productId: product.id,
        productName: product.name,
        productImage: product.imageUrl,
        price: product.price,
        sellerId: 3,
        sellerName: "ReUse Store",
      });
      setFavorite(true);
    }
  };

  return (

    <Link href={`/products/${product.id}`}>

      <div
        className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        border
        border-gray-100
        group
        cursor-pointer
        "
      >

        {/* IMAGE */}

        <div
          className="
          relative
          h-40 sm:h-56 lg:h-72
          bg-[#F8F8F8]
          flex
          items-center
          justify-center
          p-3 sm:p-5
          "
        >

          <img
            src={product.imageUrl}
            alt={product.name}
            className="
            max-w-full
            max-h-full
            object-contain
            group-hover:scale-105
            transition
            duration-300
            "
          />

          <button
            onClick={handleWishlist}
            className="
            absolute
            top-2 right-2 sm:top-4 sm:right-4
            w-8 h-8 sm:w-10 sm:h-10
            rounded-full
            bg-white/90
            backdrop-blur-sm
            shadow-md
            flex
            items-center
            justify-center
            hover:bg-red-50
            transition
            cursor-pointer
            z-20
            "
          >

            <FaHeart
              className={`
              text-xs sm:text-sm
              transition-colors
              duration-300
              ${favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}
              `}
            />

          </button>

        </div>

        {/* CONTENT */}

        <div className="p-3 sm:p-5">

          <span
            className="
            inline-block
            bg-[#145A3B]/10
            text-[#145A3B]
            px-2 sm:px-3
            py-0.5 sm:py-1
            rounded-full
            text-[10px] sm:text-xs
            font-bold
            "
          >

            {product.category}

          </span>

          <h2
            className="
            mt-2 lg:mt-4
            font-extrabold
            text-xs sm:text-sm lg:text-lg
            text-gray-800
            line-clamp-2
            min-h-[32px] sm:min-h-[40px] lg:min-h-[56px]
            "
          >

            {product.name}

          </h2>

          <p
            className="
            text-[10px] sm:text-xs lg:text-sm
            text-gray-400
            mt-1 lg:mt-2
            line-clamp-2
            h-8 lg:h-10
            font-semibold
            "
          >

            {product.description}

          </p>

          <div className="mt-2 lg:mt-4">

            <span
              className="
              text-sm sm:text-base lg:text-2xl
              font-black
              text-[#145A3B]
              "
            >

              Rp{" "}

              {Number(product.price)
                .toLocaleString("id-ID")}

            </span>

          </div>

          <ProductActions
            product={product}
          />

        </div>

      </div>

    </Link>

  );

}