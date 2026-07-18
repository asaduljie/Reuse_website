"use client";

import Link from "next/link";

interface Order {

    id:number;

    customerName:string;

    total:number;

    status:string;

}

interface Props{

    orders:Order[];

}

export default function RecentOrdersCard({

    orders,

}:Props){

    return(

        <div
            className="
            bg-white
            rounded-3xl
            shadow-sm
            p-8
            "
        >

            <div className="flex justify-between">

                <h2
                    className="
                    text-xl
                    font-bold
                    "
                >

                    Recent Orders

                </h2>

                <Link

                    href="/dashboard/admin/orders"

                    className="text-[#145A3B]"

                >

                    View All

                </Link>

            </div>

            <div className="mt-6 space-y-5">

                {

                    orders.slice(0,5).map(order=>(

                        <div

                            key={order.id}

                            className="flex justify-between"

                        >

                            <div>

                                <h3 className="font-semibold">

                                    {order.customerName}

                                </h3>

                                <p className="text-sm text-gray-500">

                                    #{order.id}

                                </p>

                            </div>

                            <div className="text-right">

                                <p>

                                    Rp {order.total.toLocaleString("id-ID")}

                                </p>

                                <p className="text-sm text-gray-500">

                                    {order.status}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}
