import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import {
  Modal,
  Portal,
  Provider,
  Appbar,
  Searchbar,
  Dialog,
  TouchableRipple,
  Button,
  Switch,
} from "react-native-paper";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from "react-native";
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
import Icon from "react-native-vector-icons/MaterialIcons";

import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddUpdateStock } from "./AddUpdateStock";
import { EditStock, Ingredient } from "./EditStock";
import styles from "../style/Styles";

import { CategoryMenu } from "./CategoryMenu";
import { useCategories } from "./components/useCategories";
import { useUserIngredients } from "./CustomHook/useUserIngredients";
// import themes from "../style/themes";

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
  const [isExtended, setIsExtended] = React.useState(true);

  const [rowHeights, setRowHeights] = useState<{ [key: string]: number }>({});

  const handleLayout = (id: string, event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;
    setRowHeights((prevHeights) => ({ ...prevHeights, [id]: layoutHeight }));
  };

  // カテゴリ編集画面用
  const showCategoryModal = useCallback(() => setCategoryVisible(true), []);
  const hideCategoryModal = useCallback(() => setCategoryVisible(false), []);
  const [categoryVisible, setCategoryVisible] = useState(false);

  // RNPickerSelectでフィルターした食材リストを保存する変数
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
  // ソートした食材リストを保存する変数
  const [sortedIngredients, setSortedIngredients] = useState(ingredients);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

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

    setIsSwiping(false);
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

  useEffect(() => {
    // 選択したカテゴリを含む食材を抽出
    if (selectedCategory) {
      const updatedIngredients = ingredients.filter((ingredient) => {
        return ingredient.categories.some(
          (category) => category.id === selectedCategory
        );
      });
      setFilteredIngredients(updatedIngredients);
      setSortedIngredients(updatedIngredients);
    } else {
      setFilteredIngredients(ingredients);
      setSortedIngredients(ingredients); // sortedIngredientsを参照してリスト表示するため代入しておく
    }
  }, [selectedCategory]);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    // スイッチがオンの時に消費期限順に並び変える
    if (isSwitchOn) {
      const updatedIngredients = Array.from(filteredIngredients);
      updatedIngredients.sort((a, b) => {
        const expiryDateA =
          a.expiryDate instanceof Date ? a.expiryDate.getTime() : 0;
        const expiryDateB =
          b.expiryDate instanceof Date ? b.expiryDate.getTime() : 0;
        return expiryDateA - expiryDateB;
      });
      setSortedIngredients(updatedIngredients);
    } else {
      // スイッチがオフの時は元の順番（filteredIngredients）を代入
      setSortedIngredients(filteredIngredients);
    }
  }, [isSwitchOn]);

  useEffect(() => {
    console.log("選択された食材のカテゴリIDリスト:", selectedItem?.categories);
  }, [selectedItem]);

  return (
    <Provider>
      <Appbar.Header style={{ backgroundColor: "#DDAF56" }}>
        {isSearchBarVisible ? (
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            autoFocus
            onBlur={closeSearchBar}
            style={styles.stockSearchInput}
            // theme={searchBarTheme}
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
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            <Text>消費期限順に並び変え</Text>
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
              {selectedItem?.expiryDate
                ? displayDateInJapanese(selectedItem.expiryDate)
                : "日付なし"}
            </Text>
            <Text>数量: {selectedItem?.quantity}</Text>
            <Text>
              カテゴリー:{" "}
              {selectedItem?.categories
                .map((categoryItem) => {
                  console.log("カテゴリID:", categoryItem.id);
                  const category = fetchedCategories.find(
                    (cat) => cat.id === categoryItem.id
                  );
                  if (!category) {
                    console.error(
                      `カテゴリID ${categoryItem.id} に一致するタイトルが見つかりません。`
                    );
                    return "不明なカテゴリ";
                  }
                  return category.title;
                })
                .join(", ")}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleEditIngredient}>編集</Button>
            <Button onPress={hideItemDialog}>閉じる</Button>
          </Dialog.Actions>
        </Dialog>
        {/* <AnimatedFAB
          icon={"plus"}
          label={"食材の追加"}
          extended={isExtended}
          onPress={() => {
            if (!modalVisible) {
              showAddModal(); // モーダルが表示されていない時のみ機能する
            }
          }}
          visible={!isAddModalVisible && !isEditModalVisible && !dialogVisible} // 常に表示する場合はtrue
          animateFrom={"left"}
          iconMode={"dynamic"}
          style={[fabStyle]}
        /> */}
      </Portal>
      <View style={{ backgroundColor: "#F8F9F9", flex: 1, maxHeight: "100%" }}>
        <SwipeListView
          // onScroll={onScroll}
          style={{ flex: 1, backgroundColor: "#F8F9F9" }}
          data={sortedIngredients}
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
            setIsSwiping(false); // ここをfalseに修正
          }}
          renderItem={(data, rowMap) => (
            <TouchableRipple
              onPress={() => {
                if (!isSwiping) {
                  handleIngredientTap(data.item);
                }
              }}
              onLayout={(event) => handleLayout(data.item.id, event)}
              style={[styles.stockRipple, { backgroundColor: "#F8F9F9" }]}
            >
              <View style={styles.StockListItemContainer}>
                <View style={styles.stockItemContainer}>
                  <Text style={styles.stockItemText}>
                    {data.item.ingredientName}
                  </Text>
                  <Text style={styles.stockItemExpiryDate}>
                    消費期限: {displayDateInJapanese(data.item.expiryDate)}
                  </Text>
                </View>
                <Icon name="chevron-right" size={24} color="gray" />
              </View>
            </TouchableRipple>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View
              style={[styles.rowBack, { height: rowHeights[data.item.id] }]}
            >
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
