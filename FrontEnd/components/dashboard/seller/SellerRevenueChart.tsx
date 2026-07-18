"use client";

import { MonthlyData } from "../../../services/dashboardService";

interface Props {
  monthlyData: MonthlyData[];
}

export default function SellerRevenueChart({ monthlyData }: Props) {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue), 1);
  const maxOrders = Math.max(...monthlyData.map((d) => d.orders), 1);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-extrabold text-gray-800">Revenue & Orders</h3>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">6 bulan terakhir</p>
        </div>
        <div className="flex gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#145A3B]" /> Revenue</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-400" /> Orders</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end gap-3 h-48">
        {monthlyData.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            {/* Revenue bar */}
            <div className="w-full flex items-end gap-1 justify-center" style={{ height: "160px" }}>
              <div
                className="flex-1 bg-gradient-to-t from-[#145A3B] to-emerald-400 rounded-t-xl transition-all duration-700 relative group"
                style={{ height: `${Math.max((d.revenue / maxRevenue) * 160, 4)}px` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  Rp {(d.revenue / 1000).toFixed(0)}k
                </div>
              </div>
              <div
                className="w-2.5 bg-blue-400 rounded-t-lg transition-all duration-700"
                style={{ height: `${Math.max((d.orders / maxOrders) * 140, 4)}px` }}
              />
            </div>
            <span className="text-[10px] font-bold text-gray-500">{d.month}</span>
          </div>
        ))}
      </div>

      {/* Summary row */}
      <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-400 font-semibold">Total Revenue</p>
          <p className="text-sm font-black text-gray-800">Rp {monthlyData.reduce((s, d) => s + d.revenue, 0).toLocaleString("id-ID")}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 font-semibold">Total Orders</p>
          <p className="text-sm font-black text-gray-800">{monthlyData.reduce((s, d) => s + d.orders, 0)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 font-semibold">Avg Revenue/Bulan</p>
          <p className="text-sm font-black text-gray-800">Rp {Math.round(monthlyData.reduce((s, d) => s + d.revenue, 0) / 6).toLocaleString("id-ID")}</p>
        </div>
      </div>
    </div>
  );
}
