import DashboardHeader from "./dashboardHeader";
import SalesChart from "./analytics/SalesChart";
import OrderStatusChart from "./analytics/OrderStatusChart";
import TopProducts from "./analytics/TopProducts";
import LowStockProducts from "./analytics/LowStockProducts";
import TopCategories from "./analytics/TopCategories";
import DashboardCards from "./analytics/DashboardCards";
import RecentOrders from "./recentOrders";
import TopSellers from "./analytics/TopSellers";

import {
  getDashboardStats,
  getMonthlySales,
  getOrderStatusChart,
  getTopProducts,
  getTopCategories,
  getLowStockProducts,
  getTopSeller,
} from "../../services/dashboard/dashboardService";

export default async function DashboardOverview() {
  const dashboardStats = await getDashboardStats();
  const salesChart = await getMonthlySales();
  const orderStatusChart = await getOrderStatusChart();
  const topProducts = await getTopProducts(5);
  const topCategories = await getTopCategories(5);
  const lowStockProducts = await getLowStockProducts(5);
  const topSellers = await getTopSeller(5);

  return (
    <>
      <DashboardHeader
        title="Dashboard Overview"
        description="Selamat datang di Dashboard ReUse Marketplace."
      />

      {/* Row 1: Statistics Cards */}
      <div className="mt-8">
        <DashboardCards statistics={dashboardStats} />
      </div>

      {/* Row 2: Sales Chart and Order Status (Donut Chart) */}
      <div className="grid xl:grid-cols-3 gap-8 mt-8">
        <div className="xl:col-span-2">
          <SalesChart data={salesChart} />
        </div>
        <div>
          <OrderStatusChart data={orderStatusChart} />
        </div>
      </div>

      {/* Row 3: Top Products and Top Categories */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <TopProducts products={topProducts} />
        <TopCategories categories={topCategories} />
      </div>

      {/* Row 4: Recent Orders, Top Sellers, and Low Stock */}
      <div className="grid xl:grid-cols-3 gap-8 mt-8">
        <RecentOrders />
        <TopSellers sellers={topSellers} />
        <LowStockProducts products={lowStockProducts} />
      </div>
    </>
  );
}