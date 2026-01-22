// lib/api.ts

import * as productApi from "./product.api";
import * as cartApi from "./cart.api";
import * as wishlistApi from "./wishlist.api";
import * as authApi from "./auth.api";

/**
 * Central API layer
 * All app-wide APIs are exposed from here
 */
export const api = {
  product: productApi,
  cart: cartApi,
  wishlist: wishlistApi,
  auth: authApi,
};
