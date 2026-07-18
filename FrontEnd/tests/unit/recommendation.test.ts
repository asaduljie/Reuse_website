// @ts-nocheck
import { getSimilarProducts, getFrequentlyBoughtTogether } from "../../services/recommendationService";
import { getProducts } from "../../services/productService";

// Mock the product service
jest.mock("../../services/productService", () => ({
  getProducts: jest.fn().mockResolvedValue({
    data: {
      success: true,
      products: [
        { id: 1, name: "Sneakers A", categoryId: 1, price: 100000, stock: 10, sold: 100 },
        { id: 2, name: "Sneakers B", categoryId: 1, price: 120000, stock: 8, sold: 80 },
        { id: 3, name: "Denim Jacket", categoryId: 2, price: 200000, stock: 5, sold: 50 },
        { id: 4, name: "Cotton Tee", categoryId: 2, price: 80000, stock: 15, sold: 120 },
      ],
    },
  }),
}));

describe("AI Recommendation Engine Unit Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should recommend similar items in same category", async () => {
    // Product 1 (categoryId 1) similar products should return Product 2
    const similar = await getSimilarProducts(1);
    expect(similar.length).toBeGreaterThan(0);
    expect(similar[0].categoryId).toBe(1);
    expect(similar[0].id).not.toBe(1);
  });

  test("should exclude items already in cart for Frequently Bought Together", async () => {
    // If cart already has Product 1 and 2, bought together should recommend remaining Product 4 (highest sold)
    const bought = await getFrequentlyBoughtTogether([1, 2]);
    expect(bought.length).toBeLessThanOrEqual(2);
    expect(bought[0].id).toBe(4); // Product 4 has highest sold (120)
    expect(bought.map(p => p.id)).not.toContain(1);
    expect(bought.map(p => p.id)).not.toContain(2);
  });
});
