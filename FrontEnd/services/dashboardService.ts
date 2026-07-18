import { getOrdersBySeller, Order } from "./orderService";
import { getProductsBySeller, Product } from "./productService";
import { getSellerByUserId } from "./sellerService";

export interface MonthlyData { month: string; revenue: number; orders: number; }
export interface SellerAnalytics { revenue: number; orders: number; conversion: number; averageRating: number; topCategory: string; }
export interface SellerDashboardData {
  storeName: string; verified: boolean; rating: number; followers: number;
  totalRevenue: number; totalOrders: number; totalProducts: number; pendingOrders: number;
  monthlyData: MonthlyData[]; recentOrders: Order[];
  topProducts: Array<{ id: number; name: string; image: string; price: number; sold: number }>;
  lowStockProducts: Product[]; analytics: SellerAnalytics;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export async function getSellerDashboardData(userId: number): Promise<SellerDashboardData> {
  const seller = getSellerByUserId(userId);
  if (!seller) throw new Error("Profil seller untuk akun ini tidak ditemukan.");
  const [orders, products] = await Promise.all([getOrdersBySeller(seller.id), getProductsBySeller(seller.id)]);
  const completed = orders.filter((order) => order.status === "Completed");
  const totalRevenue = completed.reduce((sum, order) => sum + order.total, 0);
  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index), 1);
    const selected = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear();
    });
    return {
      month: MONTHS[date.getMonth()], orders: selected.length,
      revenue: selected.filter((order) => order.status === "Completed").reduce((sum, order) => sum + order.total, 0),
    };
  });
  const sales = new Map<number, { id: number; name: string; image: string; price: number; sold: number }>();
  orders.forEach((order) => order.items.forEach((item) => {
    const current = sales.get(item.productId);
    sales.set(item.productId, { id: item.productId, name: item.name, image: item.image, price: item.price, sold: (current?.sold || 0) + item.quantity });
  }));
  const categorySales = new Map<string, number>();
  products.forEach((product) => categorySales.set(product.category, (categorySales.get(product.category) || 0) + (product.sold || 0)));
  const topCategory = [...categorySales.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  return {
    storeName: seller.storeName, verified: seller.verified, rating: seller.rating, followers: 0,
    totalRevenue, totalOrders: orders.length, totalProducts: products.length,
    pendingOrders: orders.filter((order) => ["Pending", "Seller Confirmed"].includes(order.status)).length,
    monthlyData, recentOrders: [...orders].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 5),
    topProducts: [...sales.values()].sort((a, b) => b.sold - a.sold).slice(0, 5),
    lowStockProducts: products.filter((product) => product.stock <= 5).sort((a, b) => a.stock - b.stock),
    analytics: { revenue: totalRevenue, orders: orders.length, conversion: 0, averageRating: seller.rating, topCategory },
  };
}
