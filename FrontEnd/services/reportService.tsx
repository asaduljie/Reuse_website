import { getOrders, Order } from "./orderService";
import { getProducts, Product } from "./productService";
import { getSellerProfiles, getSellerStatistics, SellerProfile } from "./sellerService";
import { getCustomers, getUser, User } from "./userService";
import { getCategories } from "./categoryService";

export interface SalesReportEntry {
    date: string;
    totalOrders: number;
    revenue: number;
    completedCount: number;
    cancelledCount: number;
    avgOrderValue: number;
}

export interface ExportHistoryEntry {
    id: number;
    reportType: string;
    format: "Excel" | "PDF" | "CSV";
    status: "Completed" | "Pending" | "Failed";
    date: string;
    size: string;
}

const mockExports: ExportHistoryEntry[] = [
    { id: 1, reportType: "Sales Report", format: "Excel", status: "Completed", date: "2026-07-08T15:30:00Z", size: "48 KB" },
    { id: 2, reportType: "Order Report", format: "PDF", status: "Completed", date: "2026-07-07T10:15:00Z", size: "184 KB" },
    { id: 3, reportType: "Product Inventory Report", format: "Excel", status: "Completed", date: "2026-07-05T09:00:00Z", size: "32 KB" },
    { id: 4, reportType: "Seller Activity Report", format: "PDF", status: "Completed", date: "2026-07-01T14:20:00Z", size: "210 KB" },
];

// Helper to filter items by Date Range
function filterByDate(dateStr: string, range: string, startDate?: string, endDate?: string): boolean {
    const date = new Date(dateStr);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (range) {
        case "today":
            return date >= todayStart;
        case "7days": {
            const sevenDaysAgo = new Date(todayStart);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return date >= sevenDaysAgo;
        }
        case "30days": {
            const thirtyDaysAgo = new Date(todayStart);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return date >= thirtyDaysAgo;
        }
        case "thismonth":
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        case "thisyear":
            return date.getFullYear() === now.getFullYear();
        case "custom":
            if (startDate && endDate) {
                return date >= new Date(startDate) && date <= new Date(endDate);
            }
            return true;
        default:
            return true;
    }
}

export async function getSummary() {
    const orders = await getOrders();
    const productsResp = await getProducts();
    const rawProducts = productsResp?.data?.products || productsResp?.data || [];
    const customers = getCustomers();

    const completedOrders = orders.filter(o => o.status === "Completed");
    const revenue = completedOrders.reduce((sum, o) => sum + o.total, 0);

    return {
        totalRevenue: revenue,
        totalOrders: orders.length,
        totalProducts: rawProducts.length,
        totalCustomers: customers.length,
    };
}

export async function getRevenue() {
    const stats = await getSummary();
    return stats.totalRevenue;
}

export function getExportHistory(): ExportHistoryEntry[] {
    return mockExports;
}

