"use client";

import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface ProductHeaderProps {

  title?: string;

  description?: string;

  addUrl?: string;

  buttonText?: string;

}

export default function ProductHeader({

  title = "Products",

  description = "Kelola seluruh produk marketplace.",

  addUrl = "/dashboard/admin/products/create",

  buttonText = "Add Product",

}: ProductHeaderProps) {

  return (

    <div
      className="
      flex
      flex-col
      lg:flex-row
      lg:items-center
      lg:justify-between
      gap-6
      mb-8
      "
    >

      <div>

        <h1
          className="
          text-4xl
          font-bold
          text-gray-800
          "
        >
          {title}
        </h1>

        <p
          className="
          mt-3
          text-gray-500
          "
        >
          {description}
        </p>

      </div>

      <Link
        href={addUrl}
        className="
        inline-flex
        items-center
        gap-3
        bg-[#145A3B]
        hover:bg-[#0F472E]
        text-white
        px-6
        py-4
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        shadow-lg
        hover:shadow-xl
        hover:-translate-y-1
        "
      >

        <FaPlus />

        {buttonText}

      </Link>

    </div>

  );

}