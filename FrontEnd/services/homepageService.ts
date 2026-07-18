export interface Testimonial {
    id: number;
    name: string;
    role: string;
    text: string;
    avatar: string;
}

export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export interface HomepageConfig {
    heroEnabled: boolean;
    featuredCategoriesEnabled: boolean;
    popularProductsEnabled: boolean;
    latestProductsEnabled: boolean;
    promoBannerEnabled: boolean;
    testimonialsEnabled: boolean;
    faqEnabled: boolean;
    testimonials: Testimonial[];
    faq: FAQItem[];
    footerAbout: string;
    footerPhone: string;
    footerEmail: string;
    footerAddress: string;
}

const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
    heroEnabled: true,
    featuredCategoriesEnabled: true,
    popularProductsEnabled: true,
    latestProductsEnabled: true,
    promoBannerEnabled: true,
    testimonialsEnabled: true,
    faqEnabled: true,
    testimonials: [
        { id: 1, name: "Budi Santoso", role: "Seller Mitra", text: "Menjual barang preloved di ReUse sangat mudah dan cepat laku. Sistem komisinya sangat fair!", avatar: "" },
        { id: 2, name: "Siti Rahma", role: "Pelanggan Setia", text: "Senang sekali bisa membeli baju berkualitas dengan harga sangat terjangkau sekaligus mengurangi limbah mode.", avatar: "" },
        { id: 3, name: "Andi Wijaya", role: "Eco Activist", text: "ReUse membantu saya merealisasikan gaya hidup zero-waste secara praktis. Sangat direkomendasikan!", avatar: "" }
    ],
    faq: [
        { id: 1, question: "Bagaimana cara mulai menjual barang bekas saya?", answer: "Anda hanya perlu mendaftar akun seller, melengkapi profil toko, lalu mengunggah detail produk bekas Anda beserta fotonya." },
        { id: 2, question: "Apakah produk yang dijual dijamin berkualitas?", answer: "Setiap seller berkewajiban mendeskripsikan kondisi barang secara jujur (kondisi fisik, lecet, dll). Penilai rating membantu Anda memilih seller terbaik." },
        { id: 3, question: "Berapa biaya pengiriman di ReUse?", answer: "Biaya pengiriman ditentukan secara default sesuai dengan tarif jarak pengantaran seller ke alamat Anda." }
    ],
    footerAbout: "ReUse Marketplace adalah platform jual beli barang bekas berkualitas demi gaya hidup berkelanjutan dan ramah lingkungan.",
    footerPhone: "081234567890",
    footerEmail: "support@reuse.com",
    footerAddress: "Jl. Hijau Lestari No. 12, Bandung, Jawa Barat"
};

let cachedConfig: HomepageConfig | null = null;

export function getHomepageConfig(): HomepageConfig {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("reuse_homepage_config");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                // fallback
            }
        }
    }
    if (!cachedConfig) {
        cachedConfig = { ...DEFAULT_HOMEPAGE_CONFIG };
    }
    return cachedConfig;
}

export function saveHomepageConfig(config: HomepageConfig): void {
    cachedConfig = config;
    if (typeof window !== "undefined") {
        localStorage.setItem("reuse_homepage_config", JSON.stringify(config));
    }
}
