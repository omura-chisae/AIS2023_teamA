import React, { memo } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
type Props = {
  children: React.ReactNode;
  onPress: () => void;
};
export const PrimaryButton: React.FC<Props> = memo((props) => {
  const { children, onPress } = props;
  return (
    <View
      style={{
        width: "fitContent(200)",
        alignSelf: "center",
        marginBottom: 10,
      }}
    >
      <Button mode="contained" buttonColor="#DDAF56" onPress={onPress}>
        {children}
      </Button>
    </View>
  );
});
