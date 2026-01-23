const API_URL = "http://localhost:5000";

// 1. REGISTRATION
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

// 2. LOGIN
export async function loginUser(email: string, password: string) {
  // JSON Server-ൽ ഈ രീതിയിലാണ് ക്വറി ചെയ്യുന്നത്
  const res = await fetch(
    `${API_URL}/users?email=${email}&password=${password}`
  );

  if (!res.ok) {
    throw new Error("Server error. Please try again later.");
  }

  const users = await res.json();

  if (users.length === 0) {
    throw new Error("Invalid email or password");
  }

  return users[0];
}

// 3. UPDATE PASSWORD (PASSWORD CHANGE)
export async function updateUserPassword(userId: string, newPassword: string) {
  // PATCH ഉപയോഗിച്ചാൽ ആ യൂസറുടെ പാസ്‌വേഡ് മാത്രം മാറും
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newPassword }),
  });

  if (!res.ok) {
    throw new Error("Failed to update password in database");
  }

  return res.json();
}