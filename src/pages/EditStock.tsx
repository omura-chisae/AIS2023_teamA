import React, { useState } from "react";
import { View, Button } from "react-native";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

import AddStock from "./components/addStock"; // チェックボックスとテキスト入力用
import ShowDate from "./components/showDate"; // 日付選択用
import CountButton from "./components/countButton"; // 数量選択用
import { itemProps } from "./components/addStock"; // itemProps 型定義

export type Ingredient = {
  ingredientName: string;
  categories: itemProps[];
  expiryDate: Date;
  quantity: number;
  id: string;
};

type EditStockProps = {
  ingredient: Ingredient;
  hideModal: () => void;
  addIngredientCategory: { id: string; title: string; checked: boolean }[];
  onEditComplete: () => Promise<void>;
};

export const EditStock: React.FC<EditStockProps> = ({
  ingredient,
  hideModal,
  onEditComplete,
}) => {
  const [ingredientName, setIngredientName] = useState(
    ingredient.ingredientName
  );
  const [categoryLists, setCategoryLists] = useState<itemProps[]>(
    ingredient.categories
  );
  const [date, setDate] = useState<Date>(ingredient.expiryDate);
  const [quantity, setQuantity] = useState(ingredient.quantity);

  const handleUpdateIngredient = async () => {
    // Firestoreで既存の食材を更新
    const ingredientRef = doc(db, "ingredients", ingredient.id);
    try {
      await updateDoc(ingredientRef, {
        ingredientName,
        categories: categoryLists,
        expiryDate: date,
        quantity,
      });
      hideModal(); // 成功時にモーダルを閉じる
      onEditComplete(); // 編集が完了したらコールバックを呼び出す
    } catch (error) {
      console.error("Error updating ingredient: ", error);
      // エラーハンドリングをここで行う
    }
  };

  return (
    <View>
      <AddStock
        changeIngredientName={setIngredientName}
        handleCheckboxToggle={(itemId) => {
          const updatedItems = categoryLists.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          );
          setCategoryLists(updatedItems);
        }}
        categoryLists={categoryLists}
      />
      <ShowDate changeDate={setDate} date={date} />
      <CountButton
        countUp={() => setQuantity(quantity + 1)}
        countDown={() => quantity >= 1 && setQuantity(quantity - 1)}
        quantity={quantity}
      />
      <Button title="更新" onPress={handleUpdateIngredient} />
    </View>
  );
};
