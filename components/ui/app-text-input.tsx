import { ThemedText } from "@/components/themed-text";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
  prefix?: React.ReactNode;
  trailing?: React.ReactNode;
  prefixIcon?: keyof typeof Ionicons.glyphMap;
  error?: string; // ← error message
  required?: boolean; // ← show required star
};

export default function AppTextInput({
  label,
  prefix,
  prefixIcon,
  trailing,
  style,
  error,
  required,
  ...props
}: Props) {
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelRow}>
          <ThemedText>{label}</ThemedText>
          {required && <Text style={styles.required}> *</Text>}
        </View>
      )}

      <View style={styles.inputWrapper}>
        {prefix && <View style={styles.prefix}>{prefix}</View>}

        <TextInput
          style={[
            styles.input,
            prefix ? styles.inputWithPrefix : undefined,
            prefixIcon ? styles.inputWithPrefixIcon : undefined,
            trailing ? styles.inputWithTrailing : undefined,
            error ? styles.inputError : undefined, // ← red border on error
            style,
          ]}
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />

        {prefixIcon && (
          <View style={styles.iconPrefixWrapper}>
            <Ionicons name={prefixIcon} size={20} color="#aaa" />
          </View>
        )}

        {trailing && <View style={styles.trailingWrapper}>{trailing}</View>}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  required: {
    color: "red",
    fontSize: 14,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  prefix: {
    height: 50,
    paddingHorizontal: 14,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#f2f2f2",
    borderRightWidth: 0,
  },

  inputWithPrefixIcon: {
    paddingLeft: 44,
  },

  iconPrefixWrapper: {
    position: "absolute",
    left: 14,
    height: 50,
    justifyContent: "center",
    zIndex: 1,
  },

  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    borderBottomWidth: 1,
  },

  inputError: {
    borderColor: "red", // ← red border
  },

  inputWithPrefix: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  inputWithTrailing: {
    paddingRight: 44,
  },

  trailingWrapper: {
    position: "absolute",
    right: 14,
    height: 50,
    justifyContent: "center",
    zIndex: 1,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -4,
  },
});
