"use client";

import { useEffect, useState } from "react";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import EmptyOrder from "./components/emptyOrder";
import OrderCard from "./components/orderCard";

import { getOrders } from "../../services/orderService";
import type { Order } from "./types";

export default function OrdersPage() {

  const [

    orders,

    setOrders

  ] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getOrders();
      setOrders(data as any as Order[]);
    };
    loadOrders();
  }, []);

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
          "

        >

          <div

            className="
            mb-12
            "

          >

            <p

              className="
              uppercase
              tracking-widest
              text-[#145A3B]
              font-semibold
              "

            >

              Orders

            </p>

            <h1

              className="
              text-5xl
              font-bold
              mt-3
              "

            >

              Riwayat Pesanan

            </h1>

            <p

              className="
              mt-4
              text-gray-500
              "

            >

              Seluruh transaksi yang pernah Anda lakukan
              akan ditampilkan pada halaman ini.

            </p>

          </div>

          {

            orders.length===0

            ?

            <EmptyOrder/>

            :

            <div

              className="
              space-y-8
              "

            >
                              {

                orders.map(

                  (order) => (

                    <OrderCard

                      key={order.id}

                      order={order}

                    />

                  )

                )

              }

            </div>

          }

        </div>

      </main>

      <Footer />

    </>

  );

}