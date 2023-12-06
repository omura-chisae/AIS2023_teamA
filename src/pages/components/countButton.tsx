import { Button } from "react-native-paper";
import React, { useState, memo } from "react";
import { Text, View } from "react-native";

import styles from "../../style/Styles";

type CountButtonProps = {
  quantity: number;
  countUp: () => void;
  countDown: () => void;
};

const countButton: React.FC<CountButtonProps> = memo((props) => {
  const { quantity, countUp, countDown } = props;
  return (
    <View style={styles.countButtonContainer}>
      <Button mode="contained" onPress={countDown}>
        ー
      </Button>
      <Text style={styles.countButtonText}>{quantity}</Text>
      <Button mode="contained" onPress={countUp}>
        ＋
      </Button>
    </View>
  );
});

export default countButton;
