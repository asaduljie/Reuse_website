"use client";

import { FaHistory, FaDownload, FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";

interface ActivityHeaderProps {
  total: number;
}

export default function ActivityHeader({ total }: ActivityHeaderProps) {
  const handleExport = (type: string) => {
    alert(`Export ${type} — Fitur ini akan tersedia setelah backend siap.`);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Monitoring</p>
        <h1 className="text-4xl font-black text-gray-900 mt-1.5 flex items-center gap-3">
          <FaHistory className="text-[#145A3B]" /> Activity Log
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-semibold">
          {total} aktivitas tercatat dalam sistem
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleExport("CSV")}
          className="inline-flex items-center gap-2 bg-white border border-gray-100 hover:border-emerald-200 text-gray-700 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition"
        >
          <FaFileCsv className="text-emerald-600" /> CSV
        </button>
        <button
          onClick={() => handleExport("Excel")}
          className="inline-flex items-center gap-2 bg-white border border-gray-100 hover:border-emerald-200 text-gray-700 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition"
        >
          <FaFileExcel className="text-emerald-600" /> Excel
        </button>
        <button
          onClick={() => handleExport("PDF")}
          className="inline-flex items-center gap-2 bg-white border border-gray-100 hover:border-red-200 text-gray-700 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition"
        >
          <FaFilePdf className="text-red-500" /> PDF
        </button>
      </div>
    </div>
  );
}
