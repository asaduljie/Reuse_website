"use client";

import { useEffect, useState } from "react";

import { Category } from "../types";

import { categoryData } from "../utils/categoryData";

import CategoryCard from "./categoryCard";
import EmptyCategory from "./emptyCategory";

export default function CategoryGrid() {

  const [

    categories,

    setCategories

  ] = useState<Category[]>([]);

  const [

    loading,

    setLoading

  ] = useState(true);

  useEffect(() => {

    setTimeout(() => {

      setCategories(

        categoryData

      );

      setLoading(false);

    }, 500);

  }, []);

  if (loading) {

    return (

      <div

        className="
        py-24
        text-center
        "

      >

        <div

          className="
          w-14
          h-14
          border-4
          border-[#145A3B]
          border-t-transparent
          rounded-full
          animate-spin
          mx-auto
          "

        />

        <p

          className="
          mt-6
          text-gray-500
          "

        >

          Memuat kategori...

        </p>

      </div>

    );

  }

  if (categories.length === 0) {

    return <EmptyCategory />;

  }

  return (

    <section

      className="
      mt-16
      "

    >

      <div

        className="
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
        "

      >

        {

          categories.map(

            (category) => (

              <CategoryCard

                key={category.id}

                category={category}

              />

            )

          )

        }

      </div>

    </section>

  );

}