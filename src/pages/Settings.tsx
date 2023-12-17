import React, { memo, useState, useEffect } from "react";
import { View } from "react-native";
import { PrimaryButton } from "./components/PrimaryButton";

export const Settings = memo(() => {
  const handleLogoutPress = () => {
    // ログアウト処理
  };

  const handleToggleNotificationOnPress = () => {
    // 消費期限通知 ON 処理
  };

  const handleToggleNotificationOffPress = () => {
    // 消費期限通知 OFF 処理
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
        backgroundColor: "#F8F9F9",
      }}
    >
      <PrimaryButton onPress={handleLogoutPress}>ログアウト</PrimaryButton>
      <PrimaryButton onPress={handleToggleNotificationOnPress}>
        消費期限通知　ON
      </PrimaryButton>
      <PrimaryButton onPress={handleToggleNotificationOffPress}>
        消費期限通知　OFF
      </PrimaryButton>
    </View>
  );
});
