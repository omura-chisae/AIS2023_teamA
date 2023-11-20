import { View, Text } from "react-native";

import { Appbar, TouchableRipple } from "react-native-paper";

const categories = [
  { id: 1, title: "肉" },
  { id: 2, title: "野菜" },
];

export const CategoryMenu = () => {
  // ここにカテゴリを取得するコードを書く
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="カテゴリ一覧" />
      </Appbar.Header>
      <View>
        {categories.map((item) => (
          <TouchableRipple key={item.id} rippleColor="rgba(0, 0, 0, .32)">
            <Text>{item.title}</Text>
          </TouchableRipple>
        ))}
      </View>
    </>
  );
};
