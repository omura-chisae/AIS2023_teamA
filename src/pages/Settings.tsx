import { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export const Settings = memo(() => {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
        backgroundColor: "#F8F9F9",
      }}
    >
      <View>
        <Text>ヘッダー</Text>
      </View>
      <Button mode="contained">ログアウト</Button>
      <Button mode="contained">消費期限通知　ON</Button>
      <Button mode="contained">消費期限通知　OFF</Button>
    </View>
  );
});
