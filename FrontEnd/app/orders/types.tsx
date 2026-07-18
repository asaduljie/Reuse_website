import { CartItem } from "../../services/cartService";

export interface Order {

  id: number;

  customerName: string;

  phone: string;

  address: string;

  note: string;

  date: string;

  total: number;

  totalItem: number;

  status:
    | "Menunggu Konfirmasi"
    | "Diproses"
    | "Selesai"
    | "Dibatalkan";

  items: CartItem[];

}