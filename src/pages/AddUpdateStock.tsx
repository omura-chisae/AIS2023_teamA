import React, { useState, useEffect, memo, useCallback } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

import AddStock from "./components/addStock";
import ShowDate from "./components/showDate";
import CountButton from "./components/countButton";
import { itemProps } from "./components/addStock";

import { useCategories } from "./components/useCategories";

// Firestoreに食材データを追加
const addIngredient = async (
  name: string,
  categoryLists: itemProps[],
  date: Date,
  quantity: number
) => {
  const checkedCategories = categoryLists
    .filter((item) => item.checked === true) // checkを付けたカテゴリを取り出す
    .map(({ id }) => ({ id })); // checkedとtitleを削除

  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    try {
      await addDoc(collection(db, "ingredients"), {
        userId: userId,
        ingredientName: name,
        categories: checkedCategories,
        expiryDate: date,
        quantity: quantity,
      });
      // 追加が成功したら何かしらの処理
    } catch (error) {
      // エラー処理
      console.error("Error adding ingredient:", error);
    }
  }
};

type addUpdateStockProps = {
  hideModal: () => void;
  onAdd?: () => void;
  addIngredientCategory: itemProps[];
};

export const AddUpdateStock: React.FC<addUpdateStockProps> = memo((props) => {
  const { hideModal, onAdd, addIngredientCategory } = props;
  const [isAdding, setIsAdding] = useState(false);

  // AddStock
  const [ingredientName, setIngredientName] = useState("");
  const changeIngredientName = useCallback((ingredientName: string) => {
    setIngredientName(ingredientName);
  }, []);
  const [categoryLists, setCategoryLists] = useState<itemProps[]>([]);

  useEffect(() => setCategoryLists(addIngredientCategory), []);

  const handleCheckboxToggle = (
    itemId: string,
    categoryLists: Array<itemProps>
  ) => {
    const updatedItems = categoryLists.map((item: itemProps) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setCategoryLists(updatedItems);
  };

  // setDate
  const [date, setDate] = useState<Date>(new Date());
  const changeDate = useCallback((date: Date) => {
    setDate(date);
  }, []);

  // CountButton
  const [quantity, setQuantity] = useState(0);
  const countUp = useCallback(
    () => setQuantity((prevQuantity: number) => prevQuantity + 1),
    []
  );
  const countDown = useCallback(
    () =>
      setQuantity((prevQuantity: number) =>
        prevQuantity >= 1 ? prevQuantity - 1 : 0
      ),
    []
  );

  const handleAddClick = async () => {
    // 追加処理が完了するまでボタンを無効化するための状態

    if (!isAdding) {
      setIsAdding(true);
      await addIngredient(ingredientName, categoryLists, date, quantity);
      setIsAdding(false);
      hideModal();
      if (onAdd) {
        onAdd();
      }
    }
  };

  return (
    <View>
      <AddStock
        changeIngredientName={changeIngredientName}
        handleCheckboxToggle={handleCheckboxToggle}
        categoryLists={categoryLists}
      />
      <ShowDate changeDate={changeDate} date={date} />
      <CountButton
        countUp={countUp}
        countDown={countDown}
        quantity={quantity}
      />
      <Button
        mode="contained"
        onPress={handleAddClick}
        disabled={isAdding} // 追加中はボタンを無効化
      >
        {isAdding ? "追加中..." : "追加"}
      </Button>
    </View>
  );
});
