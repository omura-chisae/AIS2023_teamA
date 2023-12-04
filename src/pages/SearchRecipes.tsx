import React, { useState } from "react";
import { memo } from "react";
import { View } from "react-native";
import { Button, Checkbox, RadioButton, Text } from "react-native-paper";

export const SearchRecipes = memo(() => {
  const initialKinds = [
    { category: "種類", title: "主菜", select: false },
    { title: "主食", select: false },
    { title: "汁物", select: false },
    { title: "副菜", select: false },
    { title: "デザート", select: false },
    { title: "旬", select: false },
  ];

  const initialGenre = [
    { category: "ジャンル", title: "和食", select: false },
    { title: "洋食", select: false },
    { title: "中華", select: false },
    { title: "あっさり", select: false },
    { title: "こってり", select: false },
    { title: "スイーツ", select: false },
  ];

  const initialIngredients = [
    { title: "豚肉", select: false },
    { title: "玉ねぎ", select: false },
    { title: "ひき肉", select: false },
    { title: "キャベツ", select: false },
    { title: "パスタ", select: false },
    { title: "トマト", select: false },
    { title: "ご飯", select: false },
    { title: "しめじ", select: false },
  ];

  const initialTimes = [
    { title: "30分未満", select: false },
    { title: "30分以上", select: false },
  ];

  const [kinds, setKinds] = useState(initialKinds);
  const [genre, setGenre] = useState(initialGenre);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [times, setTimes] = useState(initialTimes);

  const handleCheckboxChange = (index: number, category: string) => {
    const updatedItems = getCategoryItems(category).map((item, i) => ({
      ...item,
      select: i === index ? !item.select : item.select,
    }));

    switch (category) {
      case "食材":
        setIngredients([...updatedItems]);
        break;
      case "時間":
        setTimes([...updatedItems]);
        break;
      default:
        break;
    }
  };

  const handleRadioChange = (index: number, category: string) => {
    const updatedItems = getCategoryItems(category).map((item, i) => ({
      ...item,
      select: i === index,
    }));
    switch (category) {
      case "種類":
        setKinds([...updatedItems]);
        break;
      case "ジャンル":
        setGenre([...updatedItems]);
        break;
      default:
        break;
    }
  };

  const getCategoryItems = (category: string) => {
    switch (category) {
      case "種類":
        return kinds;
      case "ジャンル":
        return genre;
      case "食材":
        return ingredients;
      case "時間":
        return times;
      default:
        return [];
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>種類</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {kinds.map((item, index) => (
          <View key={index}>
            <RadioButton.Item
              label={item.title}
              status={item.select ? "checked" : "unchecked"}
              onPress={() => handleRadioChange(index, "種類")}
              value={item.title}
            />
          </View>
        ))}
      </View>

      <Text>ジャンル</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {genre.map((item, index) => (
          <View key={index}>
            <RadioButton.Item
              label={item.title}
              status={item.select ? "checked" : "unchecked"}
              onPress={() => handleRadioChange(index, "ジャンル")}
              value={item.title}
            />
          </View>
        ))}
      </View>
      <Text>食材</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {ingredients.map((item, index) => (
          <View key={index}>
            <Checkbox.Item
              label={item.title}
              status={item.select ? "checked" : "unchecked"}
              onPress={() => handleCheckboxChange(index, "食材")}
            />
          </View>
        ))}
      </View>

      <Text>時間</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {times.map((item, index) => (
          <View key={index}>
            <Checkbox.Item
              label={item.title}
              status={item.select ? "checked" : "unchecked"}
              onPress={() => handleCheckboxChange(index, "時間")}
            />
          </View>
        ))}
      </View>

      <Button mode="contained">提案</Button>
    </View>
  );
});

