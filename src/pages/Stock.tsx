import { useState,useEffect, memo } from "react";
import {
  Modal,
  Portal,
  Provider,
  Appbar,
  Searchbar,
  Dialog,
  TouchableRipple,
  Button,
} from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db,auth } from "../firebase";

import { AddUpdateStock } from "./AddUpdateStock";
import { EditStock,Ingredient } from "./EditStock";
import styles from "./style/Styles";



export const Stock = memo(() => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Ingredient|null>(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const hideItemDialog = () => setDialogVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const openSearchBar = () => setSearchBarVisible(true);
  const closeSearchBar = () => setSearchBarVisible(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const categories = [
    { label: "カテゴリ1", value: "category1" },
    { label: "カテゴリ2", value: "category2" },
  ];

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

// Stock.tsx 内の fetchIngredients 関数
const fetchIngredients = async () => {
  const q = query(collection(db, "ingredients"), where("userId", "==", auth.currentUser?.uid));
  const querySnapshot = await getDocs(q);
  const items: Ingredient[] = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data() as Ingredient;
    // expiryDateがTimestampの場合、Dateオブジェクトに変換
    if (data.expiryDate && data.expiryDate instanceof Timestamp) {
      data = { ...data, expiryDate: data.expiryDate.toDate() };
    }
    items.push({ ...data, id: doc.id });
  });
  console.log("取得した食材データ:", items); 
  setIngredients(items);
};

useEffect(() => {
  console.log("現在の食材リスト状態:", ingredients); // 状態が更新された後にログを出力
}, [ingredients]); // 依存配列に `ingredients` を指定

useEffect(() => {
  fetchIngredients();
}, []); // 依存配列を空にして、コンポーネントのマウント時にのみ実行

    
      const [editMode, setEditMode] = useState(false); // 編集モードのフラグ

      // 食材をタップしたときの処理（既存の関数を修正）
      const handleIngredientTap = (ingredient: Ingredient) => {
        setSelectedItem(ingredient);
        setDialogVisible(true); // ダイアログを表示
      };
    
      // 食材の編集画面を表示する関数
      const handleEditIngredient = () => {
        setEditMode(true);
        setVisible(true); // 編集モーダルを表示
        setDialogVisible(false); // 詳細ダイアログを非表示
      };
    
  return (
    <Provider>
      <Appbar.Header>
        {isSearchBarVisible ? (
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            autoFocus
            onBlur={closeSearchBar}
            style={styles.stockSearchInput}
          />
        ) : (
          <>
            <Appbar.Action icon="plus" onPress={showModal} />
            <Appbar.Action icon="magnify" onPress={openSearchBar} />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <RNPickerSelect
                onValueChange={(value) => setSelectedCategory(value)}
                items={categories}
                style={pickerSelectStyles}
                placeholder={{ label: "カテゴリを選択...", value: null }}
                value={selectedCategory}
              />
            </View>
          </>
        )}
      </Appbar.Header>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.stockContainer}
        >
          <AddUpdateStock hideModal={hideModal} onAdd={fetchIngredients} />
          <Button onPress={hideModal}>Done</Button>
        </Modal>
        <Dialog visible={dialogVisible} onDismiss={hideItemDialog}>
          <Dialog.Title>{selectedItem?.ingredientName}</Dialog.Title>
          <Dialog.Content>
            <Text>消費期限: {selectedItem?.expiryDate instanceof Date ? selectedItem.expiryDate.toDateString() : selectedItem?.expiryDate}</Text>
            <Text>数量: {selectedItem?.quantity}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleEditIngredient}>編集</Button>
            <Button onPress={hideItemDialog}>閉じる</Button>
          </Dialog.Actions>
        </Dialog>
         <Modal
          visible={editMode && visible}
          onDismiss={() => { setVisible(false); setEditMode(false); }}
          contentContainerStyle={styles.stockContainer}
        >
          {selectedItem && <EditStock ingredient={selectedItem} hideModal={() => { setVisible(false); setEditMode(false); }}onEditComplete={fetchIngredients} />}
        </Modal>
      </Portal>
      <View style={styles.stockContainer}>
        {ingredients.map((ingredient) => (
          <TouchableRipple
            key={ingredient.id}
            onPress={() => handleIngredientTap(ingredient)}
            rippleColor="rgba(0, 0, 0, .32)"
            style={styles.stockRipple}
          >
            <Text style={styles.stockItemText}>{ingredient.ingredientName}</Text>
          </TouchableRipple>
        ))}
      </View>
    </Provider>
  );
});

// react-native-picker-selectのスタイル
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
};

export default Stock;