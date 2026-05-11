import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/auth-store";

export default function RootLayout() {
  const loadToken = useAuthStore((s) => s.loadToken);
  const isReady = useAuthStore((s) => s.isReady);
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const token = useAuthStore.getState().token;
    if (token) {
      router.replace("/users/me");
    } else {
      router.replace("/auth/login");
    }
  }, [isReady]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: "none" }} />
        <Stack.Screen name="auth/login" options={{ animation: "none" }} />
        <Stack.Screen name="users/me" options={{ animation: "none" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
