const BASE_URL = "http://localhost:5000";

export const cartApi = {
  addToCart: async (item: any) => {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return res.json();
  },
};
