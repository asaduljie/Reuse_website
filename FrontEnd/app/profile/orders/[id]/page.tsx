"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/navbar";
import Footer from "../../../../components/footer";
import OrderTimeline from "../../../../components/customer/orders/OrderTimeline";
import OrderProductList from "../../../../components/customer/orders/OrderProductList";
import OrderSummary from "../../../../components/customer/orders/OrderSummary";
import { getOrder, Order, updateOrderStatus } from "../../../../services/orderService";
import { getSellerProfile } from "../../../../services/sellerService";
import { addToCart, saveCart } from "../../../../services/cartService";
import { FaChevronLeft, FaWhatsapp, FaShoppingCart, FaRedo, FaTrashAlt, FaCheck } from "react-icons/fa";
import { getUser } from "../../../../utils/auth";
import PremiumConfirmModal from "../../../../components/common/PremiumConfirmModal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const orderId = Number(resolvedParams.id);

  const [order, setOrder] = useState<Order | null>(null);
  const [sellerPhone, setSellerPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  const loadOrderDetails = async () => {
    setLoading(true);
    try {
      const ord = await getOrder(orderId);
      const currentUser = getUser();
      if (ord && currentUser && Number(ord.customerId) === Number(currentUser.id)) {
        setOrder(ord);
        
        // Fetch seller details to retrieve WhatsApp phone
        const seller = getSellerProfile(ord.sellerId);
        if (seller && seller.phone) {
          // Normalize phone (replace leading 0 with 62)
          let phoneNum = seller.phone;
          if (phoneNum.startsWith("0")) {
            phoneNum = "62" + phoneNum.substring(1);
          }
          setSellerPhone(phoneNum);
        }
      }
    } catch (err) {
      console.error("Gagal memuat detail pesanan:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F7F8FA] py-16 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-gray-500">Memuat detail transaksi...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F7F8FA] py-16 flex items-center justify-center">
          <div className="text-center bg-white rounded-3xl p-12 max-w-md border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800">Order Tidak Ditemukan</h3>
            <p className="text-gray-500 mt-2 text-sm font-semibold">
              Transaksi dengan ID #{orderId} tidak terdaftar di sistem.
            </p>
            <Link href="/profile/orders" className="inline-block bg-[#145A3B] hover:bg-[#0F472E] text-white px-6 py-3 rounded-xl mt-6 text-sm font-bold shadow-sm transition">
              Kembali Ke Riwayat Pesanan
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Format price helper
  const formatPrice = (price: number) => {
    return `Rp ${Number(price || 0).toLocaleString("id-ID")}`;
  };

  // WhatsApp click handler
  const handleChatSeller = () => {
    let itemsText = "";
    order.items.forEach((item) => {
      itemsText += `- ${item.name} (${item.quantity || item.qty}x)\n`;
    });

    const statusLabel =
      order.status === "Pending" ? "Menunggu Konfirmasi" :
      order.status === "Seller Confirmed" ? "Seller Mengonfirmasi" :
      order.status === "Ready to Pickup" ? "Siap Diambil" :
      order.status === "Completed" ? "Selesai" :
      order.status === "Cancelled" ? "Dibatalkan" : order.status;

    const message = `Halo Seller ReUse 👋\n\nSaya ingin menanyakan status pesanan saya:\n\nInvoice: ${order.invoice}\nStatus: ${statusLabel}\nTotal: ${formatPrice(order.total)}\n\nProduk:\n${itemsText}\nTerima kasih.`;
    
    if (sellerPhone) window.open(`https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Duplicate Order: Buy Again (appends items to cart)
  const handleBuyAgain = () => {
    order.items.forEach((item) => {
      addToCart({
        id: item.productId,
        name: item.name,
        description: "",
        price: item.price,
        stock: 99,
        imageUrl: item.image || "/images/products/placeholder.jpg",
        category: "Fashion",
        qty: item.quantity,
      });
    });

    alert("Produk berhasil ditambahkan ke keranjang belanja!");
    window.location.href = "/cart";
  };

  // Duplicate Order: Order Again (replacing cart)
  const handleOrderAgain = () => {
    const newCart = order.items.map((item) => ({
      id: item.productId,
      name: item.name,
      description: "",
      price: item.price,
      stock: 99,
      imageUrl: item.image || "/images/products/placeholder.jpg",
      category: "Fashion",
      qty: item.quantity,
    }));

    saveCart(newCart);
    alert("Keranjang diatur ulang dengan produk pesanan ini.");
    window.location.href = "/cart";
  };

  // Cancel Order action for Pending status
  const handleCancelOrder = () => {
    setConfirmConfig({
      isOpen: true,
      title: "Batalkan Pesanan?",
      message: "Apakah Anda yakin ingin membatalkan pesanan ini?",
      confirmText: "Ya, Batalkan",
      onConfirm: async () => {
        setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        const ok = await updateOrderStatus(order!.id, "Cancelled");
        if (ok) {
          alert("Pesanan berhasil dibatalkan.");
          loadOrderDetails();
        }
      },
    });
  };

  // Mark Completed action for Ready to Pickup status
  const handleCompleteOrder = () => {
    setConfirmConfig({
      isOpen: true,
      title: "Selesaikan Pesanan?",
      message: "Apakah Anda yakin telah menerima produk dan ingin menyelesaikan pesanan ini?",
      confirmText: "Ya, Selesai",
      onConfirm: async () => {
        setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        const ok = await updateOrderStatus(order!.id, "Completed");
        if (ok) {
          alert("Pesanan diselesaikan. Terima kasih telah berbelanja di ReUse!");
          loadOrderDetails();
        }
      },
    });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FA] py-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Back Navigation */}
          <div className="mb-6">
            <Link href="/profile/orders" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-bold transition">
              <FaChevronLeft className="text-xs" /> Kembali ke Riwayat Pesanan
            </Link>
          </div>

          {/* Invoice Header Card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">ID Transaksi</span>
              <h2 className="text-3xl font-black text-gray-900 mt-1">{order.invoice}</h2>
              <p className="text-xs text-gray-400 mt-2 font-semibold font-mono">Dibuat pada: {new Date(order.createdAt || order.date).toLocaleString("id-ID")}</p>
            </div>

            <div className="flex gap-3">
              {/* WhatsApp chat button */}
              <button
                onClick={handleChatSeller}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md transition"
              >
                <FaWhatsapp className="text-lg" /> Chat Seller
              </button>

              {/* Status specific primary actions */}
              {order.status === "Pending" && (
                <button
                  onClick={handleCancelOrder}
                  className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md transition"
                >
                  <FaTrashAlt className="text-xs" /> Batalkan Pesanan
                </button>
              )}

              {order.status === "Ready to Pickup" && (
                <button
                  onClick={handleCompleteOrder}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md transition"
                >
                  <FaCheck className="text-xs" /> Selesaikan Pesanan
                </button>
              )}

              {order.status === "Cancelled" && (
                <button
                  onClick={handleOrderAgain}
                  className="inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md transition"
                >
                  <FaRedo className="text-xs" /> Pesan Lagi
                </button>
              )}

              {order.status === "Completed" && (
                <button
                  onClick={handleBuyAgain}
                  className="inline-flex items-center gap-2 bg-[#145A3B] hover:bg-[#0F472E] text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-md transition"
                >
                  <FaShoppingCart className="text-xs" /> Beli Lagi
                </button>
              )}
            </div>
          </div>

          {/* Timeline tracking section */}
          <div className="mb-8">
            <OrderTimeline status={order.status} />
          </div>

          {/* Product Items List */}
          <div className="mb-8">
            <OrderProductList items={order.items} />
          </div>

          {/* Summary pricing and shipping address section */}
          <div>
            <OrderSummary order={order} />
          </div>

        </div>
      </main>

      <Footer />

      <PremiumConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        onConfirm={confirmConfig.onConfirm}
        onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}
