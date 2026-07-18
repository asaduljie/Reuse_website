import { CheckoutWhatsappProps } from "../types";
import { addOrder } from "../../../services/orderService";

export default async function checkoutWhatsapp({
  cart,
  name,
  phone,
  address,
  note,
  onSuccess,
}: CheckoutWhatsappProps & { onSuccess?: () => void }) {

  if (!name || !phone || !address) {
    alert("Silakan lengkapi data pembeli.");
    return;
  }

  let totalItem = 0;
  let totalPrice = 0;

  let message = `Halo Admin ReUse 👋

Saya ingin melakukan pemesanan produk.

━━━━━━━━━━━━━━━━━━━━━━

DATA PEMBELI

Nama :
${name}

No HP :
${phone}

Alamat :
${address}

Catatan :
${note || "-"}

━━━━━━━━━━━━━━━━━━━━━━

DETAIL PESANAN

`;

  cart.forEach((item) => {
    totalItem += item.qty;
    totalPrice += item.price * item.qty;
    message += `- ${item.name} (${item.qty}x) - Rp ${(
      item.price * item.qty
    ).toLocaleString("id-ID")}
`;
  });

  message += `TOTAL ITEM

${totalItem}

TOTAL PEMBAYARAN

Rp ${totalPrice.toLocaleString("id-ID")}

━━━━━━━━━━━━━━━━━━━━━━

Terima kasih.
Mohon konfirmasi ketersediaan produk.`;

  await addOrder({
    id: Math.floor(Date.now() / 1000),
    customerId: 4, // Default mock customer (Amanda)
    customerName: name,
    sellerId: 3, // Default mock seller (Seller One)
    phone,
    address,
    note,
    date: new Date().toLocaleDateString("id-ID"),
    total: totalPrice,
    totalItem,
    status: "Menunggu Konfirmasi",
    items: cart.map((item, idx) => ({
      id: idx + 1,
      productId: item.id,
      sellerId: 3, // Default mock seller
      categoryId: 1, // Default mock category (Fashion)
      name: item.name,
      quantity: item.qty,
      qty: item.qty, // Fallback for safety
      price: item.price
    })),
  });

  localStorage.removeItem("cart");

  onSuccess?.();

  window.open(
    `https://wa.me/6287890966692?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}