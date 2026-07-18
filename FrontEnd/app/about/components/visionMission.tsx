import {
  FaBullseye,
  FaLeaf,
  FaRecycle,
  FaHandshake,
  FaShieldAlt,
} from "react-icons/fa";

export default function VisionMission() {

  const missions = [

    {

      icon: <FaRecycle />,

      title: "Mendukung Circular Economy",

      description:
        "Mendorong masyarakat untuk memperpanjang siklus hidup produk melalui jual beli barang preloved."

    },

    {

      icon: <FaLeaf />,

      title: "Ramah Lingkungan",

      description:
        "Mengurangi limbah konsumsi dengan memberikan kesempatan kedua bagi setiap produk."

    },

    {

      icon: <FaHandshake />,

      title: "Marketplace Terpercaya",

      description:
        "Menyediakan platform yang aman, nyaman, dan mudah digunakan oleh penjual maupun pembeli."

    },

    {

      icon: <FaShieldAlt />,

      title: "Pengalaman Terbaik",

      description:
        "Menghadirkan layanan modern dengan teknologi yang mempermudah proses transaksi."

    }

  ];

  return (

    <section className="py-20">

      <div className="text-center mb-16">

        <p className="uppercase tracking-[4px] font-semibold text-[#145A3B]">

          Vision & Mission

        </p>

        <h2 className="text-5xl font-bold mt-4">

          Membangun Marketplace

          <br />

          yang Berkelanjutan

        </h2>

      </div>

      {/* Vision */}

      <div

        className="
        bg-[#145A3B]
        rounded-[35px]
        text-white
        p-12
        mb-14
        "

      >

        <div className="flex items-center gap-5">

          <div

            className="
            w-16
            h-16
            rounded-full
            bg-white/20
            flex
            items-center
            justify-center
            text-3xl
            "

          >

            <FaBullseye />

          </div>

          <div>

            <p className="uppercase tracking-[3px] text-green-200">

              Our Vision

            </p>

            <h3 className="text-3xl font-bold mt-2">

              Menjadi Marketplace Preloved Terpercaya

              di Indonesia

            </h3>

          </div>

        </div>

        <p

          className="
          mt-8
          text-lg
          leading-9
          text-green-100
          "

        >

          ReUse berkomitmen menjadi platform digital yang
          menghubungkan masyarakat dalam menjual dan membeli
          produk preloved berkualitas sehingga tercipta
          ekosistem perdagangan yang berkelanjutan, aman,
          dan ramah lingkungan.

        </p>

      </div>

      {/* Mission */}

      <div

        className="
        grid
        md:grid-cols-2
        gap-8
        "

      >

        {

          missions.map((mission, index) => (

            <div

              key={index}

              className="
              bg-white
              rounded-[30px]
              p-8
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              hover:-translate-y-2
              "

            >

              <div

                className="
                w-16
                h-16
                rounded-2xl
                bg-[#145A3B]
                text-white
                flex
                items-center
                justify-center
                text-3xl
                "

              >

                {mission.icon}

              </div>

              <h3

                className="
                mt-6
                text-2xl
                font-bold
                "

              >

                {mission.title}

              </h3>

              <p

                className="
                mt-4
                text-gray-600
                leading-8
                "

              >

                {mission.description}

              </p>

            </div>

          ))

        }

      </div>

    </section>

  );

}