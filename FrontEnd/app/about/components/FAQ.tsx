"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { faqs } from "../utils/aboutData";

export default function FAQ() {

  const [

    active,

    setActive

  ] = useState<number | null>(0);

  return (

    <section className="py-20">

      <div className="text-center mb-16">

        <p

          className="
          uppercase
          tracking-[4px]
          font-semibold
          text-[#145A3B]
          "

        >

          FAQ

        </p>

        <h2

          className="
          text-5xl
          font-bold
          mt-4
          "

        >

          Frequently Asked Questions

        </h2>

      </div>

      <div

        className="
        max-w-4xl
        mx-auto
        space-y-6
        "

      >

        {

          faqs.map((faq, index) => (

            <div

              key={index}

              className="
              bg-white
              rounded-[25px]
              shadow-sm
              overflow-hidden
              "

            >

              <button

                onClick={() =>

                  setActive(

                    active === index

                      ? null

                      : index

                  )

                }

                className="
                w-full
                flex
                justify-between
                items-center
                p-7
                text-left
                "

              >

                <span

                  className="
                  text-xl
                  font-semibold
                  "

                >

                  {faq.question}

                </span>

                <FaChevronDown

                  className={`

                  transition-transform

                  ${

                    active === index

                      ? "rotate-180"

                      : ""

                  }

                  `}

                />

              </button>

              {

                active === index && (

                  <div

                    className="
                    px-7
                    pb-7
                    text-gray-600
                    leading-8
                    "

                  >

                    {faq.answer}

                  </div>

                )

              }

            </div>

          ))

        }

      </div>

    </section>

  );

}