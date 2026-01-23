const BASE_URL = "http://localhost:5000"; // നിങ്ങളുടെ ബാക്കെൻഡ് URL

export const wishlistApi = {
  addToWishlist: async (productId: string) => {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    return res.json();
  },
  removeFromWishlist: async (productId: string) => {
    const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
      method: "DELETE",
    });
    return res.json();
  },
};