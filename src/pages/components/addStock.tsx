import React, { useState } from "react";
import { List, Checkbox, TextInput } from "react-native-paper";

const addStock = () => {
  const initialItems = [
    { id: 1, title: "肉", checked: false },
    { id: 2, title: "野菜", checked: false },
  ];

  const [items, setItems] = useState(initialItems);

  const handleCheckboxToggle = (itemId: Number) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  // Inputの処理
  const [text, setText] = useState("");

  const changeText = (newText: string) => {
    setText(newText);
  };
  // Inputの処理ここまで

  return (
    <>
      <TextInput onChangeText={changeText} placeholder="食材名を入力" />

      <List.Section>
        <List.Accordion
          title="カテゴリを選択"
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          {items.map((item) => (
            <List.Item
              key={item.id}
              title={item.title}
              right={() => (
                <Checkbox
                  status={item.checked ? "checked" : "unchecked"}
                  onPress={() => handleCheckboxToggle(item.id)}
                />
              )}
            />
          ))}
        </List.Accordion>
      </List.Section>
    </>
  );
};

export default addStock;
