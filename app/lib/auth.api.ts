import { api } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const login = (data: LoginPayload) =>
  api<{ token: string; user: any }>("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const register = (data: RegisterPayload) =>
  api("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getProfile = () =>
  api("/profile", { auth: true });

export const logout = () => {
  localStorage.removeItem("token");
};
