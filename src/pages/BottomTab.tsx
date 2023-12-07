import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Stock } from "./Stock";
import { SearchRecipes } from "./SearchRecipes";
import { Settings } from "./Settings";
import { PaperProvider } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Animated, TouchableOpacity, Platform } from "react-native";
import { StyleSheet } from "react-native";

import { Theme } from "./style/theme";

interface AnimatedIconProps {
  name: string;
  color: string;
  size: number;
  focused: boolean;
  iconSet: "MaterialIcons" | "FontAwesome5";
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  name,
  color,
  size,
  focused,
  iconSet,
}) => {
  const scale = new Animated.Value(1);

  Animated.spring(scale, {
    toValue: focused ? 1.2 : 1,
    friction: 3,
    useNativeDriver: true,
  }).start();

  // アイコンセットに基づいてアイコンコンポーネントを選択
  const IconComponent =
    iconSet === "FontAwesome5" ? FontAwesome5 : MaterialIcons;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <IconComponent name={name} color={color} size={size} />
    </Animated.View>
  );
};

export const BottomTab = memo(() => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarLabelPosition: "below-icon", // ラベルの位置をアイコンの下に設定
        tabBarLabelStyle: styles.tabBarLabel, // ラベルのスタイルをカスタマイズ
        tabBarIconStyle: styles.tabBarIcon, // アイコンのスタイルをカスタマイズ
        tabBarButton: (props) => (
          <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="Stock"
        component={Stock}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon
              name="kitchen"
              color={color}
              size={25}
              focused={focused}
              iconSet="MaterialIcons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={SearchRecipes}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon
              name="utensils"
              color={color}
              size={25}
              focused={focused}
              iconSet="FontAwesome5"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon
              name="settings"
              color={color}
              size={25}
              focused={focused}
              iconSet="MaterialIcons"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12, // フォントサイズの設定
    textAlign: "center", // テキストを中央揃え
  },
  tabBarIcon: {
    marginBottom: 0, // アイコンの下マージンを設定
  },
});
