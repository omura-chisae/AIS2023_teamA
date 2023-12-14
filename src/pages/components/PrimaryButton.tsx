import React, { memo } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
type Props = {
  children: React.ReactNode;
  onClick: () => void;
};
export const PrimaryButton: React.FC<Props> = memo((props) => {
  const { children, onClick } = props;
  return (
    <View style={{ width: 200, alignSelf: 'center', marginBottom: 10 }}>
    <Button mode="contained" buttonColor="#DDAF56" onPress={onClick}>
      {children}
    </Button>
    </View>
  );
}); 