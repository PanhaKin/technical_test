import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  countryCode: string;
  nationalityId: string;
  avatar: string;
  birthday: string | null;
};

type Token = {
  token_type: string;
  access_token: string;
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  user: User | null;
  token: Token | null;
  isReady: boolean; // 👈 add this
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: Token | null) => void;
  setLoading: (val: boolean) => void;
  setError: (msg: string | null) => void;
  logout: () => void;
  loadToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isReady: false, // 👈
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  setToken: async (token) => {
    if (token) {
      await SecureStore.setItemAsync("auth_token", JSON.stringify(token));
    } else {
      await SecureStore.deleteItemAsync("auth_token");
    }
    set({ token });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  logout: async () => {
    await SecureStore.deleteItemAsync("auth_token");
    set({ user: null, token: null, error: null });
  },

  loadToken: async () => {
    const raw = await SecureStore.getItemAsync("auth_token");
    if (raw) {
      set({ token: JSON.parse(raw) });
    }
    set({ isReady: true }); 
  },
}));
