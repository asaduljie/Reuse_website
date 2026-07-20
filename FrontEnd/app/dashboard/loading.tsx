"use client";

import ChibiFarmerLoader from "../../components/dashboard/notifications/ChibiFarmerLoader";

export default function DashboardLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-md transition-all duration-300">
      <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-gray-100/50 shadow-2xl">
        <ChibiFarmerLoader />
      </div>
    </div>
  );
}
