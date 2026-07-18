"use client";

import { FaSearch } from "react-icons/fa";

interface OrderFilterProps {

    search: string;

    status: string;

    onSearchChange: (value: string) => void;

    onStatusChange: (value: string) => void;

}

export default function OrderFilter({

    search,

    status,

    onSearchChange,

    onStatusChange,

}: OrderFilterProps) {

    return (

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">

            <div className="grid md:grid-cols-2 gap-5">

                <div className="relative">

                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

                    <input

                        value={search}

                        onChange={(e)=>onSearchChange(e.target.value)}

                        placeholder="Search Order..."

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

                    <option value="Pending">

                        Pending

                    </option>

                    <option value="Processing">

                        Processing

                    </option>

                    <option value="Completed">

                        Completed

                    </option>

                    <option value="Cancelled">

                        Cancelled

                    </option>

                </select>

            </div>

        </div>

    );

}
