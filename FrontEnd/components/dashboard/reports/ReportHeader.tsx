"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import ExportButtons from "./ExportButtons";

interface Props {
    title: string;
    description: string;
    showBack?: boolean;
    showExport?: boolean;
}

export default function ReportHeader({ title, description, showBack = false, showExport = false }: Props) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="space-y-2">
                {showBack && (
                    <Link
                        href="/dashboard/admin/reports"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#145A3B] font-medium transition mb-2"
                    >
                        <FaArrowLeft /> Back to Reports Hub
                    </Link>
                )}
                <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-500">{description}</p>
            </div>
            {showExport && (
                <ExportButtons reportName={title} />
            )}
        </div>
    );
}

