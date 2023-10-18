import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
  UserPage :{ userId: string };
};

type AuthNavigationProp = StackNavigationProp<RootStackParamList, 'UserPage'>;

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<AuthNavigationProp>();


  const Login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      // ログイン成功時のページ遷移
      navigation.navigate('UserPage', { userId: userCredential.user.uid });
    } catch (error) {
      console.error(error);
      // 登録されていないユーザーのログインエラーメッセージ
      Alert.alert('エラー', '登録されていないユーザーです。');
      setEmail('');
      setPassword('');
    }
  };

  const Register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      // 新規登録成功時のページ遷移
      navigation.navigate('UserPage', { userId: userCredential.user.uid });
    } catch (error) {
      console.error(error);
      // すでに登録されているユーザーの新規登録エラーメッセージ
      Alert.alert('エラー', 'このメールアドレスはすでに登録されています。');
      setEmail('');
      setPassword('');
    }
  };

  return (
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
      onPress={Register} style={styles.button}> 
        新規登録
      </Button>
      <Button 
      mode="contained" 
      onPress={Login} 
style={styles.button}>
        ログイン
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 5,
  },
});

export default Auth;
