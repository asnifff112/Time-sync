const BASE_URL = "http://localhost:5000";

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id?: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "placed" | "shipped" | "delivered";
  createdAt: string;
};

export const ordersApi = {
  /* ---------------- PLACE ORDER ---------------- */
  placeOrder: async (order: Order) => {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      throw new Error("Failed to place order");
    }

    return res.json();
  },

  /* ---------------- GET USER ORDERS ---------------- */
  getOrdersByUser: async (userId: string) => {
    const res = await fetch(
      `${BASE_URL}/orders?userId=${userId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    return res.json();
  },

  /* ---------------- GET SINGLE ORDER ---------------- */
  getOrderById: async (orderId: string) => {
    const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Order not found");
    }

    return res.json();
  },
};
