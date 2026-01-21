import { api } from "./api";

export interface CartItem {
  id: string;
  productId: string;
  qty: number;
}

export const getCart = () =>
  api<CartItem[]>("/cart", { auth: true });

export const addToCart = (item: CartItem) =>
  api("/cart", {
    method: "POST",
    body: JSON.stringify(item),
    auth: true,
  });

export const removeFromCart = (id: string) =>
  api(`/cart/${id}`, {
    method: "DELETE",
    auth: true,
  });
