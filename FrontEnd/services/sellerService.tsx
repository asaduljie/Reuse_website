import { getProducts } from "./productService";
import { getOrders } from "./orderService";

export interface SellerProfile {
    id: number;
    userId: number;
    storeName: string;
    description: string;
    logo: string;
    banner: string;
    phone?: string;
    address: string;
    city: string;
    province: string;
    postalCode?: string;
    verified: boolean;
    rating: number;
    totalSales: number;
    createdAt: string;
    updatedAt: string;
    // Bank Details
    bankName?: string;
    bankAccountName?: string;
    bankAccountNumber?: string;
    // Account Status
    status?: "active" | "inactive" | "blocked";
    // Verification Logs
    verifiedDate?: string;
    verifiedBy?: string;
    verificationNotes?: string;
}

const sellers: SellerProfile[] = [
  {
    id: 3, // Matches Seller One user ID 3
    userId: 3,
    storeName: "ReUse Store",
    description: "Toko resmi barang bekas berkualitas tinggi",
    logo: "/images/sellers/reuse-logo.png",
    banner: "/images/sellers/reuse-banner.jpg",
    phone: "083333333333",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    postalCode: "10110",
    verified: true,
    rating: 4.8,
    totalSales: 15,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    bankName: "Bank Central Asia (BCA)",
    bankAccountName: "Seller One",
    bankAccountNumber: "1234567890",
    status: "active",
    verifiedDate: "2026-01-01T00:00:00.000Z",
    verifiedBy: "Super Admin",
    verificationNotes: "Dokumen lengkap dan terverifikasi otomatis."
  }
];

export function getSellerProfiles() {
    return sellers;
}

export function getSellerProfile(id: number) {
    return sellers.find(seller => seller.id === id);
}

export function getSellerByUserId(userId: number): SellerProfile | undefined {
    let seller = sellers.find(s => s.userId === userId);
    if (seller) return seller;

    // Auto-create seller profile for users with seller role who don't have one yet
    if (typeof window !== "undefined") {
        try {
            const stored = localStorage.getItem("user");
            if (stored) {
                const user = JSON.parse(stored);
                if (user && (user.role === "seller") && Number(user.id) === userId) {
                    const newSeller: SellerProfile = {
                        id: userId,
                        userId: userId,
                        storeName: `Toko ${user.name || "Seller"}`,
                        description: "Selamat datang di toko kami!",
                        logo: "",
                        banner: "",
                        phone: user.phone || "",
                        address: "-",
                        city: "-",
                        province: "-",
                        postalCode: "",
                        verified: false,
                        rating: 0,
                        totalSales: 0,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        status: "active",
                    };
                    sellers.push(newSeller);
                    return newSeller;
                }
            }
        } catch {
            // ignore parse errors
        }
    }

    return undefined;
}


export function addSellerProfile(seller: SellerProfile) {
    sellers.push(seller);
}

export function updateSellerProfile(id: number, data: Partial<SellerProfile>) {
    const index = sellers.findIndex(seller => seller.id === id);
    if (index !== -1) {
        sellers[index] = {
            ...sellers[index],
            ...data,
            updatedAt: new Date().toISOString(),
        };
    }
}

export function deleteSellerProfile(id: number) {
    const index = sellers.findIndex(seller => seller.id === id);
    if (index !== -1) {
        sellers.splice(index, 1);
    }
}

export function getVerifiedSeller() {
    return sellers.filter(seller => seller.verified);
}

export async function getSellerStatistics(sellerId: number) {
    const orders = await getOrders();
    const sellerOrders = orders.filter(order => order.sellerId === sellerId);
    
    // Fetch products
    const resp = await getProducts();
    const rawProducts = resp?.data?.products || resp?.data || [];
    const sellerProducts = rawProducts.filter((p: any) => p.sellerId === sellerId);

    const revenue = sellerOrders
        .filter(order => order.status === "Completed")
        .reduce((total, order) => total + order.total, 0);

    return {
        totalProducts: sellerProducts.length,
        totalOrders: sellerOrders.length,
        revenue,
    };
}

export async function getTopSeller(limit = 5) {
    const sellersWithRevenue = await Promise.all(
        sellers.map(async (seller) => {
            const stats = await getSellerStatistics(seller.id);
            return {
                ...seller,
                revenue: stats.revenue,
            };
        })
    );

    return sellersWithRevenue
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, limit);
}
