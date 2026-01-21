import { api } from "./api";

export interface WishlistItem {
  id: string;
  productId: string;
}

export const getWishlist = () =>
  api<WishlistItem[]>("/wishlist", { auth: true });

export const addToWishlist = (item: WishlistItem) =>
  api("/wishlist", {
    method: "POST",
    body: JSON.stringify(item),
    auth: true,
  });

export const removeFromWishlist = (id: string) =>
  api(`/wishlist/${id}`, {
    method: "DELETE",
    auth: true,
  });
