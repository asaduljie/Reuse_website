"use client";

import { FaSearch, FaFilter } from "react-icons/fa";

interface ProductFilterProps {

    search: string;

    onSearchChange: (value: string) => void;

    category: string;

    onCategoryChange: (value: string) => void;

    status: string;

    onStatusChange: (value: string) => void;

    sort: string;

    onSortChange: (value: string) => void;

    categories: string[];

}

export default function ProductFilter({

    search,

    onSearchChange,

    category,

    onCategoryChange,

    status,

    onStatusChange,

    sort,

    onSortChange,

    categories,

}: ProductFilterProps) {

    return (

        <div
            className="
            bg-white
            rounded-[30px]
            shadow-sm
            p-6
            mb-8
            "
        >

            <div
                className="
                grid
                grid-cols-1
                lg:grid-cols-4
                gap-5
                "
            >

                {/* Search */}

                <div className="relative">

                    <FaSearch
                        className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        "
                    />

                    <input

                        type="text"

                        value={search}

                        onChange={(e)=>

                            onSearchChange(

                                e.target.value

                            )

                        }

                        placeholder="Search product..."

                        className="
                        w-full
                        border
                        rounded-2xl
                        py-3
                        pl-12
                        pr-4
                        outline-none
                        focus:border-[#145A3B]
                        "
                    />

                </div>

                {/* Category */}

                <select

                    value={category}

                    onChange={(e)=>

                        onCategoryChange(

                            e.target.value

                        )

                    }

                    className="
                    border
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    focus:border-[#145A3B]
                    "

                >

                    <option value="">

                        All Categories

                    </option>

                    {

                        categories.map(

                            (item)=>(

                                <option

                                    key={item}

                                    value={item}

                                >

                                    {item}

                                </option>

                            )

                        )

                    }

                </select>

                {/* Status */}

                <select

                    value={status}

                    onChange={(e)=>

                        onStatusChange(

                            e.target.value

                        )

                    }

                    className="
                    border
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    focus:border-[#145A3B]
                    "

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

                {/* Sort */}

                <div className="relative">

                    <FaFilter

                        className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        "

                    />

                    <select

                        value={sort}

                        onChange={(e)=>

                            onSortChange(

                                e.target.value

                            )

                        }

                        className="
                        w-full
                        border
                        rounded-2xl
                        py-3
                        pl-12
                        pr-4
                        outline-none
                        focus:border-[#145A3B]
                        "

                    >

                        <option value="latest">

                            Latest

                        </option>

                        <option value="oldest">

                            Oldest

                        </option>

                        <option value="price_asc">

                            Lowest Price

                        </option>

                        <option value="price_desc">

                            Highest Price

                        </option>

                        <option value="stock">

                            Highest Stock

                        </option>

                    </select>

                </div>

            </div>

        </div>

    );

}