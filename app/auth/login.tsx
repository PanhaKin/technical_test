import Container from "@/components/container";
import { ThemedText } from "@/components/themed-text";
import AppTextInput from "@/components/ui/app-text-input";
import { useLogin } from "@/hooks/use-login";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  email: string;
  phone: string;
  password: string;
};

const TAB = {
  email: "email",
  phone: "phone",
} as const;

type Tab = (typeof TAB)[keyof typeof TAB];

export default function LoginScreen() {
  const [tab, setTab] = useState<Tab>(TAB.email);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (tab === "phone") {
      await login({
        countryCode: "855",
        phone: data.phone,
        password: data.password,
      });
    } else {
      await login({
        email: data.email,
        password: data.password,
      });
    }
  };

  const handleTab = (newTab: Tab) => {
    setTab(newTab);
  };

  return (
    <Container isCenter>
      <ThemedText
        type="title"
        style={{ flexDirection: "column", alignSelf: "center" }}
      >
        Login
      </ThemedText>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, tab === TAB.email && styles.activeTab]}
          onPress={() => handleTab(TAB.email)}
        >
          <ThemedText style={tab === TAB.email && styles.activeText}>
            Email
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === TAB.phone && styles.activeTab]}
          onPress={() => handleTab(TAB.phone)}
        >
          <ThemedText style={tab === TAB.phone && styles.activeText}>
            Phone
          </ThemedText>
        </TouchableOpacity>
      </View>

      {tab === TAB.email && (
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppTextInput
              label="Email"
              placeholder="Enter email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              prefixIcon="mail"
              error={errors.email?.message}
            />
          )}
        />
      )}

      {tab === TAB.phone && (
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{8,10}$/,
              message: "Invalid phone number",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AppTextInput
              label="Phone"
              placeholder="Enter phone number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
              autoCapitalize="none"
              error={errors.phone?.message}
              prefix={
                <View style={styles.flagPrefix}>
                  <Image
                    source={require("@/assets/images/cambodia-flag.jpg")}
                    style={styles.flagImage}
                  />
                  <ThemedText>+855</ThemedText>
                </View>
              }
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            label="Password"
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            prefixIcon="lock-closed"
            error={errors.password?.message}
            trailing={
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#aaa"
                />
              </TouchableOpacity>
            }
          />
        )}
      />

      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

      <TouchableOpacity>
        <ThemedText style={styles.buttonTextForgotPassword}>
          Forgot password ?
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
            <Ionicons name="arrow-forward" style={styles.buttonIcon} />
          </>
        )}
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 4,
  },
  
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "#0a7ea4",
  },

  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  
  flagPrefix: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  flagImage: {
    width: 24,
    height: 16,
    borderRadius: 2,
  },

  button: {
    flexDirection: "row",
    gap: 8,
    height: 50,
    backgroundColor: "#0a7ea4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonTextForgotPassword: {
    flexDirection: "column",
    alignSelf: "center",
    color: "#0a7ea4",
    fontSize: 16,
    fontWeight: "semibold",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  buttonIcon: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },

  errorText: {
    color: "#e53e3e",
    fontSize: 14,
    textAlign: "center",
  },
});
