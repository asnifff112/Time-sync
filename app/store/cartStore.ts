import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/app/types/product';

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    getFormattedTotal: () => string;
}

export const useCartStore = create<CartState>()(
    persist( // ഡാറ്റ ലോക്കൽ സ്റ്റോറേജിൽ സേവ് ചെയ്യാൻ ഇത് സഹായിക്കും
        (set, get) => ({
            items: [],

            addItem: (product) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return {
                        items: [...state.items, { ...product, quantity: 1 }],
                    };
                });
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
            },

            clearCart: () => set({ items: [] }),

            getFormattedTotal: () => {
                const total = get().items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
                return `₹${total.toLocaleString("en-IN")}`;
            },
        }),
        { name: 'cart-storage' } // LocalStorage key name
    )
);