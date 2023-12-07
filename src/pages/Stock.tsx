import { useState, useEffect, memo, useCallback } from "react";
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

import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddUpdateStock } from "./AddUpdateStock";
import { EditStock, Ingredient } from "./EditStock";
import styles from "./style/Styles";
import { CategoryMenu } from "./CategoryMenu";
import { useCategories } from "./components/useCategories";
import { useUserIngredients } from "./CustomHook/useUserIngredients";

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

export const Stock = memo(() => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Ingredient | null>(null);
  const hideItemDialog = () => setDialogVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const openSearchBar = () => setSearchBarVisible(true);
  const closeSearchBar = () => setSearchBarVisible(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const ingredients = useUserIngredients();

  // カテゴリ編集画面用
  const showCategoryModal = useCallback(() => setCategoryVisible(true), []);
  const hideCategoryModal = useCallback(() => setCategoryVisible(false), []);
  const [categoryVisible, setCategoryVisible] = useState(false);

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

  const showAddModal = () => setIsAddModalVisible(true);
  const hideAddModal = () => setIsAddModalVisible(false);
  const showEditModal = () => setIsEditModalVisible(true);
  const hideEditModal = () => setIsEditModalVisible(false);

  const handleDeleteIngredient = async (ingredientId: string) => {
    // Firestoreから該当のingredientを削除
    const ingredientRef = doc(db, "ingredients", ingredientId);
    await deleteDoc(ingredientRef);
    // リストを更新
  };

  useEffect(() => {
    console.log("現在の食材リスト状態:", ingredients); // 状態が更新された後にログを出力
  }, [ingredients]); // 依存配列に `ingredients` を指定

  const [editMode, setEditMode] = useState(false); // 編集モードのフラグ
  // 食材をタップしたときの処理（既存の関数を修正）
  const handleIngredientTap = (ingredient: Ingredient) => {
    if (!isSwiping) {
      setSelectedItem(ingredient);
      setDialogVisible(true); // ダイアログを表示
    }
  };

  // 食材の編集画面を表示する関数
  const handleEditIngredient = () => {
    setEditMode(true);
    showEditModal(); // 編集モーダルを表示
    hideItemDialog(); // 詳細ダイアログを非表示
  };

  // 日付を日本語形式で表示する関数
  const displayDateInJapanese = (date: Date) => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月は0から始まるため、1を加える
      const day = date.getDate();
      const weekDay = weekDays[date.getDay()]; // 曜日を取得

      // 日本語の日付形式（例：2023年1月1日（日））で返す
      return `${year}年${month}月${day}日（${weekDay}）`;
    } else {
      return date;
    }
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
        {/* 追加用モーダル */}
        <Modal
          visible={isAddModalVisible}
          onDismiss={hideAddModal}
          contentContainerStyle={styles.stockContainer}
        >
          <AddUpdateStock
            hideModal={hideAddModal}
            addIngredientCategory={addIngredientCategory}
          />
        </Modal>

        {/* カテゴリ編集画面 */}
        <Modal
          visible={categoryVisible}
          onDismiss={hideCategoryModal}
          contentContainerStyle={styles.stockContainer}
        >
          <Button onPress={hideCategoryModal}>閉じる</Button>
          <CategoryMenu />
        </Modal>

        {/* 編集用モーダル */}
        <Modal
          visible={isEditModalVisible}
          onDismiss={hideEditModal}
          contentContainerStyle={styles.stockContainer}
        >
          {selectedItem && (
            <EditStock
              ingredient={selectedItem}
              hideModal={hideEditModal}
              addIngredientCategory={addIngredientCategory}
            />
          )}
        </Modal>

        <Dialog visible={dialogVisible} onDismiss={hideItemDialog}>
          <Dialog.Title>{selectedItem?.ingredientName}</Dialog.Title>
          <Dialog.Content>
            <Text>
              消費期限:{" "}
              {selectedItem?.expiryDate instanceof Date
                ? selectedItem.expiryDate.toDateString()
                : selectedItem?.expiryDate}
            </Text>

            <Text>数量: {selectedItem?.quantity}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleEditIngredient}>編集</Button>
            <Button onPress={hideItemDialog}>閉じる</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
        <SwipeListView
          style={{ flex: 1 }}
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
                <Text style={styles.stockItemText}>
                  {data.item.ingredientName}
                </Text>
                <Text style={styles.stockItemExpiryDate}>
                  消費期限: {displayDateInJapanese(data.item.expiryDate)}
                </Text>
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
