import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    apikey: process.env.EXPO_PUBLIC_API_KEY,
    "x-platform": "android",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token?.access_token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
