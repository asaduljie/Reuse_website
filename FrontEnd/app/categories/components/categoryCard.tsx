"use client";

import Link from "next/link";
import { Category } from "../types";
import { FaArrowRight } from "react-icons/fa";

interface CategoryCardProps {

  category: Category;

}

export default function CategoryCard({

  category,

}: CategoryCardProps) {

  return (

    <Link

      href={`/products?category=${category.slug}`}

      className="
      group
      block
      "

    >

      <div

        className="
        bg-white
        rounded-[30px]
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-2
        "

      >

        <div

          className="
          h-60
          overflow-hidden
          "

        >

          <img

            src={category.image}

            alt={category.name}

            className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
            "

          />

        </div>

        <div

          className="
          p-7
          "

        >

          <div

            className="
            flex
            justify-between
            items-start
            "

          >

            <div>

              <h2

                className="
                text-2xl
                font-bold
                text-gray-900
                "

              >

                {category.name}

              </h2>

              <p

                className="
                text-[#145A3B]
                font-medium
                mt-2
                "

              >

                {category.totalProducts}

                {" "}

                Produk

              </p>

            </div>

            <div

              className="
              w-12
              h-12
              rounded-full
              bg-[#145A3B]
              text-white
              flex
              items-center
              justify-center
              group-hover:translate-x-1
              transition
              "

            >

              <FaArrowRight />

            </div>

          </div>

          <p

            className="
            mt-6
            text-gray-500
            leading-7
            "

          >

            {category.description}

          </p>

        </div>

      </div>

    </Link>

  );

}