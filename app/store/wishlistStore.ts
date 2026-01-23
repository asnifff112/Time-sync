import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Wishlist-ന്റെ കൃത്യമായ സ്ട്രക്ചർ
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
          // ലിസ്റ്റിൽ ഉണ്ടെങ്കിൽ റിമൂവ് ചെയ്യുക
          set({ 
            wishlist: currentWishlist.filter((item) => item.id !== product.id) 
          });
        } else {
          // ലിസ്റ്റിൽ ഇല്ലെങ്കിൽ ആഡ് ചെയ്യുക
          set({ 
            wishlist: [...currentWishlist, product] 
          });
        }
      },

      // ഫുൾ വിഷ്‌ലിസ്റ്റ് ഡിലീറ്റ് ചെയ്യാൻ
      clearWishlist: () => set({ wishlist: [] }),
    }),
    { 
      name: 'wishlist-storage' // ലോക്കൽ സ്റ്റോറേജിലെ പേര്
    }
  )
);