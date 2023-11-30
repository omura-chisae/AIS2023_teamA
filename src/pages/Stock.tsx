import { useState, memo, useCallback } from "react";
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
import { View, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { collection, query, where, getDocs, Timestamp, doc, deleteDoc } from 'firebase/firestore';
import { db,auth } from "../firebase";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AddUpdateStock } from "./AddUpdateStock";
import { CategoryMenu } from "./CategoryMenu";
import { useCategories } from "./components/useCategories";

export const Stock = memo(() => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Ingredient|null>(null);
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  const hideItemDialog = () => setDialogVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const openSearchBar = () => setSearchBarVisible(true);
  const closeSearchBar = () => setSearchBarVisible(false);

  // カテゴリ編集画面用
  const showCategoryModal = useCallback(() => setCategoryVisible(true), []);
  const hideCategoryModal = useCallback(() => setCategoryVisible(false), []);
  const [categoryVisible, setCategoryVisible] = useState(false);

  // const categories = [
  //   { label: "カテゴリ1", value: "category1" },
  //   { label: "カテゴリ2", value: "category2" },
  // ];

  // カテゴリを取得
  const fetchedCategories = useCategories();
  // プロパティ名を変換
  const categories = fetchedCategories.map(({ id, title }) => ({
    value: id,
    label: title,
  }));
  // AddUpdateStackコンポーネント用にカテゴリにcheckedを付ける
  const addIngredientCategory = fetchedCategories.map((category) => ({
    id: category.id,
    title: category.title,
    checked: false,
  }));

  const foodItems = ["たまねぎ", "にんじん", "ネギ"]; // 食品リスト

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
            <Appbar.Action icon="plus" onPress={showAddModal} />
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
            <Appbar.Action icon="pencil" onPress={showCategoryModal} />
          </>
        )}
      </Appbar.Header>

      <Portal>
        {/* カテゴリ編集画面 */}
        <Modal
          visible={categoryVisible}
          onDismiss={hideCategoryModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Button onPress={hideCategoryModal}>閉じる</Button>
          <CategoryMenu />
        </Modal>

        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <AddUpdateStock
            hideModal={hideModal}
            addIngredientCategory={addIngredientCategory}
          />
          <Button onPress={hideModal}>Done</Button>
       
>>>>>>> master
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
      </Portal>
      <View style={styles.stockContainer}>
  <SwipeListView
    data={ingredients}
    onRowOpen={() => {
      setIsSwiping(true);
    }}
    onRowClose={() => {
      setIsSwiping(false);
    }}
    swipeGestureBegan={() => {
      setIsSwiping(true);
    }}
    swipeGestureEnded={() => {
      setIsSwiping(true);
    }}
    
    renderItem={(data, rowMap) => (
      <TouchableRipple
      onPress={() => {
        if (!isSwiping) {
          handleIngredientTap(data.item);
        }
      }}
        style={styles.stockRipple}
      >
        <View>
          <Text style={styles.stockItemText}>{data.item.ingredientName}</Text>
        </View>
      </TouchableRipple>
    )}
    
    renderHiddenItem={(data, rowMap) => (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteIngredient(data.item.id)}
        >
          <Text style={styles.deleteButtonText}>削除</Text>
        </TouchableOpacity>
      </View>
    )}
    leftOpenValue={0} 
    rightOpenValue={-75} 
    disableRightSwipe
  />
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