// lib/product.api.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  colors: string[];
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "chronox-black",
    name: "Chronox Black",
    price: 24999,
    description:
      "Precision engineered automatic watch with sapphire crystal and stainless steel body.",
    colors: ["Black", "Silver", "Gold"],
    image: "/images/watch-black.png",
  },
  {
    id: "chronox-blue",
    name: "Chronox Blue",
    price: 26999,
    description:
      "Elegant blue dial watch built for performance and daily luxury.",
    colors: ["Blue", "Silver"],
    image: "/images/watch-blue.png",
  },
];

export function getProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
