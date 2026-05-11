import { useThemeColor } from "@/hooks/use-theme-color";
import type { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

type Props = PropsWithChildren<{
  isCenter?: boolean;
  padding?: number;
}>;

export default function Container({
  children,
  isCenter = false,
  padding = 20,
}: Props) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { padding }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={isCenter ? styles.center : undefined}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    paddingVertical: 20,
  },
});
