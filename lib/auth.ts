const API_URL = "http://localhost:5000";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(
    `${API_URL}/users?email=${email}&password=${password}`
  );

  const users = await res.json();

  if (users.length === 0) {
    throw new Error("Invalid credentials");
  }

  return users[0];
}
