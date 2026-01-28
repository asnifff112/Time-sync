import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface WishlistState {
  wishlist: any[];
  addItem: (product: any) => void;
  removeItem: (productId: string | number) => void;
  toggleWishlist: (product: any) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      
      addItem: (product) => set((state) => ({
        wishlist: [...state.wishlist, product]
      })),

      
      removeItem: (productId) => set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== productId)
      })),

     
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const isExist = currentWishlist.some((item) => item.id === product.id);

        if (isExist) {
          
          set({ 
            wishlist: currentWishlist.filter((item) => item.id !== product.id) 
          });
        } else {
         
          set({ 
            wishlist: [...currentWishlist, product] 
          });
        }
      },

      
      clearWishlist: () => set({ wishlist: [] }),
    }),
    { 
      name: 'wishlist-storage'
    }
  )
);