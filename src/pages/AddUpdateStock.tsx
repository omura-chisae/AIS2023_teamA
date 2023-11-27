import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import AddStock from "./components/addStock";
import ShowDate from "./components/showDate";
import CountButton from "./components/countButton";
import { itemProps } from "./components/addStock";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

const addIngredient = (
  name: string,
  categoryLists: itemProps[],
  date: Date,
  quantity: number
) => {
  const checkedCategories = categoryLists
    .filter((item) => item.checked === true)
    .map(({ id, title }) => ({ id, title })); // checkを付けたカテゴリを取り出す

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
  onAdd: () => void;
};


export const AddUpdateStock: React.FC<addUpdateStockProps> = (props) => {
  const { hideModal, onAdd } = props;

  const handleAddClick = async () => {
    await addIngredient(ingredientName, categoryLists, date, quantity);
    hideModal();
    onAdd(); // 新しい食材が追加された後にリストを更新
  };

  // AddStock
  const [ingredientName, setIngredientName] = useState("");
  const changeIngredientName = (ingredientName: string) => {
    setIngredientName(ingredientName);
  };

  const categories = [
    { id: 1, title: "肉", checked: false },
    { id: 2, title: "野菜", checked: false },
  ];

  const [categoryLists, setCategoryLists] = useState<itemProps[]>(categories);
  const handleCheckboxToggle = (
    itemId: Number,
    categoryLists: Array<itemProps>
  ) => {
    const updatedItems = categoryLists.map((item: itemProps) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setCategoryLists(updatedItems);
  };

  // Date
  const [date, setDate] = useState<Date>(new Date());
  const changeDate = (date: Date) => {
    setDate(date);
  };

  // CountButton
  const [quantity, setQuantity] = useState(0);
  const countUp = () => setQuantity(quantity + 1);
  const countDown = () => quantity >= 1 && setQuantity(quantity - 1);

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
      >
        追加
      </Button>
    </View>
  );
};
