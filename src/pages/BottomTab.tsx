import React, { memo, useEffect, useRef } from "react";
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import { Stock } from "./Stock";
import { SearchRecipes } from "./SearchRecipes";
import { Settings } from "./Settings";
import { PaperProvider } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Animated, TouchableOpacity, Platform, Text, View } from "react-native";
import { StyleSheet } from "react-native";

import { Theme } from "./style/theme";
import { useNavigation } from "@react-navigation/native";

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
  const translateY = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1, // フォーカス時は少し拡大
      friction: 3,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateY, {
      toValue: focused ? -10 : 0, // フォーカス時は上に浮かぶ
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [focused, translateY, scale]);

  const IconComponent =
    iconSet === "FontAwesome5" ? FontAwesome5 : MaterialIcons;

  if (focused) {
    // フォーカスされている場合には円を表示
    return (
      <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
        <View style={styles.outerCircle}>
          <View style={styles.iconContainer}>
            <IconComponent name={name} color="white" size={size} />
          </View>
        </View>
      </Animated.View>
    );
  } else {
    // フォーカスされていない場合にはアイコンのみを表示
    return <IconComponent name={name} color={color} size={size} />;
  }
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#DDAF56", // オレンジ色の背景
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: 60, // 外枠のサイズをアイコンより大きく設定
    height: 60,
    borderRadius: 30,
    backgroundColor: "white", // 外枠の背景色を白色に設定
    justifyContent: "center",
    alignItems: "center",
  },
  // 他のスタイル...
});

export const BottomTab = memo(() => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: (props) => {
          let iconName = "default-icon"; // 初期値を設定
          let iconSet: "MaterialIcons" | "FontAwesome5" = "MaterialIcons"; // 初期値を設定
          let label = "";

          switch (route.name) {
            case "Stock":
              iconName = "kitchen";
              iconSet = "MaterialIcons";
              label = "Stock";
              break;
            case "SearchRecipes":
              iconName = "utensils";
              iconSet = "FontAwesome5";
              label = "SearchRecipes";
              break;
            case "Settings":
              iconName = "settings";
              iconSet = "MaterialIcons";
              label = "Settings";
              break;
            // 他のケース...
            default:
              // デフォルトのアイコン設定
              break;
          }

          return (
            <TabButtonWrapper
              {...props}
              iconName={iconName}
              iconSet={iconSet}
              label={label}
            />
          );
        },
        tabBarStyle: {
          height: 70, // タブバーの高さを設定
          backgroundColor: "white", // またはお好みの背景色
          borderTopWidth: 0, // 上の境界線を消す

          // 他のスタイル設定...
        },

        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        // 他の設定...
      })}
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
        name="SearchRecipes"
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

const TabButton = (
  props: BottomTabBarButtonProps & {
    iconName: string;
    iconSet: "MaterialIcons" | "FontAwesome5";
    label: string;
  }
) => {
  const navigation = useNavigation();
  const { iconName, iconSet, accessibilityState, label } = props;
  const focused = accessibilityState?.selected ?? false;
  const handlePress = () => {
    navigation.navigate(label as never);
  };

  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={handlePress} // onPress ハンドラを追加
    >
      <View style={{ alignItems: "center" }}>
        <AnimatedIcon
          name={iconName}
          color={focused ? "white" : "gray"}
          size={25}
          focused={focused}
          iconSet={iconSet}
        />
        {focused && (
          <Text
            style={{
              color: "black",
              fontSize: 18,
              marginTop: 1, // アイコンとテキストの間隔
            }}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const TabButtonWrapper = (
  props: BottomTabBarButtonProps & {
    iconName: string;
    iconSet: "MaterialIcons" | "FontAwesome5";
    label: string;
  }
) => {
  const { label } = props;
  // propsを使用してTabButtonと縦線を表示
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // この行を追加
        height: "100%",
      }}
    >
      <TabButton {...props} />
      {label !== "Settings" && (
        <View style={{ width: 1, height: "70%", backgroundColor: "#ddd" }} />
      )}
    </View>
  );
};
