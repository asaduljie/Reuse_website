import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#145A3B] text-white mt-20 border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-10">
        
        {/* NEWSLETTER STRIP */}
        <div className="bg-[#0e402a] border border-emerald-700/60 rounded-2xl p-6 sm:p-8 mb-12 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Berlangganan Informasi Produk Terbaru
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 font-normal">
              Dapatkan update produk preloved pilihan dan promo menarik dari ReUse.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5 min-w-[300px]">
            <input
              type="email"
              placeholder="Masukkan email Anda..."
              className="px-4 py-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-xs text-white placeholder-emerald-200/50 outline-none focus:border-emerald-400 transition flex-1"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-white text-[#145A3B] font-bold text-xs hover:bg-emerald-50 transition shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Berlangganan</span>
              <FaArrowRight className="text-xs" />
            </button>
          </form>
        </div>

        {/* MAIN FOOTER COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-xs">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group select-none w-fit">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                <FaLeaf className="text-base text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">
                <span className="text-emerald-400">Re</span>Use
              </h2>
            </Link>

            <p className="text-emerald-100/80 leading-relaxed font-normal">
              ReUse adalah marketplace jual beli barang preloved berkualitas yang mempertemukan penjual dan pembeli secara aman, mudah, dan terpercaya di seluruh Indonesia.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              Navigasi
            </h3>
            <ul className="space-y-2 font-medium text-emerald-100/90">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Produk</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">Kategori</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">Keranjang</Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              Kategori
            </h3>
            <ul className="space-y-2 font-medium text-emerald-100/90">
              <li>
                <Link href="/products?category=1" className="hover:text-white transition-colors">Fashion Preloved</Link>
              </li>
              <li>
                <Link href="/products?category=2" className="hover:text-white transition-colors">Sepatu & Sneakers</Link>
              </li>
              <li>
                <Link href="/products?category=3" className="hover:text-white transition-colors">Tas & Aksesoris</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Elektronik Bekas</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Furnitur & Rumah Tangga</Link>
              </li>
            </ul>
          </div>

          {/* CONTACT & SOCIAL */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              Kontak
            </h3>
            <div className="space-y-2.5 font-medium text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-emerald-300 text-xs mt-0.5 shrink-0" />
                <span>Makassar, Indonesia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-emerald-300 text-xs shrink-0" />
                <a
                  href="https://wa.me/628789096692"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-bold transition-colors"
                >
                  +62 878-9096-6692
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-emerald-300 text-xs shrink-0" />
                <span>support@reuse.my.id</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.tiktok.com/@reusepedia?_r=1&_t=ZS-988fhCeaOdY"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="TikTok ReUse"
                  className="w-9 h-9 rounded-full bg-white text-[#145A3B] flex items-center justify-center hover:bg-emerald-50 transition"
                >
                  <FaTiktok className="text-sm" />
                </a>

                <a
                  href="https://www.instagram.com/reusepedia?igsh=bWd3ZjRoNWZjc3Zq"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram ReUse"
                  className="w-9 h-9 rounded-full bg-white text-[#145A3B] flex items-center justify-center hover:bg-emerald-50 transition"
                >
                  <FaInstagram className="text-base" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM COPYRIGHT STRIP */}
        <div className="border-t border-emerald-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-emerald-200/70 font-medium">
          <p>© {new Date().getFullYear()} ReUse Marketplace. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="/about" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}