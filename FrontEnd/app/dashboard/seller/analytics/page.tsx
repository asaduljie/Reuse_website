"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../../utils/roleGuard";
import { getSellerDashboardData, MonthlyData } from "../../../../services/dashboardService";
import SellerRevenueChart from "../../../../components/dashboard/seller/SellerRevenueChart";
import Link from "next/link";
import { FaArrowLeft, FaDollarSign, FaBox, FaChartBar, FaBullseye, FaChartLine } from "react-icons/fa";

export default function SellerAnalyticsPage() {
  const [monthly, setMonthly] = useState<MonthlyData[]>([]);
  const [stats, setStats] = useState({ revenue: 0, orders: 0, avgOrder: 0, conversion: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const user = getCurrentUser();
      const id = user?.id ?? 3;
      try {
        const data = await getSellerDashboardData(id);
        setMonthly(data.monthlyData);
        const totalRev = data.monthlyData.reduce((s, d) => s + d.revenue, 0);
        const totalOrd = data.monthlyData.reduce((s, d) => s + d.orders, 0);
        setStats({
          revenue: totalRev,
          orders: totalOrd,
          avgOrder: totalOrd > 0 ? Math.round(totalRev / totalOrd) : 0,
          conversion: totalOrd > 0 ? Math.round((totalOrd / (totalOrd * 3)) * 100) : 0,
        });
      } catch (err) {
        console.warn("Failed to load seller analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    { label: "Total Revenue", value: `Rp ${stats.revenue.toLocaleString("id-ID")}`, icon: FaDollarSign, color: "bg-emerald-50 text-emerald-600" },
    { label: "Total Orders", value: stats.orders, icon: FaBox, color: "bg-blue-50 text-blue-600" },
    { label: "Avg Order Value", value: `Rp ${stats.avgOrder.toLocaleString("id-ID")}`, icon: FaChartBar, color: "bg-violet-50 text-violet-600" },
    { label: "Conversion Rate", value: `${stats.conversion}%`, icon: FaBullseye, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/seller" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#145A3B] font-semibold mb-3 transition">
          <FaArrowLeft /> Kembali ke Dashboard
        </Link>
        <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3">
          <FaChartLine className="text-[#145A3B]" /> Analytics Toko
        </h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">Performa penjualan toko Anda dalam 6 bulan terakhir.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.color} mb-3 text-lg`}>
                <Icon />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800 leading-none">{k.value}</p>
                <p className="text-xs font-bold text-gray-500 mt-2">{k.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && monthly.length > 0 && (
        <SellerRevenueChart monthlyData={monthly} />
      )}
    </div>
  );
}
