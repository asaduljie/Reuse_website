# Product Requirements Document (PRD)
## Project Name: ReUse Circular Economy Platform

---

## 1. Introduction & Product Vision
ReUse is a modern, sustainable circular economy marketplace web application that allows users to buy and sell high-quality preloved goods (e.g., fashion, shoes, furniture, electronics). The platform aims to reduce environmental impact by extending the lifecycle of consumer items through a highly polished, responsive, and intuitive e-commerce experience.

---

## 2. Target Audience & User Roles
*   **Customer (Buyer)**: Users looking to browse products, add items to their wishlist or shopping cart, chat with the AI Customer Assistant, and purchase items.
*   **Seller (Store Owner)**: Users looking to list their preloved goods, track analytics (sales, order status), manage inventory, and process customer orders.
*   **Admin / Super Admin**: Staff responsible for platform configurations, user moderation, database backups, and banner management.

---

## 3. Core Functional Requirements

### 3.1 Registration & Authentication
*   **Sliding Role Selector**: The registration form (`/register`) must feature an interactive, custom sliding switch.
    *   **Customer** is positioned on the left; **Seller** is on the right.
    *   Clicking a role slides a dark green (`#145A3B`) background capsule to indicate the selected state.
    *   Unselected text fades to muted gray.
*   **Role Preservation**: The selected role must be saved in the database upon successful registration.
*   **Login & Redirects**: Users log in at `/login` and are redirected back to the homepage or their previous active path.

### 3.2 Catalogue, Search, & Navigation
*   **Search Input**: Dynamic search filters products by text query. Pressing "Enter" on keyboard redirects/updates results.
*   **Category Filter**: Dropdown filter to select specific categories (e.g., Fashion, Shoes, Furniture).
*   **Urutan (Sorting)**: Dropdown allows sorting products by "Terbaru" (Latest), "Harga Terendah" (Lowest Price), and "Harga Tertinggi" (Highest Price).
*   **Pagination**: Smooth navigation buttons (Previous, Page Numbers, Next) to load products in batches of 8.

### 3.3 Product Details & Engagement
*   **Product Detail View (`/products/[id]`)**: Shows image, title, category badge, description, price, and availability.
*   **Interactive Wishlist**:
    *   A heart icon button toggles the product's saved state in the user's wishlist database (`localStorage`).
    *   If active, the button renders with a red background/text (`bg-red-50 text-red-500`) and reads "Di Wishlist".
    *   If clicked on the catalogue card, the item is saved without triggering page navigation.
*   **Cart Actions**: Clicking "Keranjang" adds the item to the cart with a floating "✓ Added" bounce badge.
*   **WhatsApp Checkout**: Directs user to WhatsApp with a pre-filled purchase message.

### 3.4 AI Customer Service Chatbot Widget
*   **Floating Chat Trigger**: A circular floating button in the bottom right corner opens/closes the AI Assistant.
*   **Dynamic Chatting**: Connects to the AI Service to answer customer queries.
*   **Clear Chat History**: A trash icon in the widget header allows users to wipe their chat history.

### 3.5 Shopping Cart & Checkout
*   **Shopping Cart (`/cart`)**: Displays selected products, images, category badges, prices, subtotals, and a trash deletion button.
*   **Zero-Tax Order Summary**:
    *   Calculates Total Items, Subtotal, Shipping (Free), and Total Price.
    *   **Tax must be completely omitted (no tax columns or calculations are rendered)**.
*   **Empty Cart State**: Clear Cart button wipes `localStorage` and shows a placeholder graphic.

### 3.6 Seller Dashboard (`/dashboard/seller`)
*   **Analytics Overview**: Renders interactive charts showing order status distribution, sales revenue, and top products.
*   **Product Listings**: Add new products (uploading image, title, category, price, stock, description), edit details, and delete items.
*   **Order Fulfillment & Zero-Tax Invoice**:
    *   Allows updating order statuses (e.g., Diproses, Dikirim).
    *   Prints professional invoice layouts with **no tax lines** (displays only subtotal, shipping, and total payment).

---

## 4. Visual & Non-Functional Requirements (Mobile Responsiveness Audit)

*   **No Horizontal Scroll Leakage**: The entire site must fit within `100vw`. No horizontal scrollbars are permitted on any mobile viewport (320px–414px width).
*   **Emerald Dark Green Aesthetic**: Main brand colors must be premium dark greens (`#145A3B`, `#0e402a`).
*   **Mobile Hamburger Menu Drawer**: Collapses Navbar links into a dark green glassmorphic dropdown list with round active state indicators.
*   **Centered Product Detail CTAs**: On screens smaller than `sm` (640px), the Wishlist, Cart, and WhatsApp buttons must stack vertically with text and icons aligned exactly to the center of the container.
*   **Responsive AI Chatbot CS Container**: On mobile viewports, the chatbot widget width must scale dynamically (`w-[calc(100vw-2.5rem)]`) and height adjust to fit standard viewports.
*   **2-Column Grid Layout**: Product catalogue recommendations (Frequently Bought Together) must display as a 2-column grid (`grid-cols-2`) on mobile instead of wrapping to a single column or extending horizontally.
*   **Fluid Seller Banner Card**: The catalogue "Punya Barang Layak Pakai?" card must stack elements vertically on mobile with centered alignment, safe padding (`px-6 py-10`), and a scaling image banner.
