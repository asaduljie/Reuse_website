"use client";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Props {
    verified: boolean;
}

export default function VerificationBadge({ verified }: Props) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                verified
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-50 text-gray-500 border-gray-200"
            }`}
        >
            {verified ? (
                <>
                    <FaCheckCircle className="text-green-600" /> Verified
                </>
            ) : (
                <>
                    <FaTimesCircle className="text-gray-400" /> Not Verified
                </>
            )}
        </span>
    );
}
