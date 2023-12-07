import { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SearchRecipes } from "./SearchRecipes";
import { Stock } from "./Stock";
import { Settings } from "./Settings";
import { PaperProvider } from "react-native-paper";
import { Theme } from "../style/Theme";

export const BottomTab = memo(() => {
  const Tab = createBottomTabNavigator();
  return (
    <PaperProvider theme={Theme}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "gray",
          activeBackgroundColor: "#DDAF56",
          inactiveBackgroundColor: "#E6E5DB",
          style: {
            backgroundColor: "#CE448",
            paddingBottom: 3,
          },
        }}
      >
        <Tab.Screen name="在庫管理" component={Stock} />
        <Tab.Screen name="レシピ検索" component={SearchRecipes} />
        <Tab.Screen name="設定" component={Settings} />
      </Tab.Navigator>
    </PaperProvider>
  );
});