export async function getSalesReport(
    dateRange: string,
    sellerId: number,
    startDate?: string,
    endDate?: string
): Promise<SalesReportEntry[]> {
    const orders = await getOrders();

    // Filter by seller and date
    let filteredOrders = orders.filter((o) => {
        if (sellerId !== 0 && o.sellerId !== sellerId) return false;
        return filterByDate(o.createdAt, dateRange, startDate, endDate);
    });

    // Group orders by date (YYYY-MM-DD)
    const salesMap = new Map<string, Order[]>();
    filteredOrders.forEach((o) => {
        const dateKey = new Date(o.createdAt).toISOString().split("T")[0];
        const existing = salesMap.get(dateKey) || [];
        salesMap.set(dateKey, [...existing, o]);
    });

    const entries: SalesReportEntry[] = [];
    salesMap.forEach((dateOrders, dateStr) => {
        const completed = dateOrders.filter((o) => o.status === "Completed");
        const cancelled = dateOrders.filter((o) => o.status === "Cancelled");
        const revenue = completed.reduce((sum, o) => sum + o.total, 0);
        const totalOrders = dateOrders.length;
        const avgOrderValue = completed.length > 0 ? revenue / completed.length : 0;

        entries.push({
            date: dateStr,
            totalOrders,
            revenue,
            completedCount: completed.length,
            cancelledCount: cancelled.length,
            avgOrderValue,
        });
    });

    // Sort entries by date newest to oldest
    return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getOrderReport(
    dateRange: string,
    sellerId: number,
    status: string,
    startDate?: string,
    endDate?: string
): Promise<Order[]> {
    const orders = await getOrders();

    return orders.filter((o) => {
        if (sellerId !== 0 && o.sellerId !== sellerId) return false;
        if (status !== "all" && o.status.toLowerCase() !== status.toLowerCase()) return false;
        return filterByDate(o.createdAt, dateRange, startDate, endDate);
    });
}

export async function getProductReport(
    dateRange: string,
    sellerId: number,
    status: string,
    startDate?: string,
    endDate?: string
): Promise<(Product & { categoryName: string; sellerName: string; revenue: number })[]> {
    const productsResp = await getProducts();
    const rawProducts: Product[] = productsResp?.data?.products || productsResp?.data || [];
    const categories = getCategories();
    const sellers = getSellerProfiles();

    let filteredProducts = rawProducts.filter((p) => {
        if (sellerId !== 0 && p.sellerId !== sellerId) return false;
        if (status !== "all" && p.status !== status) return false;
        if (p.createdAt && !filterByDate(p.createdAt, dateRange, startDate, endDate)) return false;
        return true;
    });

    return filteredProducts.map((p) => {
        const cat = categories.find((c) => c.id === p.categoryId);
        const sell = sellers.find((s) => s.id === p.sellerId);
        const sold = p.sold || 0;
        const revenue = sold * p.price;

        return {
            ...p,
            categoryName: cat?.name || "Uncategorized",
            sellerName: sell?.storeName || "Unknown Seller",
            revenue,
        };
    });
}

export async function getSellerReport(
    dateRange: string,
    status: string,
    startDate?: string,
    endDate?: string
): Promise<(SellerProfile & { productsCount: number; ordersCount: number; revenue: number; ownerName: string })[]> {
    const sellers = getSellerProfiles();

    let filteredSellers = sellers.filter((s) => {
        if (status !== "all" && s.status !== status) return false;
        if (s.createdAt && !filterByDate(s.createdAt, dateRange, startDate, endDate)) return false;
        return true;
    });

    return await Promise.all(
        filteredSellers.map(async (s) => {
            const stats = await getSellerStatistics(s.id);
            const user = getUser(s.userId);

            return {
                ...s,
                productsCount: stats.totalProducts,
                ordersCount: stats.totalOrders,
                revenue: stats.revenue,
                ownerName: user?.name || "Unknown",
            };
        })
    );
}

export async function getCustomerReport(
    dateRange: string,
    status: string,
    startDate?: string,
    endDate?: string
): Promise<(User & { ordersCount: number; totalSpent: number; lastOrderDate: string })[]> {
    const customers = getCustomers();
    const orders = await getOrders();

    let filteredCustomers = customers.filter((c) => {
        if (status !== "all" && c.status !== status) return false;
        if (c.createdAt && !filterByDate(c.createdAt, dateRange, startDate, endDate)) return false;
        return true;
    });

    return filteredCustomers.map((c) => {
        const customerOrders = orders.filter((o) => o.customerId === c.id);
        const completed = customerOrders.filter((o) => o.status === "Completed");
        const totalSpent = completed.reduce((sum, o) => sum + o.total, 0);

        let lastOrderDate = "-";
        if (customerOrders.length > 0) {
            const sorted = [...customerOrders].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            lastOrderDate = sorted[0].createdAt;
        }

        return {
            ...c,
            ordersCount: customerOrders.length,
            totalSpent,
            lastOrderDate,
        };
    });
}
