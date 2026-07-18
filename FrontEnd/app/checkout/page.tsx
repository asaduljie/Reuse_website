"use client";

import {

useEffect,

useMemo,

useState

} from "react";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import {
  CartItem,
  getCart,
} from "../../services/cartService";

import CheckoutForm from "./components/checkoutForm";
import OrderSummary from "./components/OrderSummary";
import checkoutWhatsapp from "./utils/checkoutWhatsapp";
import { isLoggedIn } from "@/utils/auth";
import { useRouter } from "next/dist/client/components/navigation";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setCart(getCart());
  }, []);

const totalItem = useMemo(() => {

  return cart.reduce(

    (total, item) =>

      total + item.qty,

    0

  );

}, [cart]);

const router = useRouter();

useEffect(() => {

  if (!isLoggedIn()) {

    alert("Silakan login terlebih dahulu.");

    router.replace("/login");

  }

}, []);

const totalPrice = useMemo(() => {

  return cart.reduce(

    (total, item) =>

      total +

      item.price * item.qty,

    0

  );

}, [cart]);
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="mb-12">
            <p className="uppercase tracking-widest text-[#145A3B] font-semibold">
              Checkout
            </p>

            <h1 className="text-5xl font-bold mt-3">
              Checkout Pesanan
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">

            <CheckoutForm
              name={name}
              phone={phone}
              address={address}
              note={note}
              setName={setName}
              setPhone={setPhone}
              setAddress={setAddress}
              setNote={setNote}
            />

            <OrderSummary
              cart={cart}
              totalItem={totalItem}
              totalPrice={totalPrice}
              onCheckout={() =>
                checkoutWhatsapp({
                  cart,
                  name,
                  phone,
                  address,
                  note,
                  onSuccess: () => {
                    setCart([]);
                  },
                })
              }
            />
                
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}