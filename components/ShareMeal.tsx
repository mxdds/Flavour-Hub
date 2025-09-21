import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import * as Sharing from "expo-sharing";

interface ShareMealProps {
  meal: any;
  onClose: () => void;
}

export default function ShareMeal({ meal, onClose }: ShareMealProps) {
  const { colors } = useTheme();

  const handleShare = async () => {
    try {
      const shareText = `🌱 Fresh Recipe from FreshBite!\n\n${meal.name}\n\n${
        meal.description ? `Description: ${meal.description}\n\n` : ""
      }${meal.ingredients ? `Ingredients: ${meal.ingredients}\n\n` : ""}${
        meal.cookingTime ? `Cooking Time: ${meal.cookingTime} minutes\n\n` : ""
      }Shared with love from FreshBite! 💚`;

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(shareText);
      }
    } catch (error) {
      console.error("Error sharing meal:", error);
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
          <MaterialIcons name="share" size={32} color={colors.surface} />
        </LinearGradient>

        <Text style={[styles.title, { color: colors.text }]}>
          Share Fresh Recipe 🌱
        </Text>

        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Share this delicious recipe with friends and family
        </Text>

        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: colors.primary }]}
          onPress={handleShare}
        >
          <MaterialIcons name="share" size={20} color={colors.surface} />
          <Text style={[styles.shareButtonText, { color: colors.surface }]}>
            Share Recipe
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cancelButton, { borderColor: colors.border }]}
          onPress={onClose}
        >
          <Text
            style={[
              styles.cancelButtonText,
              { color: colors.textSecondary },
            ]}
          >
            Cancel
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
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
