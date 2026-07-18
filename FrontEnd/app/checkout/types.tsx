import { CartItem } from "../../services/cartService";

export interface CheckoutFormProps {
  name: string;
  phone: string;
  address: string;
  note: string;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setAddress: (value: string) => void;
  setNote: (value: string) => void;
}

export interface OrderSummaryProps {
  cart: CartItem[];
  totalItem: number;
  totalPrice: number;
  onCheckout: () => void;
}

export interface CheckoutWhatsappProps {
  cart: CartItem[];
  name: string;
  phone: string;
  address: string;
  note: string;
  onSuccess?: () => void;
}