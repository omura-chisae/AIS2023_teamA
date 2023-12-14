import React, { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { auth } from "./src/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";

import AuthContext from "./src/AuthContext";
import { themes } from "./src/style/themes";
import { RecipeInfoProvider } from "./src/RecipeInfoProvider";

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
    <PaperProvider theme={themes}>
      <RecipeInfoProvider>
        <NavigationContainer>
          <AuthContext user={user} />
        </NavigationContainer>
      </RecipeInfoProvider>
    </PaperProvider>
  );
}

export default App;
