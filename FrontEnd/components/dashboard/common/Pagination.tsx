"use client";

import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

interface PaginationProps {

    currentPage: number;

    totalPages: number;

    onPageChange: (page: number) => void;

}

export default function Pagination({

    currentPage,

    totalPages,

    onPageChange,

}: PaginationProps) {

    if (totalPages <= 1) {

        return null;

    }

    return (

        <div
            className="
            flex
            justify-between
            items-center
            mt-8
            "
        >

            <button

                disabled={currentPage===1}

                onClick={()=>

                    onPageChange(

                        currentPage-1

                    )

                }

                className="
                px-5
                py-3
                border
                rounded-xl
                disabled:opacity-40
                hover:bg-gray-100
                transition
                "

            >

                <FaChevronLeft/>

            </button>

            <div
                className="
                flex
                gap-3
                "
            >

                {

                    [...Array(totalPages)].map(

                        (_,index)=>(

                            <button

                                key={index}

                                onClick={()=>

                                    onPageChange(

                                        index+1

                                    )

                                }

                                className={`

                                w-11

                                h-11

                                rounded-xl

                                transition

                                ${

                                currentPage===index+1

                                ?

                                "bg-[#145A3B] text-white"

                                :

                                "bg-white border"

                                }

                                `}

                            >

                                {index+1}

                            </button>

                        )

                    )

                }

            </div>

            <button

                disabled={

                    currentPage===totalPages

                }

                onClick={()=>

                    onPageChange(

                        currentPage+1

                    )

                }

                className="
                px-5
                py-3
                border
                rounded-xl
                disabled:opacity-40
                hover:bg-gray-100
                transition
                "

            >

                <FaChevronRight/>

            </button>

        </div>

    );

}
