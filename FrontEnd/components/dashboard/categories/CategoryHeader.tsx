"use client";

import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface CategoryHeaderProps {

    title?: string;

    description?: string;

    buttonText?: string;

    addUrl?: string;

}

export default function CategoryHeader({

    title="Categories",

    description="Kelola kategori produk marketplace.",

    buttonText="Add Category",

    addUrl="/dashboard/admin/categories/create",

}:CategoryHeaderProps){

    return(

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

            <div>

                <h1 className="text-4xl font-bold text-gray-800">

                    {title}

                </h1>

                <p className="mt-3 text-gray-500">

                    {description}

                </p>

            </div>

            <Link

                href={addUrl}

                className="inline-flex items-center gap-3 bg-[#145A3B] hover:bg-[#0F472E] text-white px-6 py-4 rounded-2xl font-semibold transition"

            >

                <FaPlus/>

                {buttonText}

            </Link>

        </div>

    );

}
