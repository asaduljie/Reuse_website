"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../services/authService";
import { FaLeaf } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });

  const toggleRole = (newRole: string) => {
    setFormData((prev) => ({
      ...prev,
      role: newRole,
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await registerUser(formData);

      if (response.data.success) {
        alert("Registrasi berhasil. Silakan login.");

        router.replace("/login");
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registrasi gagal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fafbfd] relative overflow-hidden">
      {/* Left Column: Form Card */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center items-center px-6 py-12 md:px-12 relative z-10">
        {/* Decorative blurred backgrounds */}
        <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-emerald-100/30 blur-[100px] pointer-events-none" />

        <div className="relative bg-white/90 backdrop-blur-md border border-gray-100/80 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] w-full max-w-md transition-all duration-300">
          {/* Brand Logo & Heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#145A3B] to-[#2ecc71] flex items-center justify-center text-white shadow-md shadow-emerald-950/15 mb-3">
              <FaLeaf className="text-xl rotate-[-15deg]" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Daftar Akun Baru</h2>
            <p className="text-xs font-bold text-gray-400 mt-1.5 uppercase tracking-widest">Bergabung dengan ReUse</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama lengkap Anda"
                value={formData.name}
                onChange={handleChange}
                className="bg-slate-50 border border-slate-100 text-slate-800 placeholder-slate-400 p-3.5 rounded-2xl w-full focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 font-semibold text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan alamat email Anda"
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-50 border border-slate-100 text-slate-800 placeholder-slate-400 p-3.5 rounded-2xl w-full focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 font-semibold text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Nomor HP</label>
              <input
                type="text"
                name="phone"
                placeholder="Masukkan nomor handphone Anda"
                value={formData.phone}
                onChange={handleChange}
                className="bg-slate-50 border border-slate-100 text-slate-800 placeholder-slate-400 p-3.5 rounded-2xl w-full focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 font-semibold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-slate-50 border border-slate-100 text-slate-800 placeholder-slate-400 p-3.5 rounded-2xl w-full focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 font-semibold text-sm"
                required
              />
            </div>

            {/* Custom Sliding Role Switch */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                Daftar Sebagai
              </label>
              <div className="relative w-full h-12 bg-slate-100 rounded-2xl p-1 flex items-center cursor-pointer select-none">
                {/* Sliding Indicator */}
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#145A3B] rounded-xl transition-all duration-300 ease-out shadow-sm ${
                    formData.role === "seller"
                      ? "left-[calc(50%+2px)]"
                      : "left-1"
                  }`}
                />
                
                {/* Customer button */}
                <button
                  type="button"
                  onClick={() => toggleRole("customer")}
                  className={`relative z-10 w-1/2 text-center text-xs font-black uppercase tracking-wider transition-colors duration-300 focus:outline-none ${
                    formData.role === "customer" ? "text-white" : "text-slate-500"
                  }`}
                >
                  Customer
                </button>

                {/* Seller button */}
                <button
                  type="button"
                  onClick={() => toggleRole("seller")}
                  className={`relative z-10 w-1/2 text-center text-xs font-black uppercase tracking-wider transition-colors duration-300 focus:outline-none ${
                    formData.role === "seller" ? "text-white" : "text-slate-500"
                  }`}
                >
                  Seller
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#145A3B] to-[#1e7a50] hover:from-[#0F472E] hover:to-[#145A3B] text-white text-sm font-extrabold py-4 rounded-2xl transition duration-300 shadow-lg shadow-emerald-950/15 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-4"
            >
              {loading ? "Mendaftarkan..." : "Daftar Akun"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-semibold text-slate-400">
            Sudah punya akun?
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[#145A3B] hover:text-[#0F472E] font-extrabold ml-1.5 hover:underline"
            >
              Login Di Sini
            </button>
          </p>
        </div>
      </div>

      {/* Right Column: Full Wavy Panel with Aesthetic Continuous Line Art */}
      <div 
        className="hidden lg:flex flex-1 items-center justify-center p-12 min-h-screen relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/eco-line-art-bg.png')" }}
      >
        {/* Soft White Overlay for readability */}
        <div className="absolute inset-0 bg-white/90" />

        {/* Wavy Edge SVG */}
        <div className="absolute left-0 top-0 bottom-0 w-24 -translate-x-[99%] pointer-events-none text-white fill-current">
          <svg className="h-full w-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
            <path d="M100,0 C30,150 70,350 0,500 C70,650 30,850 100,1000 Z" />
          </svg>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-50/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-emerald-50/50 blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-lg z-10">
          <span className="inline-block bg-emerald-50 text-[#145A3B] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
            Sustainable preloved marketplace
          </span>
          <h3 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
            Temukan Nilai Baru dari <span className="text-[#145A3B]">Barang Preloved</span> Pilihan
          </h3>
          <p className="text-sm text-slate-500 font-semibold max-w-md mx-auto leading-relaxed">
            Mulai beli dan jual barang preloved berkualitas untuk mendukung konsumsi yang lebih bertanggung jawab dan ramah lingkungan.
          </p>
        </div>
      </div>
    </div>
  );
}