"use client";

import { FaSearch } from "react-icons/fa";

interface CategoryFilterProps{

    search:string;

    onSearchChange:(value:string)=>void;

    status:string;

    onStatusChange:(value:string)=>void;

}

export default function CategoryFilter({

    search,

    onSearchChange,

    status,

    onStatusChange,

}:CategoryFilterProps){

    return(

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">

            <div className="grid lg:grid-cols-2 gap-5">

                <div className="relative">

                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

                    <input

                        value={search}

                        onChange={(e)=>onSearchChange(e.target.value)}

                        placeholder="Search Category..."

                        className="w-full border rounded-2xl py-3 pl-12 pr-4"

                    />

                </div>

                <select

                    value={status}

                    onChange={(e)=>onStatusChange(e.target.value)}

                    className="border rounded-2xl px-4 py-3"

                >

                    <option value="">

                        All Status

                    </option>

                    <option value="active">

                        Active

                    </option>

                    <option value="inactive">

                        Inactive

                    </option>

                </select>

            </div>

        </div>

    );

}
