import { Button } from "react-native-paper";
import React, { useState, memo } from "react";
import { Text, View } from "react-native";

import styles from "../../style/Styles";
import { PrimaryButton } from "./PrimaryButton";

type CountButtonProps = {
  quantity: number;
  countUp: () => void;
  countDown: () => void;
};

const countButton: React.FC<CountButtonProps> = memo((props) => {
  const { quantity, countUp, countDown } = props;
  return (
    <View style={styles.countButtonContainer}>
      <PrimaryButton onPress={countDown}>
        ー
      </PrimaryButton>
      <Text style={styles.countButtonText}>{quantity}</Text>
      <PrimaryButton onPress={countUp}>
        ＋
      </PrimaryButton>
    </View>
  );
});

export default countButton;
