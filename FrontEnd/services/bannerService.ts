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
        title: "Curated Preloved & Sustainable Luxury",
        subtitle: "Platform jual beli barang preloved berkualitas tinggi & terverifikasi di Indonesia.",
        description: "Temukan fashion branded vintage, barang koleksi unik, dan peralatan gaya hidup ramah lingkungan dengan garansi keaslian seller.",
        image: "/images/hero1.jpg",
        buttonText: "Jelajahi Koleksi",
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
        title: "Exquisite Thrift & Vintage Collectibles",
        subtitle: "Koleksi preloved eksklusif yang baru saja ditambahkan oleh verified seller.",
        description: "Produk-produk kurasi pilihan terupdate yang melewati pemeriksaan kondisi ketat demi kenyamanan transaksi Anda.",
        image: "/images/hero2.jpg",
        buttonText: "Lihat Produk Terbaru",
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
        title: "Zero Waste & Circular Economy Movement",
        subtitle: "Dukung gaya hidup hemat & kurangi jejak karbon bersama ReUse.",
        description: "Setiap barang preloved yang Anda beli atau titip jual membantu mengurangi limbah tekstil dan menjaga kelestarian lingkungan.",
        image: "/images/hero3.jpg",
        buttonText: "Pelajari Visi Kami",
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
