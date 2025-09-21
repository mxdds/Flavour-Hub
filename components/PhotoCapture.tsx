import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

interface PhotoCaptureProps {
  onClose: () => void;
  onPhotoTaken?: (uri: string) => void;
}

export default function PhotoCapture({
  onClose,
  onPhotoTaken,
}: PhotoCaptureProps) {
  const { colors } = useTheme();

  const handleTakePhoto = () => {
    // This integrates with the main camera functionality
    console.log("Opening enhanced camera...");
    if (onPhotoTaken) {
      onPhotoTaken("");
    }
    onClose();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { backgroundColor: colors.surface }]}>
        <LinearGradient
          colors={colors.gradient.primary}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name="camera-alt" size={40} color={colors.surface} />
        </LinearGradient>

        <Text style={[styles.title, { color: colors.text }]}>
          Fresh Photo Capture 📸
        </Text>

        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Capture beautiful photos of your fresh meals and ingredients
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleTakePhoto}
        >
          <MaterialIcons name="camera" size={24} color={colors.surface} />
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            Open Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.closeButton, { borderColor: colors.border }]}
          onPress={onClose}
        >
          <Text style={[styles.closeText, { color: colors.textSecondary }]}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
    width: "100%",
    maxWidth: 320,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  closeText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
