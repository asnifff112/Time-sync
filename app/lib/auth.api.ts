const BASE_URL = "http://localhost:5000";

export const authApi = {
  /* ---------------- REGISTER ---------------- */
  register: async (user: {
    name: string;
    email: string;
    password: string;
  }) => {
    // check user already exists
    const check = await fetch(
      `${BASE_URL}/users?email=${user.email}`
    );
    const existing = await check.json();

    if (existing.length > 0) {
      throw new Error("User already exists");
    }

    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    return res.json();
  },

  /* ---------------- LOGIN ---------------- */
  login: async (email: string, password: string) => {
    const res = await fetch(
      `${BASE_URL}/users?email=${email}&password=${password}`
    );

    const data = await res.json();

    if (data.length === 0) {
      throw new Error("Invalid credentials");
    }

    // store user (simple auth)
    localStorage.setItem("user", JSON.stringify(data[0]));

    return data[0];
  },

  /* ---------------- CURRENT USER ---------------- */
  getCurrentUser: () => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /* ---------------- LOGOUT ---------------- */
  logout: () => {
    localStorage.removeItem("user");
  },
};
