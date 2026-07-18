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

<div

className="

grid

lg:grid-cols-3

gap-10

"

>

<div

className="

lg:col-span-2

space-y-6

"

>

{

cart.map(

item=>(

<div

key={item.id}

className="

bg-white

rounded-3xl

shadow-sm

p-6

flex

gap-6

"

>

<img

src={item.imageUrl}

alt={item.name}

className="

w-40

h-40

rounded-2xl

object-cover

"

/>

<div

className="

flex-1

"

>

<p

className="

text-sm

text-[#145A3B]

font-semibold

"

>

{item.category}

</p>

<h2

className="

text-2xl

font-bold

mt-2

"

>

{item.name}

</h2>

<p

className="

mt-3

text-3xl

font-bold

text-[#145A3B]

"

>

Rp {

Number(

item.price

).toLocaleString(

"id-ID"

)

}

</p>

</div>

<div

className="

flex

flex-col

justify-between

items-end

"

>

<button

onClick={()=>remove(

item.id

)}

className="
p-3
bg-red-50
text-red-500
rounded-2xl
hover:bg-red-100
hover:text-red-700
hover:scale-105
active:scale-95
transition-all
duration-300
flex
items-center
justify-center
shadow-sm
border
border-red-100/50
cursor-pointer
"

>

<FaTrashAlt className="text-xl" />

</button>

<div

className="

text-right

"

>

<p

className="

text-gray-500

"

>

Subtotal

</p>

<h3

className="

text-2xl

font-bold

"

>

Rp {

(

item.price*

item.qty

).toLocaleString(

"id-ID"

)

}

</h3>

</div>

</div>

</div>

)

)

}

</div>

<div

className="

bg-white

rounded-3xl

shadow-sm

p-8

h-fit

sticky

top-28

"

>

<p

className="

uppercase

tracking-widest

text-[#145A3B]

font-semibold

"

>

Order Summary

</p>

<h2

className="

text-3xl

font-bold

mt-3

mb-8

"

>

Ringkasan Belanja

</h2>

<div

className="

space-y-5

"

>

<div

className="

flex

justify-between

"

>

<span>

Total Item

</span>

<b>

{totalItem}

</b>

</div>

<div

className="

flex

justify-between

"

>

<span>

Subtotal

</span>

<b>

Rp {

totalPrice.toLocaleString(

"id-ID"

)

}

</b>

</div>

<div

className="

flex

justify-between

"

>

<span>

Ongkir

</span>

<b

className="

text-green-600

"

>

Gratis

</b>

</div>

<hr/>

<div

className="

flex

justify-between

text-2xl

font-bold

"

>

<span>

Total

</span>

<span

className="

text-[#145A3B]

"

>

Rp {

totalPrice.toLocaleString(

"id-ID"

)

}

</span>

</div>

</div>

<button

onClick={handleCheckout}

className="

w-full

mt-10

bg-[#145A3B]

text-white

py-4

rounded-2xl

font-semibold

hover:bg-green-900

transition

"

>

Checkout

</button>

<button

onClick={()=>{

localStorage.removeItem(

"cart"

);

loadCart();

}}

className="

w-full

mt-4

border

border-red-400

text-red-500

py-4

rounded-2xl

hover:bg-red-50

transition

"

>

Kosongkan Keranjang

</button>

<div

className="

mt-8

bg-[#F5F7F8]

rounded-2xl

p-5

"

>

<h3

className="

font-semibold

mb-3

"

>

Informasi

</h3>

<ul

className="

text-sm

text-gray-500

space-y-2

leading-7

"

>

<li>

• Produk akan diproses setelah checkout.

</li>

<li>

• Pastikan jumlah produk sudah benar.

</li>

<li>

• Pembayaran dilakukan setelah konfirmasi penjual.

</li>

<li>

• Checkout akan diarahkan ke WhatsApp.

</li>

</ul>

</div>

</div>

      {recommended.length > 0 && (
        <div className="mt-20 border-t border-gray-100 pt-16">
          <h3 className="text-2xl font-black text-gray-800 mb-8">AI Recommendation: Frequently Bought Together</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

</div>

}
        </div>

        <Footer />

      </main>

    </>

  );

}