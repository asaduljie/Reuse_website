import Link from "next/link";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

interface Product { id: number; name: string; stock: number; price: number; image: string; }
interface Props { products: Product[]; }

export default function SellerLowStock({ products }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-extrabold text-gray-800 flex items-center gap-2 text-sm">
          <FaExclamationTriangle className="text-amber-500" /> Stok Hampir Habis
        </h3>
        {products.length > 0 && (
          <span className="text-[10px] bg-red-100 text-red-600 font-extrabold px-2.5 py-1 rounded-full">
            {products.length} produk
          </span>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm font-semibold flex items-center justify-center gap-2">
          <FaCheckCircle className="text-emerald-500" /> Semua stok aman
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-2xl border border-red-100">
              <img src={p.image || "/images/products/placeholder.jpg"} alt={p.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{p.name}</p>
                <p className="text-xs text-gray-500 font-semibold">Rp {p.price.toLocaleString("id-ID")}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-lg font-black ${p.stock <= 2 ? "text-red-600" : "text-amber-600"}`}>{p.stock}</p>
                <p className="text-[10px] text-gray-400 font-semibold">sisa stok</p>
              </div>
            </div>
          ))}
          <Link href="/dashboard/seller/products" className="block text-center text-xs text-[#145A3B] hover:underline font-bold pt-2">
            Kelola Produk →
          </Link>
        </div>
      )}
    </div>
  );
}
