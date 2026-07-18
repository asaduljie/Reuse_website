"use client";

import Link from "next/link";

import {

    FaEye,

    FaTrash,

} from "react-icons/fa";

import StatusBadge from "../common/statusBadge";

interface Order {

    id: number;

    customerName: string;

    total: number;

    totalItem: number;

    date: string;

    status: string;

}

interface OrderTableProps {

    orders: Order[];

    onDelete: (id:number)=>void;

}

export default function OrderTable({

    orders,

    onDelete,

}:OrderTableProps){

    return(

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                    <tr>
                        <th className="px-6 py-4 text-left">
                            Order ID
                        </th>
                        <th className="px-6 py-4 text-left">
                            Customer
                        </th>
                        <th className="px-6 py-4 text-center">
                            Items
                        </th>
                        <th className="px-6 py-4 text-right">
                            Total
                        </th>
                        <th className="px-6 py-4 text-center">
                            Date
                        </th>
                        <th className="px-6 py-4 text-center">
                            Status
                        </th>
                        <th className="px-6 py-4 text-center">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {

                        orders.map(order=>(

                            <tr

                                key={order.id}

                                className="border-b hover:bg-gray-50"

                            >

                                <td className="px-6 py-5">

                                    #{order.id}

                                </td>

                                <td className="px-6 py-5">

                                    {order.customerName}

                                </td>

                                <td className="text-center">

                                    {order.totalItem}

                                </td>

                                <td className="text-right px-6">

                                    Rp {order.total.toLocaleString("id-ID")}

                                </td>

                                <td className="text-center">

                                    {order.date}

                                </td>

                                <td className="text-center">

                                    <StatusBadge

                                        status={order.status}

                                    />

                                </td>

                                <td>

                                    <div className="flex justify-center gap-3">

                                        <Link

                                            href={`/dashboard/admin/orders/${order.id}`}

                                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"

                                        >

                                            <FaEye/>

                                        </Link>

                                        <button

                                            onClick={()=>onDelete(order.id)}

                                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"

                                        >

                                            <FaTrash/>

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}
