import { Button } from "react-native-paper";
import React, { useState, memo } from "react";
import { Text, StyleSheet, View } from "react-native";

type CountButtonProps = {
  quantity: number;
  countUp: () => void;
  countDown: () => void;
};

const countButton: React.FC<CountButtonProps> = memo((props) => {
  const { quantity, countUp, countDown } = props;
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={countDown}>
        ー
      </Button>
      <Text style={styles.Text}>{quantity}</Text>
      <Button mode="contained" onPress={countUp}>
        ＋
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // ボタンの配置を横並びにする
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  Text: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default countButton;
