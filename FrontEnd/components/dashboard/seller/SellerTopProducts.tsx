import { FaTrophy } from "react-icons/fa";

interface Product { id: number; name: string; sold: number; price: number; image: string; }
interface Props { products: Product[]; }

export default function SellerTopProducts({ products }: Props) {
  const max = Math.max(...products.map((p) => p.sold), 1);
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-extrabold text-gray-800 mb-5 flex items-center gap-2 text-sm">
        <FaTrophy className="text-amber-500" /> Produk Terlaris
      </h3>
      <div className="space-y-4">
        {products.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4">
            <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
              i === 0 ? "bg-amber-100 text-amber-600" : i === 1 ? "bg-gray-100 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-600" : "bg-gray-50 text-gray-400"
            }`}>#{i + 1}</span>
            <img src={p.image || "/images/products/placeholder.jpg"} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{p.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="bg-[#145A3B] h-1.5 rounded-full" style={{ width: `${(p.sold / max) * 100}%` }} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 shrink-0">{p.sold} terjual</span>
              </div>
            </div>
            <p className="text-sm font-black text-gray-700 shrink-0">Rp {p.price.toLocaleString("id-ID")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
