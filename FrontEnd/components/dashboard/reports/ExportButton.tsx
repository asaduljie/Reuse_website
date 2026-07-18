"use client";

import { useState } from "react";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";

interface Props {
    reportType: string;
}

export default function ExportButton({ reportType }: Props) {
    const [status, setStatus] = useState<string | null>(null);

    const handleExport = (format: string) => {
        setStatus(`Generating ${format} for ${reportType}...`);
        setTimeout(() => {
            setStatus(null);
            alert(`[Demo Mode] ${format} file for "${reportType}" has been downloaded. (Backend API integration ready)`);
        }, 1500);
    };

    return (
        <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
                <button
                    onClick={() => handleExport("Excel")}
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-3 rounded-xl font-semibold text-sm transition shadow-sm"
                >
                    <FaFileExcel />
                    <span>Export Excel</span>
                </button>
                <button
                    onClick={() => handleExport("PDF")}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-semibold text-sm transition shadow-sm"
                >
                    <FaFilePdf />
                    <span>Export PDF</span>
                </button>
                <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-semibold text-sm transition shadow-sm"
                >
                    <FaPrint />
                    <span>Print Laporan</span>
                </button>
            </div>

            {/* Alert status overlay */}
            {status && (
                <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl z-50 text-sm font-semibold flex items-center gap-3 border border-gray-800 animate-bounce">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>{status}</span>
                </div>
            )}
        </div>
    );
}
