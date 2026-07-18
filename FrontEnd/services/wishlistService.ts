const WISHLIST_KEY = "reuse_wishlist";

export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  sellerId: number;
  sellerName: string;
  addedAt: string;
}

// Demo seed data for customer ID 4 (Amanda)
const SEED: WishlistItem[] = [
  {
    id: 1,
    userId: 4,
    productId: 5,
    productName: "Vintage Denim Jacket",
    productImage: "/images/products/placeholder.jpg",
    price: 185000,
    sellerId: 3,
    sellerName: "ReUse Store",
    addedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 2,
    userId: 4,
    productId: 8,
    productName: "Retro Sneakers",
    productImage: "/images/products/placeholder.jpg",
    price: 275000,
    sellerId: 3,
    sellerName: "ReUse Store",
    addedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
];

const load = (): WishlistItem[] => {
  if (typeof window === "undefined") return SEED;
  const raw = localStorage.getItem(WISHLIST_KEY);
  if (!raw) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(SEED));
    return SEED;
  }
  try { return JSON.parse(raw); } catch { return SEED; }
};

const save = (data: WishlistItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(data));
  }
};

export const getWishlist = (userId: number): WishlistItem[] =>
  load().filter((w) => w.userId === userId);

export const isInWishlist = (userId: number, productId: number): boolean =>
  load().some((w) => w.userId === userId && w.productId === productId);

export const addToWishlist = (item: Omit<WishlistItem, "id" | "addedAt">): void => {
  const all = load();
  if (all.some((w) => w.userId === item.userId && w.productId === item.productId)) return;
  const newId = all.length > 0 ? Math.max(...all.map((w) => w.id)) + 1 : 1;
  all.push({ ...item, id: newId, addedAt: new Date().toISOString() });
  save(all);
};

export const removeFromWishlist = (userId: number, productId: number): void => {
  save(load().filter((w) => !(w.userId === userId && w.productId === productId)));
};

export const clearWishlist = (userId: number): void => {
  save(load().filter((w) => w.userId !== userId));
};
