const BASE_URL = "http://localhost:5000";

export const wishlistApi = {
  add: async (item: any) => {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return res.json();
  },
};
