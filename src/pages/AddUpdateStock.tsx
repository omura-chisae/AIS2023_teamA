import { useState, useEffect, memo, useCallback } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import AddStock from "./components/addStock";
import ShowDate from "./components/showDate";
import CountButton from "./components/countButton";
import { itemProps } from "./components/addStock";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useCategories } from "./components/useCategories";

// Firestoreに食材データを追加
const addIngredient = (
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

    addDoc(collection(db, "ingredients"), {
      userId: userId,
      ingredientName: name,
      categories: checkedCategories,
      expiryDate: date,
      quantity: quantity,
    });
  }
};

type addUpdateStockProps = {
  hideModal: () => void;
  addIngredientCategory: itemProps[];
  onAdd: () => void;
};

export const AddUpdateStock: React.FC<addUpdateStockProps> = memo((props) => {
  const { hideModal, addIngredientCategory, onAdd } = props;

  // const categories = [
  //   { id: "1", title: "肉", checked: false },
  //   { id: "2", title: "野菜", checked: false },
  // ];

  const handleAddClick = async () => {
    await addIngredient(ingredientName, categoryLists, date, quantity);
    hideModal();
    onAdd(); // 新しい食材が追加された後にリストを更新
  };

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
    () => setQuantity((prevQuantity) => prevQuantity + 1),
    []
  );
  const countDown = useCallback(
    () =>
      setQuantity((prevQuantity) => (prevQuantity >= 1 ? prevQuantity - 1 : 0)),
    []
  );

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
        onPress={() => {
          addIngredient(ingredientName, categoryLists, date, quantity);
          hideModal();
        }}
      >
        追加
      </Button>
    </View>
  );
});
