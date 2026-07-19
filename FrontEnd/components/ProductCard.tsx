"use client";

import Link from "next/link";
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
  createdAt?: string;
  created_at?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const isNew = (() => {
    const createdStr = product.createdAt || product.created_at;
    if (!createdStr) {
      return product.id > 2;
    }
    const createdDate = new Date(createdStr);
    const diffTime = Math.abs(new Date().getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 || product.id > 2;
  })();

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

          {isNew && (
            <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#145A3B] text-white text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-0.5 rounded-lg shadow-sm z-20 animate-pulse">
              New
            </span>
          )}

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