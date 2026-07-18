import axios from "axios";
import { CartItem } from "./cartService";

export interface OrderItem extends Partial<CartItem> {
    id: number;
    productId: number;
    sellerId: number;
    categoryId: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    subtotal: number;
    qty?: number; // legacy compatibility alias
}

export interface ShippingAddress {
    recipient: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface Order {
    id: number;
    invoice: string;
    customerId: number;
    customerName: string;
    sellerId: number;
    items: OrderItem[];
    shipping: ShippingAddress;
    totalItem: number;
    subtotal: number;
    shippingCost: number;
    total: number;
    paymentMethod: string;
    paymentStatus: "Pending" | "Paid";
    status:
        | "Pending"
        | "Seller Confirmed"
        | "Packing"
        | "Ready to Pickup"
        | "Completed"
        | "Cancelled";
    createdAt: string;
    updatedAt: string;

    // Legacy fallback fields to prevent UI breakage
    phone: string;
    address: string;
    date: string;
    note?: string;
}

const API_URL = "http://localhost:5000/api/orders";
const ORDERS_KEY = "reuse_orders";

// Predefined mock orders to seed localStorage for customer ID 4 (Amanda)
const DEFAULT_MOCK_ORDERS: Order[] = [
  {
    id: 1720000001,
    invoice: "INV-1720000001",
    customerId: 4,
    customerName: "Amanda",
    sellerId: 3,
    phone: "084444444444",
    address: "Kebayoran Baru, Jakarta Selatan",
    date: "2026-07-01",
    note: "Tolong packing kayu jika memungkinkan.",
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-01T10:30:00.000Z",
    paymentMethod: "Transfer Bank",
    paymentStatus: "Paid",
    status: "Completed",
    totalItem: 2,
    subtotal: 350000,
    shippingCost: 0,
    total: 350000,
    shipping: {
      recipient: "Amanda",
      phone: "084444444444",
      address: "Kebayoran Baru, Jakarta Selatan",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12110"
    },
    items: [
      {
        id: 1,
        productId: 1,
        sellerId: 3,
        categoryId: 1,
        name: "Vintage Denim Jacket",
        image: "/images/product1.jpg",
        price: 250000,
        quantity: 1,
        qty: 1,
        subtotal: 250000
      },
      {
        id: 2,
        productId: 2,
        sellerId: 3,
        categoryId: 1,
        name: "Casual Cotton T-Shirt",
        image: "/images/product2.jpg",
        price: 100000,
        quantity: 1,
        qty: 1,
        subtotal: 100000
      }
    ]
  },
  {
    id: 1720000002,
    invoice: "INV-1720000002",
    customerId: 4,
    customerName: "Amanda",
    sellerId: 3,
    phone: "084444444444",
    address: "Kebayoran Baru, Jakarta Selatan",
    date: "2026-07-05",
    note: "Kirim sebelum jam 5 sore ya.",
    createdAt: "2026-07-05T14:20:00.000Z",
    updatedAt: "2026-07-05T15:00:00.000Z",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    status: "Packing",
    totalItem: 1,
    subtotal: 180000,
    shippingCost: 0,
    total: 180000,
    shipping: {
      recipient: "Amanda",
      phone: "084444444444",
      address: "Kebayoran Baru, Jakarta Selatan",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12110"
    },
    items: [
      {
        id: 1,
        productId: 3,
        sellerId: 3,
        categoryId: 1,
        name: "Retro Sneakers Classy",
        image: "/images/product3.jpg",
        price: 180000,
        quantity: 1,
        qty: 1,
        subtotal: 180000
      }
    ]
  },
  {
    id: 1720000003,
    invoice: "INV-1720000003",
    customerId: 4,
    customerName: "Amanda",
    sellerId: 3,
    phone: "084444444444",
    address: "Kebayoran Baru, Jakarta Selatan",
    date: "2026-07-07",
    note: "Batal karena salah pilih ukuran.",
    createdAt: "2026-07-07T09:00:00.000Z",
    updatedAt: "2026-07-07T09:15:00.000Z",
    paymentMethod: "Transfer Bank",
    paymentStatus: "Pending",
    status: "Cancelled",
    totalItem: 1,
    subtotal: 120000,
    shippingCost: 0,
    total: 120000,
    shipping: {
      recipient: "Amanda",
      phone: "084444444444",
      address: "Kebayoran Baru, Jakarta Selatan",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12110"
    },
    items: [
      {
        id: 1,
        productId: 4,
        sellerId: 3,
        categoryId: 1,
        name: "Leather Waist Bag",
        image: "/images/product4.jpg",
        price: 120000,
        quantity: 1,
        qty: 1,
        subtotal: 120000
      }
    ]
  }
];

// Helper to check and initialize orders in localStorage
const initializeLocalStorageOrders = (): Order[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ORDERS_KEY);
  if (!stored) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_MOCK_ORDERS));
    return DEFAULT_MOCK_ORDERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_MOCK_ORDERS));
    return DEFAULT_MOCK_ORDERS;
  }
};

