import { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserPage } from "./UserPage";
import { SearchRecipes } from "./SearchRecipes";
import { Stock } from "./Stock";
import { Settings } from "./Settings";

export const BottomTab = memo(() => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Stock" component={Stock} />
      <Tab.Screen name="SearchRecipes" component={SearchRecipes} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
});
