import React from "react";
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Meal } from "../types/meal";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";

interface MealCardProps {
  meal: Meal;
  onToggleFavorite?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
}

export default function MealCard({
  meal,
  onToggleFavorite,
  onDelete,
  onEdit,
  showActions = true,
}: MealCardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else if (meal.id) {
      router.push({
        pathname: "/(dashboard)/meals/[id]",
        params: { id: meal.id, refresh: Date.now().toString() },
      });
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  const formatMealType = (type?: string) => {
    if (!type) return "";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getMealTypeIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'breakfast': return 'free-breakfast';
      case 'lunch': return 'lunch-dining';
      case 'dinner': return 'dinner-dining';
      case 'snack': return 'cookie';
      default: return 'restaurant';
    }
  };

  const getMealTypeGradient = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'breakfast': return colors.gradient.accent;
      case 'lunch': return colors.gradient.secondary;
      case 'dinner': return colors.gradient.primary;
      default: return colors.gradient.accent;
    }
  };

  return (
    <TouchableOpacity
      onPress={handleEdit}
      style={styles.container}
    >
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        {/* Enhanced Image Section */}
        <View style={styles.imageContainer}>
          {meal.image ? (
            <Image
              source={{ uri: meal.image }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <LinearGradient
              colors={getMealTypeGradient(meal.mealType)}
              style={styles.placeholderImage}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialIcons
                name={getMealTypeIcon(meal.mealType) as any}
                size={48}
                color={colors.surface}
              />
            </LinearGradient>
          )}

          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.overlay}
          />

          {/* Top Actions */}
          <View style={styles.topActions}>
            <View style={[styles.mealTypeBadge, { backgroundColor: colors.primary }]}>
              <MaterialIcons
                name={getMealTypeIcon(meal.mealType) as any}
                size={16}
                color={colors.surface}
              />
              <Text style={[styles.mealTypeText, { color: colors.surface }]}>
                {formatMealType(meal.mealType)}
              </Text>
            </View>
            {showActions && (
              <TouchableOpacity
                style={[styles.favoriteButton, {
                  backgroundColor: meal.favorite ? colors.error : 'rgba(255,255,255,0.2)'
                }]}
                onPress={onToggleFavorite}
              >
                <MaterialIcons
                  name={meal.favorite ? "favorite" : "favorite-border"}
                  size={20}
                  color={meal.favorite ? colors.surface : colors.surface}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Bottom Title Overlay */}
          <View style={styles.titleOverlay}>
            <Text style={[styles.mealTitle, { color: colors.surface }]} numberOfLines={2}>
              {meal.name}
            </Text>
          </View>
        </View>

        {/* Enhanced Content Section */}
        <View style={styles.content}>
          {meal.description && (
            <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
              {meal.description}
            </Text>
          )}

          {/* Meal Stats */}
          <View style={styles.statsContainer}>
            {meal.cookingTime && (
              <View style={styles.statItem}>
                <MaterialIcons name="schedule" size={16} color={colors.primary} />
                <Text style={[styles.statText, { color: colors.textMuted }]}>
                  {meal.cookingTime}min
                </Text>
              </View>
            )}
            {meal.servings && (
              <View style={styles.statItem}>
                <MaterialIcons name="people" size={16} color={colors.primary} />
                <Text style={[styles.statText, { color: colors.textMuted }]}>
                  {meal.servings} servings
                </Text>
              </View>
            )}
            {meal.calories && (
              <View style={styles.statItem}>
                <MaterialIcons name="local-fire-department" size={16} color={colors.secondary} />
                <Text style={[styles.statText, { color: colors.textMuted }]}>
                  {meal.calories} cal
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          {showActions && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primaryLight }]}
                onPress={handleEdit}
              >
                <MaterialIcons name="edit" size={18} color={colors.primary} />
                <Text style={[styles.actionButtonText, { color: colors.primary }]}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
                onPress={handleDelete}
              >
                <MaterialIcons name="delete" size={18} color={colors.error} />
                <Text style={[styles.actionButtonText, { color: colors.error }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  topActions: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealTypeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  mealTypeText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleOverlay: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  statText: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
});