let cachedOrders: Order[] = [];

// Helper to map backend data to modern Order structure
export const mapApiOrderToOrder = (apiOrder: any): Order => {
  const items: OrderItem[] = Array.isArray(apiOrder.items) ? apiOrder.items.map((item: any) => {
    const qty = Number(item.quantity || item.qty || 1);
    const price = Number(item.price || 0);
    return {
      id: item.id || 0,
      productId: item.productId || item.product_id || item.id || 0,
      sellerId: item.sellerId ?? item.seller_id ?? 0,
      categoryId: item.categoryId || item.category_id || 1,
      name: item.name || "",
      image: item.image || item.imageUrl || "/images/products/placeholder.jpg",
      price: price,
      quantity: qty,
      qty: qty, // legacy alias
      subtotal: qty * price
    };
  }) : [];

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const total = Number(apiOrder.total || subtotal);

  // Normalize status strings
  let rawStatus = apiOrder.status || "Pending";
  if (rawStatus === "Menunggu Konfirmasi") rawStatus = "Pending";
  else if (rawStatus === "Diproses") rawStatus = "Seller Confirmed";
  else if (rawStatus === "Selesai") rawStatus = "Completed";
  else if (rawStatus === "Dibatalkan") rawStatus = "Cancelled";

  return {
    id: apiOrder.id,
    invoice: apiOrder.invoice || `INV-${apiOrder.id}`,
    customerId: apiOrder.customerId ?? apiOrder.customer_id ?? 0,
    customerName: apiOrder.customerName || "",
    sellerId: apiOrder.sellerId ?? apiOrder.seller_id ?? 0,
    items,
    shipping: {
      recipient: apiOrder.customerName || "",
      phone: apiOrder.phone || "",
      address: apiOrder.address || "",
      city: apiOrder.city || "Jakarta",
      province: apiOrder.province || "DKI Jakarta",
      postalCode: apiOrder.postalCode || "10110"
    },
    totalItem: apiOrder.totalItem || items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: subtotal || total,
    shippingCost: apiOrder.shippingCost || 0,
    total: total,
    paymentMethod: apiOrder.paymentMethod || "COD",
    paymentStatus: apiOrder.paymentStatus || "Pending",
    status: rawStatus,
    createdAt: apiOrder.createdAt || apiOrder.created_at || apiOrder.date || new Date().toISOString(),
    updatedAt: apiOrder.updatedAt || apiOrder.updated_at || apiOrder.date || new Date().toISOString(),
    
    // Legacy support fields:
    phone: apiOrder.phone || "",
    address: apiOrder.address || "",
    date: apiOrder.date || (apiOrder.created_at ? new Date(apiOrder.created_at).toLocaleDateString("id-ID") : new Date().toLocaleDateString("id-ID")),
    note: apiOrder.note || ""
  };
};

