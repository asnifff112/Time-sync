// app/lib/product.api.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Midnight Chrono",
    price: 12500,
    image: "https://images.unsplash.com/photo-1524592094765-f7a5f16801e0?auto=format&fit=crop&q=80&w=800",
    description: "A sleek midnight blue chronograph designed for the modern professional.",
    colors: ["Blue", "Black", "Silver"],
  },
  {
    id: "2",
    name: "Classic Leather",
    price: 8999,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800",
    description: "Timeless design with genuine leather straps and gold finish.",
    colors: ["Brown", "Black"],
  },
  {
    id: "3",
    name: "Sport Digital",
    price: 4500,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800",
    description: "Rugged digital watch built for extreme conditions.",
    colors: ["Black", "Red"],
  }
];

export const productApi = {
  // Simulate async database call
  getAllProducts: async (): Promise<Product[]> => {
    return DUMMY_PRODUCTS;
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    return DUMMY_PRODUCTS.find((p) => p.id === id);
  },
};