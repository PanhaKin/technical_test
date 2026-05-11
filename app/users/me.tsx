import { ThemedText } from "@/components/themed-text";
import { useMe } from "@/hooks/use-me";
import { useAuthStore } from "@/store/auth-store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
};

export default function MeScreen() {
  const { me, isLoading } = useMe();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  const menuItems: MenuItem[] = [
    {
      icon: "mail-outline",
      label: "Email",
      value: me?.email ?? "—",
    },
    {
      icon: "call-outline",
      label: "Phone",
      value: me?.phone ? `+${me.countryCode} ${me.phone}` : "—",
    },
    {
      icon: "transgender-outline",
      label: "Gender",
      value: me?.gender ?? "—",
    },
    {
      icon: "card",
      label: "Nationality ID",
      value: me?.nationalityId ?? "—",
    },
  ];

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerBg} />
        <View style={styles.avatarWrapper}>
          {me?.avatar ? (
            <Image source={{ uri: me.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
          )}
        </View>
        <ThemedText type="subtitle">
          {me?.firstName} {me?.lastName}
        </ThemedText>
      </View>
      <View style={styles.card}>
        {menuItems.map((item, index) => (
          <View key={item.label}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={18} color="#0a7ea4" />
              </View>
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
                <ThemedText style={styles.menuValue}>{item.value}</ThemedText>
              </View>
            </TouchableOpacity>
            {index < menuItems.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.85}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <ThemedText style={styles.logoutText}>Logout</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 20,
    gap: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    alignItems: "center",
    paddingBottom: 28,
    gap: 8,
  },

  headerBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: "#0a7ea4",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  avatarWrapper: {
    marginTop: 60,
    position: "relative",
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: "#fff",
  },

  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#0a7ea4",
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },

  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
  },

  menuContent: {
    flex: 1,
    gap: 2,
  },

  menuLabel: {
    fontSize: 12,
    color: "#888",
  },

  menuValue: {
    fontSize: 15,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginLeft: 48,
  },

  logoutButton: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginTop: "auto",
    height: 52,
    backgroundColor: "#e53e3e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