export const getOrders = async (): Promise<Order[]> => {
  const localOrders = initializeLocalStorageOrders();
  try {
    const response = await axios.get(API_URL);
    const payload = response.data;
    let apiOrders: Order[] = [];
    if (payload && payload.success && Array.isArray(payload.orders)) {
      apiOrders = payload.orders.map(mapApiOrderToOrder);
    } else if (Array.isArray(payload)) {
      apiOrders = payload.map(mapApiOrderToOrder);
    }

    // Merge API and Local Orders (taking unique by ID, preferring API ones but keeping local-only ones)
    const merged = [...localOrders];
    apiOrders.forEach(apiOrd => {
      const idx = merged.findIndex(o => o.id === apiOrd.id);
      if (idx !== -1) {
        merged[idx] = apiOrd;
      } else {
        merged.push(apiOrd);
      }
    });

    cachedOrders = merged;
    if (typeof window !== "undefined") {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(merged));
    }
  } catch (err) {
    console.error("Error fetching orders from API, fallback to localStorage:", err);
    cachedOrders = localOrders;
  }
  return cachedOrders;
};

export const getOrder = async (id: number): Promise<Order | undefined> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const payload = response.data;
    if (payload && payload.success && payload.order) {
      return mapApiOrderToOrder(payload.order);
    }
  } catch (err) {
    console.error(`Error fetching order ${id} from API:`, err);
  }
  // Fallback to cache/local search
  const localOrders = initializeLocalStorageOrders();
  return localOrders.find(order => order.id === id);
};

export const getOrderById = getOrder; // compatibility alias

export const getOrdersByCustomer = async (customerId: number): Promise<Order[]> =>
  (await getOrders()).filter((order) => Number(order.customerId) === Number(customerId));

export const getOrdersBySeller = async (sellerId: number): Promise<Order[]> =>
  (await getOrders()).filter((order) => Number(order.sellerId) === Number(sellerId));

export const addOrder = async (order: any): Promise<boolean> => {
  // Pre-save to localStorage to support offline/local demo state
  const localOrders = initializeLocalStorageOrders();
  const newOrderMapped = mapApiOrderToOrder({
    ...order,
    id: order.id || Math.floor(Date.now() / 1000),
    invoice: order.invoice || `INV-${order.id || Math.floor(Date.now() / 1000)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const updated = [newOrderMapped, ...localOrders];
  if (typeof window !== "undefined") {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  }
  cachedOrders = updated;

  try {
    const response = await axios.post(API_URL, order);
    return response.data?.success || false;
  } catch (err) {
    console.error("Error creating order on API, kept in local state:", err);
    return true; // Return true because it is statefully saved in localStorage for the demo
  }
};

export const updateOrder = async (id: number, data: Partial<Order>): Promise<boolean> => {
  const localOrders = initializeLocalStorageOrders();
  const idx = localOrders.findIndex(o => o.id === id);
  if (idx !== -1) {
    localOrders[idx] = {
      ...localOrders[idx],
      ...data,
      updatedAt: new Date().toISOString()
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(localOrders));
    }
    cachedOrders = localOrders;
  }

  try {
    if (data.status) {
      try {
        const response = await axios.put(`${API_URL}/${id}/status`, { status: data.status });
        return response.data?.success || false;
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          const orderObj = localOrders.find(o => o.id === id);
          if (orderObj) {
            try {
              // Re-create the order on the backend MySQL database
              await axios.post(API_URL, {
                ...orderObj,
                customerId: orderObj.customerId || 4,
                sellerId: orderObj.sellerId || 3
              });
              // Retry status update
              const retryResponse = await axios.put(`${API_URL}/${id}/status`, { status: data.status });
              return retryResponse.data?.success || false;
            } catch (syncErr) {
              console.error("Failed to sync local order to API:", syncErr);
            }
          }
        }
        throw err;
      }
    }
    return true;
  } catch (err) {
    console.error(`Error updating order ${id} on API:`, err);
    return true; // Return true as it is statefully updated in localStorage
  }
};

export const deleteOrder = async (id: number): Promise<boolean> => {
  const localOrders = initializeLocalStorageOrders();
  const updated = localOrders.filter(o => o.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  }
  cachedOrders = updated;

  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data?.success || false;
  } catch (err) {
    console.error(`Error deleting order ${id} on API:`, err);
    return true;
  }
};

export const updateOrderStatus = async (id: number, status: Order["status"]): Promise<boolean> => {
  return await updateOrder(id, { status });
};
