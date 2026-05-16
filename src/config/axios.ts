import axios from "axios";

export const menuFetch = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

menuFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem("token-menu-nfl");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function saveToken(token: string) {
  localStorage.setItem("token-menu-nfl", token);
}

export function deleteToken() {
  localStorage.removeItem("token-menu-nfl");
}
