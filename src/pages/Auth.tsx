import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import styles from "../style/Styles";
import { PrimaryButton } from "./components/PrimaryButton";

type RootStackParamList = {
  UserPage: { userId: string };
};

type AuthNavigationProp = StackNavigationProp<RootStackParamList, "UserPage">;

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<AuthNavigationProp>();

  const Login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      // ログイン成功時のページ遷移
      navigation.reset({
        index: 0,
        routes: [
          { name: "UserPage", params: { userId: userCredential.user.uid } },
        ],
      });
    } catch (error) {
      console.error(error);
      // 登録されていないユーザーのログインエラーメッセージ
      Alert.alert("エラー", "エラーが起きました。再実行してください");
      setEmail("");
      setPassword("");
    }
  };

  const Register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      // 新規登録成功時のページ遷移
      navigation.reset({
        index: 0,
        routes: [
          { name: "UserPage", params: { userId: userCredential.user.uid } },
        ],
      });
    } catch (error) {
      console.error(error);
      // すでに登録されているユーザーの新規登録エラーメッセージ
      Alert.alert("エラー", "エラーが起きました。再実行してください");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.authContainer}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.authInput}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={styles.authInput}
      />
      <View style={styles.AuthbuttonContainer}>
        <PrimaryButton onPress={Register}>新規登録</PrimaryButton>
        <PrimaryButton onPress={Login}>ログイン</PrimaryButton>
      </View>
    </View>
  );
};

export default Auth;
