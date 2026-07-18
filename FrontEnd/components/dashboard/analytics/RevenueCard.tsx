"use client";

interface RevenueCardProps {

    revenue:number;

}

export default function RevenueCard({

    revenue,

}:RevenueCardProps){

    return(

        <div
            className="
            bg-white
            rounded-3xl
            shadow-sm
            p-8
            "
        >

            <p className="text-gray-500">

                Total Revenue

            </p>

            <h2
                className="
                mt-3
                text-4xl
                font-bold
                text-[#145A3B]
                "
            >

                Rp {revenue.toLocaleString("id-ID")}

            </h2>

            <p
                className="
                mt-4
                text-sm
                text-green-600
                "
            >

                Berdasarkan seluruh transaksi.

            </p>

        </div>

    );

}
