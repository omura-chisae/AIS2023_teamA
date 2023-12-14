import React, { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { PrimaryButton } from "./components/PrimaryButton";

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
        
      </View>
      <PrimaryButton>ログアウト</PrimaryButton>
      <PrimaryButton>消費期限通知　ON</PrimaryButton>
      <PrimaryButton>消費期限通知　OFF</PrimaryButton>
    </View>
  );
});
