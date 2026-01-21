import { api } from "./api";

export interface Order {
  id: string;
  items: any[];
  total: number;
  createdAt: string;
}

export const getOrders = () =>
  api<Order[]>("/orders", { auth: true });

export const createOrder = (order: Order) =>
  api("/orders", {
    method: "POST",
    body: JSON.stringify(order),
    auth: true,
  });
