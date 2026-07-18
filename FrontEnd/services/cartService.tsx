export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  qty: number;
}

const CART_KEY = "cart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(CART_KEY);

  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (
  cart: CartItem[]
) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );
};

export const addToCart = (
  product: CartItem
) => {

  const cart = getCart();

  const exist = cart.find(
    item => item.id === product.id
  );

  if (exist) {
    exist.qty = 1;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  saveCart(cart);
};

export const updateQuantity = (
  id: number,
  qty: number
) => {
  const cart = getCart();
  const updated = cart.map(item =>
    item.id === id
      ? {
          ...item,
          qty: 1
        }
      : item
  );

  saveCart(updated);
};

export const removeCart = (
  id: number
) => {

  const cart = getCart();

  saveCart(

    cart.filter(

      item => item.id !== id

    )

  );

};

export const clearCart = () => {

  localStorage.removeItem(CART_KEY);

};

export const getTotalPrice = () => {

  const cart = getCart();

  return cart.reduce(

    (total, item) =>

      total +

      item.price * item.qty,

    0

  );

};

export const getTotalItem = () => {

  const cart = getCart();

  return cart.reduce(

    (total, item) =>

      total +

      item.qty,

    0

  );

};