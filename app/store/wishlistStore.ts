import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  wishlist: any[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: any) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (product) => set((state) => ({
        wishlist: [...state.wishlist, product]
      })),
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== productId)
      })),
      toggleWishlist: (product) => {
        const state = get();
        const isExist = state.wishlist.some((item) => item.id === product.id);
        if (isExist) {
          state.removeFromWishlist(product.id);
        } else {
          state.addToWishlist(product);
        }
      }
    }),
    { name: 'wishlist-storage' }
  )
);