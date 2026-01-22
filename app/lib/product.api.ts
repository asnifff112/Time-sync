export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  colors: string[];
  image: string;
}

const products: Product[] = [
  {
    id: "timesync-black",
    name: "TimeSync Black",
    price: 24999,
    description: "Premium automatic watch",
    colors: ["Black", "Silver"],
    image: "/images/watch-black.jpg",
  },
];

export function getAllProducts() {
  return products;
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}
export function getAll() {
  throw new Error("Function not implemented.");
}

