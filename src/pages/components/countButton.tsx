import { Button } from "react-native-paper";
import { useState } from "react";
import { Text } from "react-native";

const countButton = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button
        mode="contained"
        onPress={() => {
          count >= 1 && setCount(count - 1);
        }}
      >
        ー
      </Button>
      <Text>{count}</Text>
      <Button mode="contained" onPress={() => setCount(count + 1)}>
        ＋
      </Button>
    </>
  );
};

export default countButton;
