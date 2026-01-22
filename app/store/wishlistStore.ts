import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/app/types/product';

interface WishlistState {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
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
            isInWishlist: (productId) => get().wishlist.some(item => item.id === productId),
        }),
        { name: 'wishlist-storage' }
    )
);