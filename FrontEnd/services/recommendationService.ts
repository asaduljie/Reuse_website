import { getProducts, Product } from "./productService";
import { getOrders } from "./orderService";
import { getWishlist } from "./wishlistService";

export async function getRecommendedForYou(userId: number): Promise<Product[]> {
  try {
    const resp = await getProducts();
    const all = resp?.data?.products || resp?.data || [];
    
    // Check wishlist
    const wish = getWishlist(userId);
    const wishCategories = wish.map(item => item.productId);

    // Get order history
    const allOrders = await getOrders();
    const userOrders = allOrders.filter(o => o.customerId === userId);
    
    const boughtCategories = new Set<string>();
    userOrders.forEach(o => {
      o.items.forEach(i => {
        if (i.categoryId) boughtCategories.add(String(i.categoryId));
      });
    });

    // Filter recommended: items in wishlist or same category as bought
    const recommended = all.filter((p: Product) => {
      const matchWish = wishCategories.includes(p.id);
      const matchCategory = boughtCategories.has(String(p.categoryId));
      return matchWish || matchCategory;
    });

    // Fallback: if no custom history, return highest sold/stock products
    if (recommended.length === 0) {
      return all.slice(0, 4);
    }
    return recommended.slice(0, 4);
  } catch {
    return [];
  }
}

export async function getSimilarProducts(productId: number, limit = 4): Promise<Product[]> {
  try {
    const resp = await getProducts();
    const all = resp?.data?.products || resp?.data || [];
    const source = all.find((p: Product) => p.id === productId);
    if (!source) return all.slice(0, limit);

    // Filter products of same category, excluding the product itself
    const similar = all.filter((p: Product) => p.categoryId === source.categoryId && p.id !== source.id);
    if (similar.length === 0) {
      return all.filter((p: Product) => p.id !== source.id).slice(0, limit);
    }
    return similar.slice(0, limit);
  } catch {
    return [];
  }
}

export async function getFrequentlyBoughtTogether(cartProductIds: number[], limit = 3): Promise<Product[]> {
  try {
    const resp = await getProducts();
    const all = resp?.data?.products || resp?.data || [];

    // Filter out items already in cart
    const filtered = all.filter((p: Product) => !cartProductIds.includes(p.id));
    
    // Sort by sold count/popularity
    return filtered
      .sort((a: any, b: any) => (b.sold || 0) - (a.sold || 0))
      .slice(0, limit);
  } catch {
    return [];
  }
}
