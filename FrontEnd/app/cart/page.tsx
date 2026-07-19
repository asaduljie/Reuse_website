"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import {
  isLoggedIn,
  saveRedirectPath
} from "../../utils/auth";
import ProductCard from "../../components/ProductCard";
import { getFrequentlyBoughtTogether } from "../../services/recommendationService";
import { Product } from "../../services/productService";
import { FaTrashAlt } from "react-icons/fa";

import {

CartItem,

getCart,

removeCart,

updateQuantity,

getTotalItem,

getTotalPrice

}

from "../../services/cartService";

export default function CartPage(){

const [

cart,

setCart

]=

useState<CartItem[]>([]);

const [recommended, setRecommended] = useState<Product[]>([]);

const router = useRouter();

const loadCart=()=>{
  const currentCart = getCart();
  setCart(currentCart);
  
  const loadRecs = async () => {
    const ids = currentCart.map((c: any) => c.id);
    const recs = await getFrequentlyBoughtTogether(ids, 4);
    setRecommended(recs);
  };
  loadRecs();
};

useEffect(()=>{

loadCart();

},[]);

const handleCheckout = () => {

  if (!isLoggedIn()) {

    saveRedirectPath("/checkout");

    alert("Silakan login terlebih dahulu.");

    router.push("/login");

    return;

  }

  router.push("/checkout");

};

const increase=(

id:number,

qty:number

)=>{

updateQuantity(

id,

qty+1

);

loadCart();

};

const decrease=(

id:number,

qty:number

)=>{

if(qty<=1)return;

updateQuantity(

id,

qty-1

);

loadCart();

};

const remove=(id:number)=>{

removeCart(id);

loadCart();

};

const totalPrice=

getTotalPrice();

const totalItem=

getTotalItem();

return(

<>

<Navbar/>

<main

className="

min-h-screen

bg-[#F7F8FA]

"

>

<div

className="

max-w-7xl

mx-auto

px-6

py-12

"

>

<div

className="

flex

justify-between

items-center

mb-12

"

>

<div>

<p

className="

uppercase

tracking-widest

text-[#145A3B]

font-semibold

"

>

Shopping Cart

</p>

<h1

className="

text-5xl

font-bold

mt-3

"

>

Keranjang Belanja

</h1>

</div>

<Link

href="/products"

className="

text-[#145A3B]

font-semibold

hover:underline

"

>

← Lanjut Belanja

</Link>

</div>
{

cart.length===0

?

<div

className="

bg-white

rounded-[40px]

p-20

text-center

shadow-sm

"

>

<div

className="

text-7xl

mb-6

"

>

🛒

</div>

<h2

className="

text-4xl

font-bold

"

>

Keranjang Masih Kosong

</h2>

<p

className="

text-gray-500

mt-5

"

>

Silakan pilih produk yang ingin
Anda beli.

</p>

<Link

href="/products"

>

<button

className="

mt-10

bg-[#145A3B]

text-white

px-8

py-4

rounded-2xl

hover:bg-green-900

transition

"

>

Belanja Sekarang

</button>

</Link>

</div>

:

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 border border-gray-100"
              >

                <div className="w-full sm:w-32 lg:w-40 h-48 sm:h-32 lg:h-40 shrink-0 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">

                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">

                  <div>

                    <span className="inline-block bg-[#145A3B]/10 text-[#145A3B] text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 rounded-full">

                      {item.category}

                    </span>

                    <h2 className="text-base sm:text-xl font-extrabold mt-2 text-gray-800 line-clamp-2">

                      {item.name}

                    </h2>

                  </div>

                  <p className="mt-2 text-lg sm:text-2xl font-black text-[#145A3B]">

                    Rp {Number(item.price).toLocaleString("id-ID")}

                  </p>

                </div>

                <div className="flex sm:flex-col justify-between items-center sm:items-end gap-4 sm:gap-0 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100/80 shrink-0">

                  <button
                    onClick={() => remove(item.id)}
                    className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
                  >

                    <FaTrashAlt className="text-base" />

                  </button>

                  <div className="text-right">

                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Subtotal</p>

                    <h3 className="text-base sm:text-xl font-black text-gray-800 mt-0.5">

                      Rp {(item.price * item.qty).toLocaleString("id-ID")}

                    </h3>

                  </div>

                </div>

              </div>

            ))}

          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-8 h-fit lg:sticky lg:top-28 border border-gray-100">

            <p className="uppercase tracking-widest text-[#145A3B] font-extrabold text-xs">

              Order Summary

            </p>

            <h2 className="text-xl sm:text-2xl font-black text-gray-800 mt-2 mb-6">

              Ringkasan Belanja

            </h2>

            <div className="space-y-4">

              <div className="flex justify-between items-center text-sm font-semibold text-gray-500">

                <span>Total Item</span>

                <b className="text-gray-800 font-extrabold">{totalItem}</b>

              </div>

              <div className="flex justify-between items-center text-sm font-semibold text-gray-500">

                <span>Subtotal</span>

                <b className="text-gray-800 font-extrabold">

                  Rp {totalPrice.toLocaleString("id-ID")}

                </b>

              </div>

              <div className="flex justify-between items-center text-sm font-semibold text-gray-500">

                <span>Ongkir</span>

                <b className="text-green-600 font-black uppercase text-xs">Gratis</b>

              </div>

              <hr className="border-gray-100 my-4" />

              <div className="flex justify-between items-center text-lg sm:text-xl font-black">

                <span className="text-gray-800">Total</span>

                <span className="text-[#145A3B]">

                  Rp {totalPrice.toLocaleString("id-ID")}

                </span>

              </div>

            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-[#145A3B] text-white py-3.5 rounded-2xl font-extrabold text-sm hover:bg-emerald-900 transition cursor-pointer shadow-md shadow-emerald-950/10"
            >

              Checkout

            </button>

            <button
              onClick={() => {
                localStorage.removeItem("cart");
                loadCart();
              }}
              className="w-full mt-3 border border-red-200 text-red-500 py-3.5 rounded-2xl font-extrabold text-sm hover:bg-red-50 transition cursor-pointer"
            >

              Kosongkan Keranjang

            </button>

            <div className="mt-6 bg-[#F7F8FA] rounded-2xl p-4 sm:p-5">

              <h3 className="font-extrabold text-xs text-gray-700 uppercase tracking-wider mb-3">

                Informasi

              </h3>

              <ul className="text-xs text-gray-400 font-semibold space-y-2.5 leading-relaxed">

                <li>• Produk akan diproses setelah checkout.</li>

                <li>• Pastikan jumlah produk sudah benar.</li>

                <li>• Pembayaran dilakukan setelah konfirmasi penjual.</li>

                <li>• Checkout akan diarahkan ke WhatsApp.</li>

              </ul>

            </div>

          </div>

        </div>

      }

      {recommended.length > 0 && (
        <div className="mt-20 border-t border-gray-100 pt-16">
          <h3 className="text-xl sm:text-2xl font-black text-gray-800 mb-8">
            AI Recommendation: Frequently Bought Together
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>

    <Footer />

  </main>

</>

);

}