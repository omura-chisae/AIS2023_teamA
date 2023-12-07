import { useState, useEffect } from "react";
import { memo } from "react";
import { Alert, View } from "react-native";
import { Button, Checkbox, RadioButton, Text } from "react-native-paper";

import { useUserIngredients } from "./CustomHook/useUserIngredients";

export const SearchRecipes = memo(() => {
  const userIngredients = useUserIngredients();

  useEffect(() => {
    setIngredients(
      userIngredients.map((ingredient) => ({
        title: ingredient.ingredientName,
        select: false,
      }))
    );
  }, [userIngredients]); // userIngredients が変更されたときに実行

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

  // Firestoreから取得した食材名で初期化
  const initialIngredients = userIngredients.map((ingredient) => ({
    title: ingredient.ingredientName,
    select: false,
  }));

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
    const items = getCategoryItems(category);
    const isAlreadySelected = items[index].select;

    const updatedItems = getCategoryItems(category).map((item, i) => ({
      ...item,
      select: i === index ? !isAlreadySelected : false,
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

  const showIngredients = () => {
    const selectedKinds = kinds.find((item) => item.select)?.title;
    const selectedGenre = genre.find((item) => item.select)?.title;
    const selectedIngredients = ingredients.filter((item) => item.select);
    const selectedTimes = times.filter((item) => item.select);

    const displayIngredients = selectedIngredients.map((ingredient) => {
      const found = userIngredients.find(
        (ui) => ui.ingredientName === ingredient.title
      );
      return found
        ? `${ingredient.title} (${found.quantity})`
        : ingredient.title;
    });

    const timeText =
      selectedTimes.length === 2
        ? "時間の制限なし"
        : selectedTimes.map((t) => t.title).join(", ");

    const message = `種類: ${selectedKinds}, ジャンル: ${selectedGenre}, 食材: ${displayIngredients.join(
      ", "
    )}, 時間: ${timeText}`;
    alert(message);
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
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
      >
        {ingredients.map((item, index) => (
          <View key={index} style={{ margin: 4 }}>
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
      <br />
      <Button mode="contained" onPress={showIngredients}>
        提案するための情報
      </Button>
    </View>
  );
});
