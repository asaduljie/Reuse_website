"use client";

import Link from "next/link";

import {

FaEye,

FaEdit,

FaTrash,

} from "react-icons/fa";

import StatusBadge from "../common/statusBadge";

interface Category{

    id:number;

    image:string;

    name:string;

    totalProducts:number;

    status:string;

}

interface Props{

    categories:Category[];

    onDelete:(id:number)=>void;

}

export default function CategoryTable({

    categories,

    onDelete,

}:Props){

    return(

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto w-full custom-scrollbar">
                <table className="w-full min-w-[800px]">

                <thead className="bg-[#145A3B] text-white">

                    <tr>

                        <th className="px-6 py-5 text-left">

                            Category

                        </th>

                        <th className="px-6 py-5 text-center">

                            Products

                        </th>

                        <th className="px-6 py-5 text-center">

                            Status

                        </th>

                        <th className="px-6 py-5 text-center">

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        categories.map(category=>(

                            <tr

                                key={category.id}

                                className="border-b hover:bg-gray-50"

                            >

                                <td className="px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <img

                                            src={category.image}

                                            className="w-16 h-16 rounded-xl object-cover"

                                        />

                                        <div>

                                            <h3 className="font-semibold">

                                                {category.name}

                                            </h3>

                                            <p className="text-sm text-gray-500">

                                                #{category.id}

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                <td className="text-center">

                                    {category.totalProducts}

                                </td>

                                <td className="text-center">

                                    <StatusBadge

                                        status={category.status}

                                    />

                                </td>

                                <td>

                                    <div className="flex justify-center gap-3">

                                        <Link

                                            href={`/dashboard/admin/categories/${category.id}`}

                                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"

                                        >

                                            <FaEye/>

                                        </Link>

                                        <Link

                                            href={`/dashboard/admin/categories/${category.id}/edit`}

                                            className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center"

                                        >

                                            <FaEdit/>

                                        </Link>

                                        <button

                                            onClick={()=>onDelete(category.id)}

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

        </div>

    );

}
