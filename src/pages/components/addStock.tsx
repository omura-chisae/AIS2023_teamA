import React, { useState } from "react";
import { List, Checkbox, TextInput } from "react-native-paper";

type addStockProps = {
  changeIngredientName: (ingredientName: string) => void;
  handleCheckboxToggle: (itemId: Number, items: Array<itemProps>) => void;
  categoryLists: Array<itemProps>;
};

export type itemProps = { id: number; title: string; checked: boolean };

const addStock: React.FC<addStockProps> = (props) => {
  const { changeIngredientName, handleCheckboxToggle, categoryLists } = props;

  return (
    <>
      <TextInput
        onChangeText={changeIngredientName}
        placeholder="食材名を入力"
      />

      <List.Section>
        <List.Accordion
          title="カテゴリを選択"
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          {categoryLists.map((item: itemProps) => (
            <List.Item
              key={item.id}
              title={item.title}
              right={() => (
                <Checkbox
                  status={item.checked ? "checked" : "unchecked"}
                  onPress={() => handleCheckboxToggle(item.id, categoryLists)}
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