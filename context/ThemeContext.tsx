import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Theme = "light" | "dark";

interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  card: string;
  cardSecondary: string;
  success: string;
  warning: string;
  error: string;
  accent: string;
  accentLight: string;
  gradient: {
    primary: string[];
    secondary: string[];
    accent: string[];
    background: string[];
    card: string[];
  };
  shadow: string;
}

const lightTheme: ThemeColors = {
  primary: "#16A34A", // Fresh green - represents freshness/produce
  primaryLight: "#22C55E",
  primaryDark: "#15803D",
  secondary: "#F97316", // Vibrant tangerine - appetite/CTA
  secondaryLight: "#FB923C",
  background: "#FFF7ED", // Soft cream background
  backgroundSecondary: "#FEF3E2",
  surface: "#FFFFFF", // Pure white for cards/panels
  surfaceSecondary: "#FFFBF5",
  text: "#0F172A", // Charcoal for primary text
  textSecondary: "#374151",
  textMuted: "#6B7280", // Gray for muted text
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  card: "#FFFFFF",
  cardSecondary: "#FFFBF5",
  success: "#16A34A", // Same as primary for success notifications
  warning: "#F59E0B",
  error: "#DC2626", // Error red
  accent: "#10B981", // Emerald accent
  accentLight: "#34D399",
  gradient: {
    primary: ["#16A34A", "#22C55E", "#15803D"], // Fresh green gradients
    secondary: ["#F97316", "#FB923C", "#EA580C"], // Tangerine gradients
    accent: ["#10B981", "#34D399", "#6EE7B7"], // Emerald gradients
    background: ["#FFF7ED", "#FEF3E2", "#FDE68A"], // Warm cream gradients
    card: ["#FFFFFF", "#FFFBF5", "#FEF7ED"], // Clean white to cream
  },
  shadow: "rgba(15, 23, 42, 0.1)",
};

const darkTheme: ThemeColors = {
  primary: "#22C55E", // Lighter green for dark mode
  primaryLight: "#4ADE80",
  primaryDark: "#16A34A",
  secondary: "#FB923C", // Softer tangerine for dark
  secondaryLight: "#FDBA74",
  background: "#0F172A", // Dark charcoal
  backgroundSecondary: "#1E293B",
  surface: "#1E293B",
  surfaceSecondary: "#334155",
  text: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  border: "#475569",
  borderLight: "#334155",
  card: "#1E293B",
  cardSecondary: "#334155",
  success: "#22C55E",
  warning: "#FBBF24",
  error: "#F87171",
  accent: "#34D399",
  accentLight: "#6EE7B7",
  gradient: {
    primary: ["#22C55E", "#16A34A", "#15803D"], // Dark mode green gradients
    secondary: ["#FB923C", "#F97316", "#EA580C"], // Dark mode tangerine
    accent: ["#34D399", "#10B981", "#059669"], // Dark emerald gradients
    background: ["#0F172A", "#1E293B", "#334155"], // Dark backgrounds
    card: ["#1E293B", "#334155", "#475569"], // Dark card gradients
  },
  shadow: "rgba(0, 0, 0, 0.4)",
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const saveTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const colors = theme === "light" ? lightTheme : darkTheme;
  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
