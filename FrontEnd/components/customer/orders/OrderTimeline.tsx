"use client";

import { Order } from "../../../services/orderService";
import { FaCheckCircle, FaHourglassHalf, FaBoxOpen, FaStore, FaHandshake, FaTimesCircle } from "react-icons/fa";

interface OrderTimelineProps {
  status: Order["status"];
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  // Ordered stages list
  const stages: { key: Order["status"]; label: string; desc: string; icon: any }[] = [
    {
      key: "Pending",
      label: "Menunggu Konfirmasi",
      desc: "Pesanan terkirim ke WhatsApp seller",
      icon: FaHourglassHalf,
    },
    {
      key: "Seller Confirmed",
      label: "Seller Mengonfirmasi",
      desc: "Seller menyetujui transaksi",
      icon: FaHandshake,
    },
    {
      key: "Packing",
      label: "Sedang Dikemas",
      desc: "Produk sedang disiapkan seller",
      icon: FaBoxOpen,
    },
    {
      key: "Ready to Pickup",
      label: "Siap Diambil",
      desc: "Pesanan siap di lokasi seller",
      icon: FaStore,
    },
    {
      key: "Completed",
      label: "Selesai",
      desc: "Transaksi berhasil diselesaikan",
      icon: FaCheckCircle,
    },
  ];

  // Helper to determine active step index
  const getStepIndex = (currentStatus: Order["status"]) => {
    switch (currentStatus) {
      case "Pending":
        return 0;
      case "Seller Confirmed":
        return 1;
      case "Packing":
        return 2;
      case "Ready to Pickup":
        return 3;
      case "Completed":
        return 4;
      default:
        return -1;
    }
  };

  const activeIndex = getStepIndex(status);

  if (status === "Cancelled") {
    return (
      <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 flex items-start gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          <FaTimesCircle className="text-2xl animate-pulse" />
        </div>
        <div>
          <h4 className="font-extrabold text-rose-800 text-base">Pesanan Dibatalkan (Cancelled)</h4>
          <p className="text-xs text-rose-600 mt-1 font-semibold leading-relaxed">
            Pesanan ini telah dibatalkan. Anda dapat mengklik tombol "Pesan Lagi" untuk mengisi ulang keranjang belanja Anda dengan produk yang sama.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
      <h3 className="font-extrabold text-gray-800 text-lg border-b pb-3 mb-6">Status Lacak Pesanan</h3>
      
      {/* Horizontal steppermeter for desktop, vertical for mobile */}
      <div className="hidden md:flex items-center justify-between relative pt-4 pb-2">
        {stages.map((stage, idx) => {
          const StepIcon = stage.icon;
          const isCompleted = idx <= activeIndex;
          const isActive = idx === activeIndex;

          return (
            <div key={stage.key} className="flex-1 flex flex-col items-center text-center relative">
              {/* Connector line */}
              {idx < stages.length - 1 && (
                <div
                  className={`absolute top-5 left-[50%] right-[-50%] h-[3px] z-0 transition duration-300 ${
                    idx < activeIndex ? "bg-emerald-600" : "bg-gray-100"
                  }`}
                />
              )}
              
              {/* Checkpoint Circle */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center z-10 transition duration-300 shadow-sm ${
                  isActive
                    ? "bg-[#145A3B] text-white ring-4 ring-emerald-100 scale-110"
                    : isCompleted
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-50 text-gray-400 border border-gray-100"
                }`}
              >
                <StepIcon className="text-sm" />
              </div>

              {/* Checkpoint Labels */}
              <h5
                className={`text-xs font-bold mt-4 max-w-[130px] ${
                  isActive ? "text-[#145A3B]" : isCompleted ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {stage.label}
              </h5>
              <p className="text-[10px] text-gray-400 mt-1 max-w-[120px] leading-relaxed font-semibold">
                {stage.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Vertical steppermeter for mobile */}
      <div className="flex md:hidden flex-col gap-6 pl-2">
        {stages.map((stage, idx) => {
          const StepIcon = stage.icon;
          const isCompleted = idx <= activeIndex;
          const isActive = idx === activeIndex;

          return (
            <div key={stage.key} className="flex items-start gap-4 relative">
              {/* Vertical Connector line */}
              {idx < stages.length - 1 && (
                <div
                  className={`absolute left-5 top-10 bottom-[-24px] w-[3px] transition duration-300 ${
                    idx < activeIndex ? "bg-emerald-600" : "bg-gray-100"
                  }`}
                />
              )}

              {/* Checkpoint Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shrink-0 shadow-sm ${
                  isActive
                    ? "bg-[#145A3B] text-white ring-4 ring-emerald-100 scale-105"
                    : isCompleted
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-50 text-gray-400 border border-gray-100"
                }`}
              >
                <StepIcon className="text-xs" />
              </div>

              {/* Checkpoint labels */}
              <div className="pt-0.5">
                <h5
                  className={`text-sm font-bold ${
                    isActive ? "text-[#145A3B]" : isCompleted ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {stage.label}
                </h5>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed font-semibold">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
