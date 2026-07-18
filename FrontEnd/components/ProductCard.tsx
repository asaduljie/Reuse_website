"use client";

import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import ProductActions from "./products/productActions";

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
          h-72
          bg-[#F8F8F8]
          flex
          items-center
          justify-center
          p-5
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
            className="
            absolute
            top-4
            right-4
            w-10
            h-10
            rounded-full
            bg-white
            shadow
            flex
            items-center
            justify-center
            hover:bg-red-50
            "
          >

            <FaHeart
              className="
              text-gray-500
              hover:text-red-500
              "
            />

          </button>

        </div>

        {/* CONTENT */}

        <div className="p-5">

          <span
            className="
            inline-block
            bg-green-100
            text-green-700
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            "
          >

            {product.category}

          </span>

          <h2
            className="
            mt-4
            font-bold
            text-xl
            text-gray-800
            line-clamp-2
            min-h-[56px]
            "
          >

            {product.name}

          </h2>

          <p
            className="
            text-sm
            text-gray-500
            mt-2
            line-clamp-2
            h-10
            "
          >

            {product.description}

          </p>

          <div className="mt-4">

            <span
              className="
              text-2xl
              font-bold
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