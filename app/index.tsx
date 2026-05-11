import { useAuthStore } from "@/store/auth-store";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const isReady = useAuthStore((s) => s.isReady);
  const token = useAuthStore((s) => s.token);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (token) {
    return <Redirect href="/users/me" />;
  }

  return <Redirect href="/auth/login" />;
}
