import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLeaf,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0e3b26] via-[#092619] to-[#05170f] text-white mt-24 relative overflow-hidden border-t border-emerald-500/20">
      
      {/* Luxurious Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-lime-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* TOP BRAND & NEWSLETTER STRIP */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-[#0e3b26]/90 to-emerald-950/80 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 mb-16 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              <FaLeaf className="text-emerald-400" />
              <span>ReUse Eco Club Newsletter</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dapatkan Promo Preloved & Update Kurasi Terbaru
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/70 font-medium">
              Berlangganan untuk mendapatkan akses pertama produk thrift terbatas dan voucher potongan belanja.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]">
            <input
              type="email"
              placeholder="Masukkan alamat email Anda..."
              className="px-5 py-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/30 text-xs text-white placeholder-emerald-200/40 outline-none focus:border-emerald-400 transition flex-1 shadow-inner"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-lime-400 text-[#0c3824] font-extrabold text-xs hover:opacity-95 transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Langganan</span>
              <FaArrowRight className="text-xs" />
            </button>
          </form>
        </div>

        {/* MAIN FOOTER COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-xs">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group select-none w-fit">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-400 to-lime-400 p-0.5 shadow-lg shadow-emerald-950/40">
                <div className="w-full h-full bg-[#145A3B] rounded-[14px] flex items-center justify-center text-white">
                  <FaLeaf className="text-xl text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                  <span className="text-emerald-400">Re</span>Use
                </h2>
                <p className="text-[9px] font-extrabold text-emerald-300 tracking-widest uppercase mt-1">
                  Sustainable Luxury Marketplace
                </p>
              </div>
            </Link>

            <p className="text-emerald-100/70 leading-relaxed font-medium">
              ReUse adalah ekosistem marketplace terpercaya yang mempertemukan penjual dan pembeli produk preloved berkualitas tinggi. Kami berkomitmen mendukung gaya hidup ramah lingkungan melalui ekonomi sirkular zero-waste.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-500/20 px-3.5 py-2 rounded-xl w-fit">
              <FaShieldAlt className="text-emerald-400 text-sm" />
              <span>Transparansi Kondisi & Verified Seller</span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-extrabold text-white tracking-wider uppercase border-b border-emerald-800/80 pb-2">
              Navigasi
            </h3>
            <ul className="space-y-3 font-semibold text-emerald-200/80">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors">Koleksi Produk</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-emerald-400 transition-colors">Kategori Pilihan</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-emerald-400 transition-colors">Keranjang Belanja</Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-emerald-400 transition-colors">Wishlist Saya</Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-extrabold text-white tracking-wider uppercase border-b border-emerald-800/80 pb-2">
              Kategori Terpopuler
            </h3>
            <ul className="space-y-3 font-semibold text-emerald-200/80">
              <li>
                <Link href="/products?category=1" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>Vintage & Thrift Fashion</span>
                  <span className="text-[10px] text-emerald-400/60">Popular</span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=2" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>Sepatu & Sneakers Rare</span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=3" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>Tas Kulit & Aksesoris</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>Elektronik & Gadget Bekas</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>Peralatan Rumah Tangga</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT & SOCIAL */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-extrabold text-white tracking-wider uppercase border-b border-emerald-800/80 pb-2">
              Hubungi Kami
            </h3>
            <div className="space-y-3.5 font-medium text-emerald-200/80">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-emerald-400 text-sm mt-0.5 shrink-0" />
                <span>Makassar, Sulawesi Selatan, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-emerald-400 text-sm shrink-0" />
                <a
                  href="https://wa.me/628789096692"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-bold transition-colors"
                >
                  +62 878-9096-6692
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-emerald-400 text-sm shrink-0" />
                <span>support@reuse.my.id</span>
              </div>
            </div>

            {/* Glowing Social Badges */}
            <div className="pt-4">
              <p className="text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest mb-3">Ikuti Sosial Media Kami</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.tiktok.com/@reusepedia?_r=1&_t=ZS-988fhCeaOdY"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="TikTok Official ReUse"
                  className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/30 text-white flex items-center justify-center hover:bg-emerald-400 hover:text-[#0c3824] hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <FaTiktok className="text-base" />
                </a>

                <a
                  href="https://www.instagram.com/reusepedia?igsh=bWd3ZjRoNWZjc3Zq"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram Official ReUse"
                  className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/30 text-white flex items-center justify-center hover:bg-emerald-400 hover:text-[#0c3824] hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM COPYRIGHT STRIP */}
        <div className="border-t border-emerald-800/60 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-200/60 font-medium">
          <p>© {new Date().getFullYear()} ReUse Marketplace Indonesia. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">Panduan Keamanan Seller</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}