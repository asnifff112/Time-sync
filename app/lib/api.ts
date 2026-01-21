const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ApiOptions extends RequestInit {
  auth?: boolean;
}

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // 🔐 Auth token (if exists)
  if (options.auth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
