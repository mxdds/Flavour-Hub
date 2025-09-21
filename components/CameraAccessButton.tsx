import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

interface CameraAccessButtonProps {
  onPress: () => void;
  title?: string;
  subtitle?: string;
  icon?: string;
  disabled?: boolean;
}

export default function CameraAccessButton({
  onPress,
  title = "Fresh Camera",
  subtitle = "Capture your fresh food creations beautifully",
  icon = "camera-alt",
  disabled = false,
}: CameraAccessButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { opacity: disabled ? 0.6 : 1 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={colors.gradient.accent}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={icon as any} size={32} color={colors.surface} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.surface }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>{subtitle}</Text>
          </View>
          <MaterialIcons name="arrow-forward" size={24} color={colors.surface} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  gradient: {
    padding: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
  },
});
