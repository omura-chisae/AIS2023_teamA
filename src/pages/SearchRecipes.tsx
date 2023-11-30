import React from "react";
import { memo } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export const SearchRecipes = memo(() => {
  const buttons = [
    [
      { category: "種類", title: "主菜", select: "false" },
      { title: "主食", select: false },
      { title: "汁物", select: false },
      { title: "副菜", select: false },
      { title: "デザート", select: false },
      { title: "旬", select: false },
    ],
    [
      { category: "作りたいジャンル", title: "和食", select: "false" },
      { title: "洋食", select: "false" },
      { title: "中華", select: "false" },
      { title: "あっさり", select: "false" },
      { title: "こってり", select: "false" },
      { title: "スイーツ", select: "false" },
    ],
    [
      { category: "使いたい食材", title: "豚肉", select: "false" },
      { title: "玉ねぎ", select: "false" },
      { title: "ひき肉", select: "false" },
      { title: "キャベツ", select: "false" },
      { title: "パスタ", select: "false" },
      { title: "トマト", select: "false" },
      { title: "ご飯", select: "false" },
      { title: "しめじ", select: "false" },
    ],
    [
      { category: "調理時間", title: "15分以下", select: "false" },
      { title: "15~30分", select: "false" },
      { title: "30分以上", select: "false" },
    ],
  ];

  const kinds = [
    { category: "種類", title: "主菜", select: "false" },
    { title: "主食", select: false },
    { title: "汁物", select: false },
    { title: "副菜", select: false },
    { title: "デザート", select: false },
    { title: "旬", select: false },
  ];
  return (
    <View style={{ flex: 1 }}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex}>
          <Text>{row[0].category}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {row.map((button, buttonIndex) => (
              <Button key={buttonIndex} style={{ flex: 1, margin: 2 }}>
                {button.title}
              </Button>
            ))}
          </View>
        </View>
      ))}
      <Button mode="contained">提案</Button>
    </View>
  );
});
