import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import { black, button, primary, white } from "@/constants/ThemeVariables";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      tabBarStyle: { display: 'none' }, // This line hides the bottom tab bar
    }}
  >
      <Tabs.Screen
        name="index"
        options={{
          title: "Travel Genie",
          headerTitleAlign: 'center', // Aligns the title to the center
        }}
      />
    </Tabs>
  );
}
