"use client";

import { useEffect, useState } from "react";
import {
  FaHeart,
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

import {
  addToCart,
  getCart,
  updateQuantity,
  removeCart,
} from "../../services/cartService";

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

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const router = useRouter();
  const [qty, setQty] = useState(0);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const cart = getCart();

    const item = cart.find(
      (item) => item.id === product.id
    );

    if (item) {
      setQty(item.qty);
    }
  }, [product.id]);

  const showAddedBadge = () => {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  const addProduct = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      ...product,
      qty: 1,
    });

    setQty(1);
    router.push("/cart");
  };

  const increase = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const newQty = qty + 1;

    updateQuantity(
      product.id,
      newQty
    );

    setQty(newQty);
  };

  const decrease = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (qty <= 1) {
      removeCart(product.id);
      setQty(0);
      return;
    }

    const newQty = qty - 1;

    updateQuantity(
      product.id,
      newQty
    );

    setQty(newQty);
  };

  return (
    <div className="flex justify-end items-center mt-3 sm:mt-5 w-full">
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Wishlist */}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            setLiked(!liked);
          }}
          className="
          w-9 sm:w-11
          h-9 sm:h-11
          rounded-full
          border
          border-gray-200
          bg-white
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-110
          cursor-pointer
          "
        >
          <FaHeart
            className={`
              text-xs sm:text-base
              ${liked ? "text-red-500" : "text-gray-400"}
            `}
          />
        </button>

        {/* Cart */}

        <div className="relative">

          {added && (
            <div
              className="
              absolute
              -top-9 sm:-top-11
              left-1/2
              -translate-x-1/2
              bg-[#145A3B]
              text-white
              text-[10px] sm:text-xs
              px-2.5 sm:px-3
              py-1 sm:py-2
              rounded-full
              whitespace-nowrap
              shadow-lg
              animate-bounce
              "
            >
              ✓ Added
            </div>
          )}

          {qty === 0 ? (
            <button
              onClick={addProduct}
              className="
              w-9 sm:w-11
              h-9 sm:h-11
              rounded-full
              bg-[#145A3B]
              text-white
              flex
              items-center
              justify-center
              hover:bg-green-900
              hover:scale-110
              transition-all
              duration-300
              cursor-pointer
              "
            >
              <FaShoppingCart className="text-xs sm:text-base" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push("/cart");
              }}
              className="
              px-2.5 sm:px-4
              py-2 sm:py-2.5
              rounded-full
              bg-emerald-50
              text-[#145A3B]
              border
              border-[#145A3B]/20
              text-[9px] sm:text-xs
              font-bold
              flex
              items-center
              gap-1 sm:gap-1.5
              hover:bg-emerald-100
              transition-all
              duration-300
              cursor-pointer
              whitespace-nowrap
              "
            >
              <FaShoppingCart className="text-[9px] sm:text-[10px]" />
              <span className="hidden sm:inline ml-1"> di Keranjang</span>
              <span className="inline sm:hidden font-black ml-1">✓</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
}