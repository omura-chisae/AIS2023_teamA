import React, { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { auth } from "./src/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthContext from "./src/AuthContext";
import { BottomTab } from "./src/pages/BottomTab";


type UserType = User | null;

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const authStateChanged = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      authStateChanged();
    };
  }, []);

  return (
    <NavigationContainer>
      <AuthContext user={user} />
    </NavigationContainer>
  );
}

export default App;