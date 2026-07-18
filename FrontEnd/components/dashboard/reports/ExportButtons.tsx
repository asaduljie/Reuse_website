"use client";

import { FaFileCsv, FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";

interface ExportButtonsProps {
  reportName?: string;
}

export default function ExportButtons({ reportName = "Laporan" }: ExportButtonsProps) {
  const toast = (type: string) => {
    alert(`Export ${type} untuk "${reportName}" akan tersedia setelah backend siap.`);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-gray-400 font-semibold mr-1">Export:</span>
      <button
        onClick={() => toast("CSV")}
        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
      >
        <FaFileCsv className="text-emerald-500" /> CSV
      </button>
      <button
        onClick={() => toast("Excel")}
        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
      >
        <FaFileExcel className="text-emerald-600" /> Excel
      </button>
      <button
        onClick={() => toast("PDF")}
        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
      >
        <FaFilePdf className="text-red-500" /> PDF
      </button>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
      >
        <FaPrint className="text-blue-500" /> Print
      </button>
    </div>
  );
}
