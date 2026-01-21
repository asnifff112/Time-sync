import { api } from "./api";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  modelUrl: string;
}

export const getProducts = () =>
  api<Product[]>("/products");

export const getProductBySlug = (slug: string) =>
  api<Product>(`/products/${slug}`);
