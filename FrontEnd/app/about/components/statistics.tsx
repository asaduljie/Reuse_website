import { statistics } from "../utils/aboutData";

export default function Statistics() {

  return (

    <section className="py-20">

      <div

        className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-8
        "

      >

        {

          statistics.map((item, index) => (

            <div

              key={index}

              className="
              bg-white
              rounded-[30px]
              p-10
              text-center
              shadow-sm
              hover:shadow-xl
              transition
              hover:-translate-y-2
              "

            >

              <h2

                className="
                text-5xl
                font-bold
                text-[#145A3B]
                "

              >

                {item.value}

              </h2>

              <p

                className="
                mt-4
                text-gray-600
                font-medium
                "

              >

                {item.title}

              </p>

            </div>

          ))

        }

      </div>

    </section>

  );

}