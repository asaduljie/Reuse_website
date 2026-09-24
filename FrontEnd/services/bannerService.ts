export interface Banner {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    position: "Hero" | "Homepage Promo" | "Flash Sale" | "Category Banner" | "Footer Banner";
    priority: number;
    status: "Draft" | "Published" | "Expired" | "Hidden";
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

const DEFAULT_BANNERS: Banner[] = [
    {
        id: 1,
        title: "Marketplace Jual Beli Barang Preloved",
        subtitle: "Temukan pakaian, elektronik, dan aksesoris preloved berkualitas dengan harga terjangkau.",
        description: "Platform terpercaya untuk beli dan titip jual barang bekas layak pakai dari berbagai penjual di seluruh Indonesia.",
        image: "/images/hero1.jpg",
        buttonText: "Lihat Produk",
        buttonLink: "/products",
        position: "Hero",
        priority: 1,
        status: "Published",
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },
    {
        id: 2,
        title: "Koleksi Preloved Terbaru",
        subtitle: "Jelajahi produk barang bekas pilihan yang baru saja diunggah oleh penjual.",
        description: "Pilihan fashion thrift, sepatu, dan perlengkapan rumah tangga dengan informasi kondisi barang yang transparan.",
        image: "/images/hero2.jpg",
        buttonText: "Jelajahi Sekarang",
        buttonLink: "/products",
        position: "Hero",
        priority: 2,
        status: "Published",
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },
    {
        id: 3,
        title: "Gaya Hidup Ramah Lingkungan",
        subtitle: "Belanja lebih hemat sambil mengurangi limbah dengan mengutarakan barang bekas layak pakai.",
        description: "Gunakan kembali barang preloved berkualitas untuk mendukung lingkungan yang lebih bersih.",
        image: "/images/hero3.jpg",
        buttonText: "Tentang ReUse",
        buttonLink: "/about",
        position: "Hero",
        priority: 3,
        status: "Published",
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    }
];

let cachedBanners: Banner[] | null = null;

export function getBanners(): Banner[] {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("reuse_banners");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                // fallback to default
            }
        }
    }
    if (!cachedBanners) {
        cachedBanners = [...DEFAULT_BANNERS];
    }
    return cachedBanners;
}

export function getBanner(id: number): Banner | undefined {
    return getBanners().find((b) => b.id === id);
}

export function saveBanners(banners: Banner[]): void {
    cachedBanners = banners;
    if (typeof window !== "undefined") {
        localStorage.setItem("reuse_banners", JSON.stringify(banners));
    }
}

export function addBanner(banner: Banner): void {
    const list = getBanners();
    list.push(banner);
    saveBanners(list);
}

export function updateBanner(id: number, updated: Partial<Banner>): void {
    const list = getBanners().map((b) =>
        b.id === id ? { ...b, ...updated, updatedAt: new Date().toISOString() } : b
    );
    saveBanners(list);
}

export function deleteBanner(id: number): void {
    const list = getBanners().filter((b) => b.id !== id);
    saveBanners(list);
}
