import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Stock } from "./Stock";
import { SearchRecipes } from "./SearchRecipes";
import { Settings } from "./Settings";
import { PaperProvider } from "react-native-paper";
import theme from "../style/themes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Theme } from "./style/theme";
import { Animated, TouchableOpacity, Platform } from "react-native";

interface AnimatedIconProps {
  name: string;
  color: string;
  size: number;
  focused: boolean;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  name,
  color,
  size,
  focused,
}) => {
  // アニメーション値の初期化
  const scale = new Animated.Value(1);

  // アクティブなときのアニメーション
  Animated.spring(scale, {
    toValue: focused ? 1.15 : 1, // アクティブな時は少し大きく
    friction: 3,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <MaterialIcons name={name} color={color} size={size} />
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
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchRecipes"
        component={SearchRecipes}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="utensils"
              color={color}
              size={focused ? 30 : 25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="settings"
              color={color}
              size={focused ? 30 : 25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});
