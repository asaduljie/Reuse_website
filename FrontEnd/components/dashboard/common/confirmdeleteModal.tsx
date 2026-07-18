"use client";

import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmDeleteModalProps {

    open: boolean;

    title?: string;

    message?: string;

    loading?: boolean;

    onClose: () => void;

    onConfirm: () => void;

}

export default function ConfirmDeleteModal({

    open,

    title = "Delete Data",

    message = "Are you sure you want to delete this data?",

    loading = false,

    onClose,

    onConfirm,

}: ConfirmDeleteModalProps) {

    if (!open) return null;

    return (

        <div
            className="
            fixed
            inset-0
            bg-black/50
            z-50
            flex
            items-center
            justify-center
            p-4
            "
        >

            <div
                className="
                bg-white
                rounded-3xl
                shadow-2xl
                w-full
                max-w-md
                p-8
                "
            >

                <div
                    className="
                    w-20
                    h-20
                    rounded-full
                    bg-red-100
                    mx-auto
                    flex
                    items-center
                    justify-center
                    "
                >

                    <FaExclamationTriangle

                        className="
                        text-red-600
                        text-3xl
                        "

                    />

                </div>

                <h2
                    className="
                    text-2xl
                    font-bold
                    text-center
                    mt-6
                    "
                >

                    {title}

                </h2>

                <p
                    className="
                    text-center
                    text-gray-500
                    mt-3
                    "
                >

                    {message}

                </p>

                <div
                    className="
                    flex
                    gap-4
                    mt-8
                    "
                >

                    <button

                        onClick={onClose}

                        className="
                        flex-1
                        border
                        rounded-2xl
                        py-3
                        font-semibold
                        hover:bg-gray-100
                        transition
                        "

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onConfirm}

                        disabled={loading}

                        className="
                        flex-1
                        bg-red-600
                        text-white
                        rounded-2xl
                        py-3
                        font-semibold
                        hover:bg-red-700
                        transition
                        disabled:opacity-60
                        "

                    >

                        {

                            loading

                            ?

                            "Deleting..."

                            :

                            "Delete"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}