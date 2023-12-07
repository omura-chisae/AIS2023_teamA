import React, { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { auth } from "./src/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";

import AuthContext from "./src/AuthContext";
import theme from "./src/style/theme";

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
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthContext user={user} />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
