import { FaDollarSign, FaBox, FaShoppingBag, FaStar, FaUsers, FaHourglassHalf } from "react-icons/fa";

interface StatCard {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  sub?: string;
}

interface Props {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  rating: number;
  followers: number;
  pendingOrders: number;
}

export default function SellerStatistics({ totalRevenue, totalOrders, totalProducts, rating, followers, pendingOrders }: Props) {
  const cards: StatCard[] = [
    { label: "Total Revenue", value: `Rp ${totalRevenue.toLocaleString("id-ID")}`, icon: FaDollarSign, color: "from-emerald-500 to-teal-600", sub: "dari order selesai" },
    { label: "Total Orders", value: totalOrders, icon: FaBox, color: "from-blue-500 to-indigo-600", sub: "semua status" },
    { label: "Produk Aktif", value: totalProducts, icon: FaShoppingBag, color: "from-violet-500 to-purple-600", sub: "listing produk" },
    { label: "Rating Toko", value: `${rating.toFixed(1)} / 5.0`, icon: FaStar, color: "from-amber-500 to-orange-600", sub: "rating pembeli" },
    { label: "Pengikut", value: followers, icon: FaUsers, color: "from-pink-500 to-rose-600", sub: "follower toko" },
    { label: "Menunggu Konfirmasi", value: pendingOrders, icon: FaHourglassHalf, color: pendingOrders > 0 ? "from-orange-500 to-red-500" : "from-gray-400 to-gray-500", sub: "perlu direspon" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl bg-gradient-to-br ${card.color} text-white mb-4`}>
              <Icon />
            </div>
            <p className="text-2xl font-black text-gray-800 leading-tight">{card.value}</p>
            <p className="text-xs font-bold text-gray-500 mt-1">{card.label}</p>
            {card.sub && <p className="text-[10px] text-gray-400 mt-0.5">{card.sub}</p>}
          </div>
        );
      })}
    </div>
  );
}

