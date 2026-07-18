"use client";

interface StatusBadgeProps {

    status?: string;

}

export default function StatusBadge({

    status = "active",

}: StatusBadgeProps) {

    const safeStatus = status || "active";

    const getStyle = () => {

        switch (safeStatus.toLowerCase()) {

            case "active":

                return "bg-green-100 text-green-700";

            case "inactive":

                return "bg-red-100 text-red-700";

            case "pending":

                return "bg-yellow-100 text-yellow-700";

            case "completed":

                return "bg-blue-100 text-blue-700";

            case "cancelled":

                return "bg-gray-100 text-gray-700";

            case "published":

                return "bg-emerald-100 text-emerald-700";

            case "draft":

                return "bg-orange-100 text-orange-700";

            case "banned":

                return "bg-red-100 text-red-700";

            default:

                return "bg-gray-100 text-gray-700";

        }

    };

    return (

        <span

            className={`
            inline-flex
            items-center
            justify-center
            px-4
            py-2
            rounded-full
            text-xs
            font-semibold
            ${getStyle()}
            `}

        >

            {safeStatus}

        </span>

    );

}