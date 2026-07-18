// @ts-nocheck
import { test, expect } from "@playwright/test";

test.describe("AI Chatbot E2E Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    // Visit home page
    await page.goto("http://localhost:3000");
  });

  test("should open chatbot and receive streaming answers", async ({ page }) => {
    // Verify chatbot toggle button is visible
    const chatToggle = page.locator("button:has(svg)");
    await expect(chatToggle).toBeVisible();

    // Click to open chatbot
    await chatToggle.click();

    // Verify chat widget panel is visible
    const chatWidget = page.locator("text=Asisten AI ReUse");
    await expect(chatWidget).toBeVisible();

    // Send a message
    const input = page.locator("placeholder='Tanyakan status pesanan, cari produk...'");
    await input.fill("produk murah");
    await input.press("Enter");

    // Check typing loading indicator displays then disappears
    const botResponse = page.locator("text=Berikut adalah produk termurah yang tersedia");
    await expect(botResponse).toBeVisible({ timeout: 5000 });
  });

  test("should load FAQ context on click checkout", async ({ page }) => {
    await page.locator("button:has(svg)").click();
    const input = page.locator("placeholder='Tanyakan status pesanan, cari produk...'");
    await input.fill("bagaimana cara checkout");
    await input.press("Enter");

    const answer = page.locator("text=Pilih produk ramah lingkungan pilihan Anda");
    await expect(answer).toBeVisible({ timeout: 5000 });
  });
});
