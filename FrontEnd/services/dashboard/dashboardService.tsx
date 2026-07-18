import { getOrders } from "../orderService";
import { getProducts, Product } from "../productService";
import { getCategories } from "../categoryService";
import { getCustomers } from "../userService";
import { getTopSeller, getSellerProfiles } from "../sellerService";

export async function getDashboardStatistics() {
    const orders = await getOrders();
    const completedOrders = orders.filter(
        order => order.status === "Completed"
    );

    const revenue = completedOrders.reduce(
        (total, order) => total + order.total,
        0
    );

    const productsResp = await getProducts();
    const rawProducts = productsResp?.data?.products || productsResp?.data || [];

    return {
        totalRevenue: revenue,
        totalOrders: orders.length,
        totalProducts: rawProducts.length,
        totalCategories: getCategories().length,
        totalCustomers: getCustomers().length,
        totalSellers: getSellerProfiles().length,
    };
}

export async function getDashboardStats() {
    const stats = await getDashboardStatistics();
    return {
        totalProducts: stats.totalProducts,
        totalCategories: stats.totalCategories,
        totalOrders: stats.totalOrders,
        totalCustomers: stats.totalCustomers,
        totalSellers: stats.totalSellers,
        totalRevenue: stats.totalRevenue,
    };
}

export async function getRecentOrders(limit = 5) {
    const orders = await getOrders();
    return [...orders]
        .sort(
            (a, b) =>
                new Date(b.createdAt || (b as any).created_at).getTime() -
                new Date(a.createdAt || (a as any).created_at).getTime()
        )
        .slice(0, limit);
}

export async function getRevenue() {
    const stats = await getDashboardStatistics();
    return stats.totalRevenue;
}

export async function getLowStockProducts(limit = 5) {
    const productsResp = await getProducts();
    const rawProducts: Product[] = productsResp?.data?.products || productsResp?.data || [];
    return [...rawProducts]
        .filter(product => product.stock <= 5)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, limit);
}

export async function getTopCategories(limit = 5) {
    const productsResp = await getProducts();
    const rawProducts: Product[] = productsResp?.data?.products || productsResp?.data || [];
    const categories = getCategories();

    return categories
        .map(category => ({
            ...category,
            totalProducts: rawProducts.filter(
                product => product.categoryId === category.id
            ).length,
        }))
        .sort((a, b) => b.totalProducts - a.totalProducts)
        .slice(0, limit);
}

export async function getMonthlySales() {
    const orders = await getOrders();
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    const monthMap = new Map<string, number>();

    months.forEach(m => {
        monthMap.set(m, 0);
    });

    orders
        .filter(order => order.status === "Completed")
        .forEach(order => {
            const dateStr = order.createdAt || (order as any).created_at || order.date;
            let orderDate = new Date(dateStr);
            if (isNaN(orderDate.getTime()) && typeof dateStr === "string") {
                const parts = dateStr.split(/[\/\-]/);
                if (parts.length >= 3) {
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const year = parseInt(parts[2], 10);
                    orderDate = new Date(year, month, day);
                }
            }

            if (!isNaN(orderDate.getTime())) {
                const monthName = orderDate.toLocaleString("id-ID", { month: "short" });
                const normalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1).replace(".", "");

                let matchedMonth = months.find(m => m.toLowerCase() === normalizedMonthName.toLowerCase());
                if (!matchedMonth) {
                    const idx = orderDate.getMonth();
                    matchedMonth = months[idx];
                }

                if (matchedMonth) {
                    monthMap.set(
                        matchedMonth,
                        (monthMap.get(matchedMonth) || 0) + Number(order.total || 0)
                    );
                }
            }
        });

    return Array.from(
        monthMap,
        ([month, revenue]) => ({
            month,
            revenue,
        })
    );
}

export async function getOrderStatus() {
    const orders = await getOrders();
    const statusCounts: { [key: string]: number } = {
        Pending: 0,
        "Seller Confirmed": 0,
        Packing: 0,
        "Ready to Pickup": 0,
        Completed: 0,
        Cancelled: 0,
    };

    orders.forEach((order) => {
        const matchedKey = Object.keys(statusCounts).find(
            key => key.toLowerCase() === order.status?.toLowerCase()
        );
        if (matchedKey) {
            statusCounts[matchedKey]++;
        } else {
            const statusStr = order.status || "Pending";
            statusCounts[statusStr] = (statusCounts[statusStr] || 0) + 1;
        }
    });

    return Object.keys(statusCounts).map((status) => ({
        status,
        count: statusCounts[status],
    }));
}

export async function getTopProducts(limit = 5) {
    const productsResp = await getProducts();
    const rawProducts: Product[] = productsResp?.data?.products || productsResp?.data || [];
    return [...rawProducts]
        .sort((a, b) => (b.sold || 0) - (a.sold || 0))
        .slice(0, limit);
}

export async function getCustomerGrowth() {
    const customers = getCustomers();
    const customersCount = customers.length;

    return [
        { month: "Jan", customers: Math.max(1, Math.floor(customersCount * 0.3)) },
        { month: "Feb", customers: Math.max(2, Math.floor(customersCount * 0.6)) },
        { month: "Mar", customers: customersCount }
    ];
}

export async function getOrderStatusChart() {
    const orders = await getOrders();
    const statusMap = new Map<string, number>();

    orders.forEach((order) => {
        const status = order.status || "Pending";
        statusMap.set(
            status,
            (statusMap.get(status) || 0) + 1
        );
    });

    return Array.from(
        statusMap,
        ([name, value]) => ({
            name,
            value,
        })
    );
}

export {
    getTopSeller,
};