"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import OrderFilter from "../../../components/customer/orders/OrderFilter";
import OrderCard from "../../../components/customer/orders/OrderCard";
import { getOrdersByCustomer, Order } from "../../../services/orderService";
import { getUser } from "../../../utils/auth";
import AccountMenu from "../../../components/customer/AccountMenu";
import { FaBoxOpen, FaShoppingBag, FaDollarSign, FaHistory } from "react-icons/fa";

export default function ProfileOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  
  // States for filter & search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState("Customer");

  // Load orders on mount
  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) { setLoading(false); return; }
    const currentId = Number(currentUser.id);
    setUserId(currentId);
    setUserName(currentUser.name || "Customer");

    loadCustomerOrders(currentId);
  }, []);

  const loadCustomerOrders = async (custId: number) => {
    setLoading(true);
    try {
      const customerOrders = await getOrdersByCustomer(custId);
      setOrders(customerOrders);
    } catch (err) {
      console.error("Gagal memuat orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Perform search, filter, and sort whenever conditions change
  useEffect(() => {
    let result = [...orders];

    // 1. Filter by Status
    if (statusFilter !== "ALL") {
      result = result.filter(
        (o) => o.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // 2. Search (invoice or product name)
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.invoice.toLowerCase().includes(query) ||
          o.items.some((item) => item.name.toLowerCase().includes(query))
      );
    }

    // 3. Sorting
    if (sortBy === "NEWEST") {
      result.sort(
        (a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime()
      );
    } else if (sortBy === "OLDEST") {
      result.sort(
        (a, b) => new Date(a.createdAt || a.date).getTime() - new Date(b.createdAt || b.date).getTime()
      );
    } else if (sortBy === "HIGHEST_TOTAL") {
      result.sort((a, b) => b.total - a.total);
    }

    setFilteredOrders(result);
  }, [orders, search, statusFilter, sortBy]);

  // Calculate statistics
  const totalSpent = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.total, 0);

  const activeOrdersCount = orders.filter(
    (o) => o.status !== "Completed" && o.status !== "Cancelled"
  ).length;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FA] py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Header */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#145A3B] font-extrabold">Akun Saya</p>
            <h1 className="text-3xl font-black text-gray-900 mt-1">Pesanan Saya</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Sidebar */}
            <div className="w-full lg:w-56 shrink-0">
              <AccountMenu />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-6">
              
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#145A3B] flex items-center justify-center text-lg font-bold">
                    <FaShoppingBag />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Pesanan</span>
                    <span className="text-xl font-black text-gray-800">{orders.length}</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg font-bold">
                    <FaBoxOpen />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Dalam Proses</span>
                    <span className="text-xl font-black text-gray-800">{activeOrdersCount}</span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg font-bold">
                    <FaDollarSign />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Belanja</span>
                    <span className="text-xl font-black text-[#145A3B]">
                      Rp {totalSpent.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <OrderFilter
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* List orders */}
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white h-40 rounded-3xl border animate-pulse" />
                  ))}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400 text-2xl mb-4">
                    <FaHistory />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Tidak Ada Transaksi</h3>
                  <p className="text-gray-500 mt-2 max-w-sm mx-auto text-xs font-semibold leading-relaxed">
                    Kami tidak menemukan pesanan yang sesuai dengan filter pencarian Anda saat ini.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onRefresh={() => userId && loadCustomerOrders(userId)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
