import axios from "axios";

export interface Product {
    id: number;
    sellerId?: number;
    categoryId?: number;
    name: string;
    slug?: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    sold?: number;
    status: "active" | "inactive";
    createdAt?: string;
    updatedAt?: string;
    
    // Backwards compatibility fallbacks
    category: string;
    imageUrl: string;
    created_at?: string;
    updated_at?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, "") : "http://localhost:5000";
const API_URL = `${BASE_URL}/api/products`;

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    sellerId: 3,
    categoryId: 1,
    name: "Vintage Denim Jacket",
    description: "Jaket denim vintage klasik dengan kondisi terawat baik, tidak ada sobek atau noda.",
    image: "product1.jpg",
    imageUrl: "/images/product1.jpg",
    price: 250000,
    stock: 10,
    sold: 15,
    status: "active",
    category: "Fashion"
  },
  {
    id: 2,
    sellerId: 3,
    categoryId: 1,
    name: "Casual Cotton T-Shirt",
    description: "Kaos katun kasual adem warna putih polos. Nyaman digunakan sehari-hari.",
    image: "product2.jpg",
    imageUrl: "/images/product2.jpg",
    price: 100000,
    stock: 25,
    sold: 40,
    status: "active",
    category: "Fashion"
  },
  {
    id: 3,
    sellerId: 3,
    categoryId: 2,
    name: "Retro Sneakers Classy",
    description: "Sepatu sneakers retro kulit asli premium. Kondisi 90% mulus lengkap box asli.",
    image: "product3.jpg",
    imageUrl: "/images/product3.jpg",
    price: 450000,
    stock: 4,
    sold: 8,
    status: "active",
    category: "Shoes"
  },
  {
    id: 4,
    sellerId: 3,
    categoryId: 3,
    name: "Leather Waist Bag",
    description: "Tas pinggang kulit sintetis premium warna hitam berkapasitas sedang.",
    image: "product4.jpg",
    imageUrl: "/images/product4.jpg",
    price: 120000,
    stock: 15,
    sold: 22,
    status: "active",
    category: "Accessories"
  }
];

const products: Product[] = [...MOCK_PRODUCTS];

const resolveProductImageUrl = (apiProduct: any): string => {
  const img = apiProduct.image;
  if (img && typeof img === "string" && (img.startsWith("data:") || img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/"))) {
    return img;
  }
  if (apiProduct.imageUrl && typeof apiProduct.imageUrl === "string" && !apiProduct.imageUrl.includes("undefined") && !apiProduct.imageUrl.includes("/uploads/data:")) {
    return apiProduct.imageUrl;
  }
  if (img) {
    return `${BASE_URL}/uploads/${img}`;
  }
  return "/images/product1.jpg";
};

// Helper to map backend data to modern Product structure
export const mapApiProductToProduct = (apiProduct: any): Product => {
  return {
    id: apiProduct.id,
    sellerId: apiProduct.seller_id ?? apiProduct.sellerId ?? 0,
    categoryId: apiProduct.category_id || 1,
    name: apiProduct.name || "",
    slug: apiProduct.slug || apiProduct.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "",
    description: apiProduct.description || "",
    image: apiProduct.image || "",
    price: Number(apiProduct.price || 0),
    stock: Number(apiProduct.stock || 0),
    sold: Number(apiProduct.sold || 0),
    status: apiProduct.status || "active",
    createdAt: apiProduct.created_at || apiProduct.createdAt || new Date().toISOString(),
    updatedAt: apiProduct.updated_at || apiProduct.updatedAt || new Date().toISOString(),
    
    // Legacy support fields:
    category: apiProduct.category || "Fashion",
    imageUrl: resolveProductImageUrl(apiProduct)
  };
};

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    const rawData = response?.data;
    const data = Array.isArray(rawData)
      ? rawData
      : (rawData && Array.isArray(rawData.products))
        ? rawData.products
        : [];

    const mapped = data.map(mapApiProductToProduct);
    if (mapped.length > 0) {
      products.splice(0, products.length, ...mapped);
    }
    return response;
  } catch (err) {
    console.warn("REST API getProducts failed, falling back to local preseed mock:", err);
    return { data: { success: true, products: MOCK_PRODUCTS } } as any;
  }
};

export const getProduct = (id: any): Product | undefined => {
  return products.find((product) => Number(product.id) === Number(id));
};

export const getProductById = async (id: any) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    if (response.data && response.data.product) {
      response.data.product = mapApiProductToProduct(response.data.product);
    }
    return response;
  } catch (err) {
    console.warn(`REST API getProductById(${id}) failed, falling back to local:`, err);
    const prod = products.find(p => Number(p.id) === Number(id)) || MOCK_PRODUCTS[0];
    return { data: { success: true, product: mapApiProductToProduct(prod) } } as any;
  }
};

export const getLatestProducts = async () => {
  try {
    return await axios.get(`${API_URL}/latest`);
  } catch (err) {
    console.warn("REST API getLatestProducts failed, falling back to local:", err);
    return { data: { success: true, products: MOCK_PRODUCTS.slice(0, 4) } } as any;
  }
};

export const getFeaturedProducts = async () => {
  try {
    return await axios.get(`${API_URL}/featured`);
  } catch (err) {
    console.warn("REST API getFeaturedProducts failed, falling back to local:", err);
    return { data: { success: true, products: MOCK_PRODUCTS.slice(0, 4) } } as any;
  }
};

export const createProduct = async (data: any) => {
  return await axios.post(API_URL, data);
};

export const updateProduct = async (id: any, data: any) => {
  const index = products.findIndex((product) => Number(product.id) === Number(id));

  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...data,
    };
  }

  return await axios.put(`${API_URL}/${id}`, data);
};

export const deleteProduct = async (id: any) => {
  const index = products.findIndex((product) => Number(product.id) === Number(id));

  if (index !== -1) {
    products.splice(index, 1);
  }

  return await axios.delete(`${API_URL}/${id}`);
};

// Refactoring helpers
export function increaseProductSold(
    productId: number,
    quantity: number
) {
    const product = products.find(
        item =>
            item.id === productId
    );
    if (!product) {
        return;
    }
    if (product.sold === undefined) {
        product.sold = 0;
    }
    product.sold += quantity;
    product.stock -= quantity;
}

export function getLowStockProducts(
    limit = 5
) {
    return [...products]
        .filter(
            product =>
                product.stock <= 5
        )
        .sort(
            (a, b) =>
                a.stock - b.stock
        )
        .slice(0, limit);
}

export function getTopProducts(
    limit = 5
) {
    return [...products]
        .sort(
            (a, b) =>
                (b.sold || 0) - (a.sold || 0)
        )
        .slice(0, limit);
}

export async function getProductsBySeller(sellerId: number): Promise<Product[]> {
  try { await getProducts(); } catch { /* offline state remains available */ }
  return products.filter((product) => Number(product.sellerId) === Number(sellerId));
}
