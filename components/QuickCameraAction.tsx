import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import IntegratedCamera from "./IntegratedCamera";

interface QuickCameraActionProps {
  onImageCaptured?: (imageUri: string) => void;
}

export default function QuickCameraAction({
  onImageCaptured,
}: QuickCameraActionProps) {
  const [showCamera, setShowCamera] = useState(false);
  const { colors } = useTheme();
  const router = useRouter();

  const handleCameraAction = () => {
    Alert.alert("Capture Options", "Choose how to document your fresh creations", [
      {
        text: "Take Photo",
        onPress: () => {
          setShowCamera(true);
        },
      },
      {
        text: "Create New Recipe",
        onPress: () => {
          router.push("/(dashboard)/meals/new" as any);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleImageCaptured = (imageUri: string) => {
    setShowCamera(false);
    if (onImageCaptured) {
      onImageCaptured(imageUri);
    } else {
      // Default behavior: navigate to meal creation with image
      router.push({
        pathname: "/(dashboard)/meals/new",
        params: { imageUri },
      } as any);
    }
  };

  if (showCamera) {
    return (
      <IntegratedCamera
        onImageCaptured={handleImageCaptured}
        onClose={() => setShowCamera(false)}
        mode="photo"
      />
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleCameraAction}>
      <LinearGradient
        colors={colors.gradient.secondary}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <MaterialIcons name="camera-alt" size={28} color={colors.surface} />
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.surface }]}>Fresh Capture</Text>
            <Text style={[styles.subtitle, { color: colors.surface }]}>
              Document your delicious moments
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.surface} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  gradient: {
    padding: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.9,
  },
});
