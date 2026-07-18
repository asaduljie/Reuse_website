"use client";
import StatusBadge from "../common/statusBadge";
import EmptyState from "../common/EmptyState";

import Link from "next/link";

import {
    FaEye,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

interface Product {

    id: number;

    image: string;

    name: string;

    category: string;

    price: number;

    stock: number;

    status: "active" | "inactive";

}

interface ProductTableProps {

    products: Product[];

    onDelete: (id: number) => void;

}

export default function ProductTable({

    products,

    onDelete,

}: ProductTableProps) {

    return (

        <div
            className="
            bg-white
            rounded-[30px]
            shadow-sm
            overflow-hidden
            "
        >

            <table className="w-full">

                <thead
                    className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs tracking-wider uppercase"
                >
                    <tr>
                        <th className="px-6 py-4 text-left">
                            Product
                        </th>
                        <th className="px-6 py-4 text-left">
                            Category
                        </th>
                        <th className="px-6 py-4 text-right">
                            Price
                        </th>
                        <th className="px-6 py-4 text-center">
                            Stock
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

                        products.length === 0 ?

                        (

                            <tr>

                                <td colSpan={6} className="p-0">

                                    <EmptyState

                                        title="No Products"

                                        description="There are no products available."

                                    />

                                </td>

                            </tr>

                        )

                        :

                        (

                            products.map((product)=>(

                                <tr

                                    key={product.id}

                                    className="
                                    border-b
                                    hover:bg-gray-50
                                    transition
                                    "

                                >

                                    <td className="px-6 py-5">

                                        <div
                                            className="
                                            flex
                                            items-center
                                            gap-4
                                            "
                                        >

                                            <img

                                                src={product.image}

                                                alt={product.name}

                                                className="
                                                w-16
                                                h-16
                                                rounded-xl
                                                object-cover
                                                border
                                                "

                                            />

                                            <div>

                                                <h3
                                                    className="
                                                    font-semibold
                                                    "
                                                >

                                                    {product.name}

                                                </h3>

                                                <p
                                                    className="
                                                    text-sm
                                                    text-gray-500
                                                    "
                                                >

                                                    ID #{product.id}

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5">

                                        {product.category}

                                    </td>

                                    <td
                                        className="
                                        px-6
                                        py-5
                                        text-right
                                        font-semibold
                                        "
                                    >

                                        Rp{" "}

                                        {

                                            product.price.toLocaleString("id-ID")

                                        }

                                    </td>

                                    <td
                                        className="
                                        px-6
                                        py-5
                                        text-center
                                        "
                                    >

                                        {product.stock}

                                    </td>

                                    <td
                                        className="
                                        px-6
                                        py-5
                                        text-center
                                        "
                                    >

                                        <StatusBadge

    status={product.status}

/>

                                    </td>

                                    <td
                                        className="
                                        px-6
                                        py-5
                                        "
                                    >

                                        <div
                                            className="
                                            flex
                                            justify-center
                                            gap-3
                                            "
                                        >

                                            <Link

                                                href={`/products/${product.id}`}

                                                className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-blue-50
                                                text-blue-600
                                                flex
                                                items-center
                                                justify-center
                                                hover:bg-blue-600
                                                hover:text-white
                                                transition
                                                "

                                            >

                                                <FaEye/>

                                            </Link>

                                            <Link

                                                href={`/dashboard/admin/products/${product.id}/edit`}

                                                className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-yellow-50
                                                text-yellow-600
                                                flex
                                                items-center
                                                justify-center
                                                hover:bg-yellow-500
                                                hover:text-white
                                                transition
                                                "

                                            >

                                                <FaEdit/>

                                            </Link>

                                            <button

                                                onClick={()=>

                                                    onDelete(product.id)

                                                }

                                                className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-red-50
                                                text-red-600
                                                flex
                                                items-center
                                                justify-center
                                                hover:bg-red-600
                                                hover:text-white
                                                transition
                                                "

                                            >

                                                <FaTrash/>

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}