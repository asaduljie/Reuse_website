"use client";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import AboutHero from "./components/aboutHero";
import AboutStory from "./components/aboutStory";
import VisionMission from "./components/visionMission";
import Statistics from "./components/statistics";
import FAQ from "./components/FAQ";

export default function AboutPage() {

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
          space-y-10
          "

        >

          <AboutHero />

          <AboutStory />

          <VisionMission />

          <Statistics />

          <FAQ />

        </div>

      </main>

      <Footer />

    </>

  );

}