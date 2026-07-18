"use client";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import CategoryHero from "./components/categoryHero";
import CategoryGrid from "./components/categoryGrid";

export default function CategoriesPage() {

  return (

    <>

      <Navbar />

      <main

        className="
        min-h-screen
        bg-[#F7F8FA]
        "

      >

        <div

          className="
          max-w-7xl
          mx-auto
          px-6
          py-12
          space-y-16
          "

        >

          <CategoryHero />

          <CategoryGrid />

        </div>

      </main>

      <Footer />

    </>

  );

}