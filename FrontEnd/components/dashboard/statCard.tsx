import { ReactNode } from "react";

interface StatCardProps {

  title: string;

  value: string | number;

  growth?: string;

  icon: ReactNode;

}

export default function StatCard({

  title,

  value,

  growth,

  icon,

}: StatCardProps) {

  return (

    <div

      className="
      bg-white
      rounded-[30px]
      p-7
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1
      "

    >

      <div

        className="
        flex
        justify-between
        items-center
        "

      >

        <div>

          <p

            className="
            text-gray-500
            text-sm
            "

          >

            {title}

          </p>

          <h2

            className="
            text-4xl
            font-bold
            mt-3
            "

          >

            {value}

          </h2>

          {

            growth && (

              <p

                className="
                mt-3
                text-green-600
                text-sm
                font-semibold
                "

              >

                ↑ {growth}

              </p>

            )

          }

        </div>

        <div

          className="
          w-14
          h-14
          rounded-2xl
          bg-emerald-50
          text-[#145A3B]
          flex
          items-center
          justify-center
          text-2xl
          "

        >

          {icon}

        </div>

      </div>

    </div>

  );

}