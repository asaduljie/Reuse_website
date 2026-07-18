"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../utils/roleGuard";
import { getSellerDashboardData, SellerDashboardData } from "../../../services/dashboardService";
import SellerDashboardHeader from "../../../components/dashboard/seller/SellerDashboardHeader";
import SellerStatistics from "../../../components/dashboard/seller/SellerStatistics";
import SellerRevenueChart from "../../../components/dashboard/seller/SellerRevenueChart";
import SellerRecentOrders from "../../../components/dashboard/seller/SellerRecentOrders";
import SellerTopProducts from "../../../components/dashboard/seller/SellerTopProducts";
import SellerLowStock from "../../../components/dashboard/seller/SellerLowStock";
import SellerQuickAction from "../../../components/dashboard/seller/SellerQuickAction";

export default function SellerDashboardPage() {
  const [data, setData] = useState<SellerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const user = getCurrentUser();
      const sellerId = user?.id ?? 3;
      try {
        const result = await getSellerDashboardData(sellerId);
        setData(result);
      } catch (err) {
        console.warn("Seller dashboard load failed, using empty defaults:", err);
        // Provide empty dashboard data so the page still renders
        setData({
          storeName: `Toko ${user?.name || "Seller"}`,
          verified: false,
          rating: 0,
          followers: 0,
          totalRevenue: 0,
          totalOrders: 0,
          totalProducts: 0,
          pendingOrders: 0,
          monthlyData: [],
          recentOrders: [],
          topProducts: [],
          lowStockProducts: [],
          analytics: { revenue: 0, orders: 0, conversion: 0, averageRating: 0, topCategory: "-" },
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading || !data) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 bg-gray-100 rounded-3xl" />
        <div className="grid grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-28 bg-gray-100 rounded-3xl" />)}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-72 bg-gray-100 rounded-3xl" />
          <div className="h-72 bg-gray-100 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SellerDashboardHeader
        storeName={data.storeName}
        verified={data.verified}
        rating={data.rating}
        followers={data.followers}
      />

      <SellerStatistics
        totalRevenue={data.totalRevenue}
        totalOrders={data.totalOrders}
        totalProducts={data.totalProducts}
        rating={data.rating}
        followers={data.followers}
        pendingOrders={data.pendingOrders}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SellerRevenueChart monthlyData={data.monthlyData} />
        </div>
        <SellerQuickAction />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SellerRecentOrders orders={data.recentOrders} />
        </div>
        <SellerLowStock products={data.lowStockProducts} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SellerTopProducts products={data.topProducts} />
      </div>
    </div>
  );
}
