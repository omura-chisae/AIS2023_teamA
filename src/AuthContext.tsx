import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

import Auth from "./pages/Auth";
import { AdminPage } from "./pages/AdminPage";
import { UserPage } from "./pages/UserPage";
import { Recipe } from "./pages/Recipe";

type AuthContextProps = {
  user: User | null;
};

const AuthContext: React.FC<AuthContextProps> = ({ user }) => {
  const Stack = createStackNavigator();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfUserIsAdmin = async (uid: string) => {
    const adminRef = doc(db, "admins", uid);
    const adminSnap = await getDoc(adminRef);
    return adminSnap.exists();
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const isUserAdmin = await checkIfUserIsAdmin(user.uid);
        setIsAdmin(isUserAdmin);
      })();
    }
  }, [user]);

  return (
      <Stack.Navigator initialRouteName={isAdmin ? "Admin" : user ? "UserPage" : "Auth"}>
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="UserPage" component={UserPage} options={{ headerLeft: () => null,headerShown: false }} />
        <Stack.Screen name="Admin" component={AdminPage} options={{ headerShown: false }} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
  );
};

export default AuthContext;
