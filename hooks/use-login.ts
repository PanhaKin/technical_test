import api from "@/lib/axios";
import { useAuthStore, User } from "@/store/auth-store";
import { router } from "expo-router";

type LoginPayload = {
  email?: string;
  countryCode?: string;
  phone?: string;
  password: string;
};

type LoginResponse = {
  token_type: string;
  access_token: string;
  accessToken: string;
  refreshToken: string;
  user: User;
};

type ApiResponse<T> = {
  data: T;
  message: string;
  title: string;
};

export function useLogin() {
  const { setToken, setUser, setLoading, setError, isLoading, error } =
    useAuthStore();

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await api.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        payload,
      );

      const { accessToken, access_token, refreshToken, token_type, user } =
        res.data;

      setUser(user);
      setToken({ accessToken, access_token, refreshToken, token_type });
      router.replace("/users/me");
    } catch (err: any) {
      const message =
        err.response?.data?.message ?? "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { login, isLoading, error };
}
