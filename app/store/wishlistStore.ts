import { create } from 'zustand';
import { Product } from '@/app/types/product';

interface WishlistState {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleItem: (product: Product) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
    items: [],

    addItem: (product) => {
        set((state) => {
            if (state.items.find((item) => item.id === product.id)) {
                return state;
            }
            return { items: [...state.items, product] };
        });
    },

    removeItem: (productId) => {
        set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
        }));
    },

    isInWishlist: (productId) => {
        return !!get().items.find((item) => item.id === productId);
    },

    toggleItem: (product) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(product.id)) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    },
}));
