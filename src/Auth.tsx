import React, { useState } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Button,
  TextInput,
} from 'react-native-paper';

import AuthForm from "./Auth/AuthForm";
import AuthButton from "./Auth/AuthButton";
import AuthIcon from "./Auth/AuthIcon";
import SwitchAuthMode from "./Auth/SwitchAuthMode";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  // ... その他の関数と状態

  return (
    <PaperProvider theme={DefaultTheme}>
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={isLogin ? Login : Register}
          style={styles.button}
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <Button onPress={() => setIsLogin((prev) => !prev)}>
          Switch to {isLogin ? 'Register' : 'Login'}
        </Button>
      </View>
    </PaperProvider>
  );
};

export default Auth;
