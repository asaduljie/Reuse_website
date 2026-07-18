"use client";

import { Order } from "../types";
import { orderAgain } from "../utils/orderAgain";

interface OrderCardProps {

  order: Order;

}

export default function OrderCard({

  order

}: OrderCardProps) {

  const getStatusClass = () => {

    switch (order.status) {

      case "Menunggu Konfirmasi":

        return "bg-yellow-100 text-yellow-700";

      case "Diproses":

        return "bg-blue-100 text-blue-700";

      case "Selesai":

        return "bg-green-100 text-green-700";

      default:

        return "bg-red-100 text-red-700";

    }

  };

  return (

    <div

      className="
      bg-white
      rounded-3xl
      shadow-sm
      p-8
      "

    >

      <div

        className="
        flex
        justify-between
        items-center
        mb-8
        "

      >

        <div>

          <h2

            className="
            text-2xl
            font-bold
            "

          >

            Order #

            {order.id}

          </h2>

          <p

            className="
            text-gray-500
            mt-2
            "

          >

            {order.date}

          </p>

        </div>

        <div

          className={`
          px-5
          py-2
          rounded-full
          font-semibold
          ${getStatusClass()}
          `}

        >

          {order.status}

        </div>

      </div>

      <div

        className="
        space-y-5
        "

      >

            {

        order.items.map(

          (item)=>(

            <div

              key={item.id}

              className="
              flex
              gap-5
              border-b
              border-gray-100
              pb-5
              "

            >

              <img

                src={item.imageUrl}

                alt={item.name}

                className="
                w-24
                h-24
                rounded-2xl
                object-cover
                "

              />

              <div

                className="
                flex-1
                "

              >

                <p

                  className="
                  text-sm
                  font-semibold
                  text-[#145A3B]
                  "

                >

                  {item.category}

                </p>

                <h3

                  className="
                  text-xl
                  font-bold
                  mt-2
                  "

                >

                  {item.name}

                </h3>

                <p

                  className="
                  text-gray-500
                  mt-3
                  "

                >

                  Qty :

                  <b>

                    {" "}

                    {item.qty}

                  </b>

                </p>

                <p

                  className="
                  text-gray-500
                  mt-1
                  "

                >

                  Harga :

                  <b>

                    {" "}

                    Rp {

                      Number(

                        item.price

                      ).toLocaleString(

                        "id-ID"

                      )

                    }

                  </b>

                </p>

              </div>

              <div

                className="
                text-right
                flex
                flex-col
                justify-between
                "

              >

                <div>

                  <p

                    className="
                    text-gray-500
                    "

                  >

                    Subtotal

                  </p>

                  <h3

                    className="
                    text-2xl
                    font-bold
                    text-[#145A3B]
                    mt-2
                    "

                  >

                    Rp {

                      (

                        item.price *

                        item.qty

                      ).toLocaleString(

                        "id-ID"

                      )

                    }

                  </h3>

                </div>

              </div>

            </div>

          )

        )

      }

      <div

        className="
        grid
        lg:grid-cols-2
        gap-8
        mt-8
        "

      >

            <div

        className="
        bg-[#F7F8FA]
        rounded-2xl
        p-6
        "

      >

        <h3

          className="
          text-xl
          font-bold
          mb-5
          "

        >

          Data Pembeli

        </h3>

        <div

          className="
          space-y-4
          text-gray-700
          "

        >

          <p>

            <span className="font-semibold">

              Nama

            </span>

            <br/>

            {order.customerName}

          </p>

          <p>

            <span className="font-semibold">

              Nomor WhatsApp

            </span>

            <br/>

            {order.phone}

          </p>

          <p>

            <span className="font-semibold">

              Alamat

            </span>

            <br/>

            {order.address}

          </p>

          <p>

            <span className="font-semibold">

              Catatan

            </span>

            <br/>

            {

              order.note

              ?

              order.note

              :

              "-"

            }

          </p>

        </div>

      </div>

      <div

        className="
        bg-[#F7F8FA]
        rounded-2xl
        p-6
        "

      >

        <h3

          className="
          text-xl
          font-bold
          mb-5
          "

        >

          Ringkasan Pesanan

        </h3>

        <div

          className="
          space-y-4
          "

        >

          <div

            className="
            flex
            justify-between
            "

          >

            <span>

              Total Item

            </span>

            <b>

              {order.totalItem}

            </b>

          </div>

          <div

            className="
            flex
            justify-between
            "

          >

            <span>

              Subtotal

            </span>

            <b>

              Rp {

                order.total.toLocaleString(

                  "id-ID"

                )

              }

            </b>

          </div>

          <div

            className="
            flex
            justify-between
            "

          >

            <span>

              Ongkir

            </span>

            <b

              className="
              text-green-600
              "

            >

              Gratis

            </b>

          </div>

          <hr/>

          <div

            className="
            flex
            justify-between
            text-2xl
            font-bold
            "

          >

            <span>

              Total

            </span>

            <span

              className="
              text-[#145A3B]
              "

            >

              Rp {

                order.total.toLocaleString(

                  "id-ID"

                )

              }

            </span>

          </div>

        </div>

      </div>

      </div>

      </div>

      <div

        className="
        flex
        gap-4
        mt-8
        "

      >

              <button

          onClick={() =>

            orderAgain(order)

          }

          className="
          flex-1
          bg-[#145A3B]
          text-white
          py-4
          rounded-2xl
          font-semibold
          hover:bg-green-900
          transition
          "

        >

          Pesan Lagi

        </button>

        <button

          className="
          flex-1
          border
          border-[#145A3B]
          text-[#145A3B]
          py-4
          rounded-2xl
          font-semibold
          hover:bg-[#145A3B]
          hover:text-white
          transition
          "

        >

          Lihat Detail

        </button>

      </div>

    </div>

  );

}