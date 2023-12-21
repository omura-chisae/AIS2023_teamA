import React, {
  useState,
  useEffect,
  memo,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Modal,
  Portal,
  Provider,
  Appbar,
  Searchbar,
  Dialog,
  TouchableRipple,
  Button,
  FAB,
  AnimatedFAB as NativeAnimatedFAB,
} from "react-native-paper";
import {
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
  Animated,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu, IconButton } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddUpdateStock } from "./AddUpdateStock";
import { EditStock, Ingredient } from "./EditStock";
import styles from "../style/Styles";

import { CategoryMenu } from "./CategoryMenu";
import { useCategories } from "./components/useCategories";
import { useUserIngredients } from "./CustomHook/useUserIngredients";
import { themes } from "../style/themes";
import { PrimaryButton } from "./components/PrimaryButton";
import { useFabContext } from "../FabContext";

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
const CustomAnimatedFAB = Animated.createAnimatedComponent(FAB);

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
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortMode, setSortMode] = useState("");
  // const { setIsFabDisabled } = useFabContext();

  const [rowHeights, setRowHeights] = useState<{ [key: string]: number }>({});

  const handleLayout = (id: string, event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;
    setRowHeights((prevHeights) => ({ ...prevHeights, [id]: layoutHeight }));
  };

  // カテゴリ編集画面用
  // const showCategoryModal = useCallback(() => setCategoryVisible(true), []);
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

    setIsSwiping(false);
  };

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
  const filteredAndSortedIngredients = useMemo(() => {
    // カテゴリと検索クエリでフィルタリング
    let result = ingredients.filter((ingredient) => {
      const matchesCategory = selectedCategory
        ? ingredient.categories.some(
            (category) => category.id === selectedCategory
          )
        : true;
      const matchesSearchQuery = searchQuery
        ? ingredient.ingredientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;

      return matchesCategory && matchesSearchQuery;
    });

    // ソートモードに基づいてソート
    switch (sortMode) {
      case "alphabetical":
        result.sort((a, b) =>
          a.ingredientName.localeCompare(b.ingredientName, "ja")
        );
        break;
      case "expiryDate":
        result.sort(
          (a, b) =>
            (a.expiryDate?.getTime() || 0) - (b.expiryDate?.getTime() || 0)
        );
        break;
      case "none":
        // ニュートラル状態の場合はソートを適用しない
        break;
      default:
        // 他のソート基準が必要な場合はここに追加
        break;
    }

    return result;
  }, [ingredients, selectedCategory, searchQuery, sortMode]);

  // AnimatedFABのサイズを調整
  const [modalVisible, setModalVisible] = useState(false);

  const showCategoryModal = useCallback(() => {
    setCategoryVisible(true);
    setModalVisible(true); // モーダル表示状態を更新
  }, []);

  const searchBarTheme = {
    ...themes, // 既存のテーマを展開
    colors: {
      ...themes.colors, // 既存の色を展開
      primary: "#F7DC6F", // 検索バーに適用する新しい色
    },
  };

  const [isExtended, setIsExtended] = useState(true);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;
    setIsExtended(currentScrollPosition <= 0); // スクロール位置に基づいて状態を設定
  };

  const renderFAB = () => {
    if (Platform.OS === "web") {
      const animatedWidth = useState(new Animated.Value(200))[0];
      const [currentWidth, setCurrentWidth] = useState(200);
      const fabDisabledStyle = isFABDisabled ? { backgroundColor: "grey" } : {};

      const onPressHandler = () => {
        if (!isFABDisabled) {
          handleFABPress();
        }
      };
      useEffect(() => {
        Animated.timing(animatedWidth, {
          toValue: isExtended ? 200 : 56,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }, [isExtended]);

      useEffect(() => {
        const listener = animatedWidth.addListener(({ value }) => {
          setCurrentWidth(value);
        });

        return () => {
          animatedWidth.removeListener(listener);
        };
      }, []);

      const fabStyle = {
        position: "absolute",
        right: 16,
        bottom: 16,
        justifyContent: "center",
        alignItems: "center",
        width: animatedWidth,
        height: 56,
        borderRadius: isExtended ? 48 : 56 / 2,
        backgroundColor: isFABDisabled ? "lightgrey" : "#DDAF56",
      };

      return (
        <Pressable
          onPress={onPressHandler}
          style={({ pressed }) => [
            {
              position: "absolute",
              right: 16,
              bottom: 16,
              width: animatedWidth, // Animated.Valueによる動的な幅
              height: 96, // FABの高さ
              borderRadius: isExtended ? 48 : 96 / 2,
              opacity: pressed ? 0.5 : 1, // オプショナル: タッチ時の透明度変更
            },
            fabDisabledStyle,
          ]}
        >
          <CustomAnimatedFAB
            icon="plus"
            style={fabStyle}
            color="white"
            size="medium"
            label={currentWidth > 150 ? "食材の追加" : undefined}
          />
        </Pressable>
      );
    } else {
      // iOSまたはAndroidの場合の通常のFAB
      return (
        <NativeAnimatedFAB
          icon="plus"
          onPress={showAddModal}
          extended={isExtended}
          label={"食材の追加"}
          style={{
            position: "absolute",
            right: 16,
            bottom: 16,
            backgroundColor: "#DDAF56",
          }}
          color="white"
          rippleColor="#F7DC6F"
          disabled={isFABDisabled}
        />
      );
    }
  };

  const isFABDisabled =
    isAddModalVisible || isEditModalVisible || dialogVisible || categoryVisible;

  const handleFABPress = () => {
    if (!isFABDisabled) {
      showAddModal();
    }
    // FABがdisabledの場合、何もしない
  };

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
            theme={searchBarTheme}
          />
        ) : (
          <>
            {/* <Appbar.Action icon="plus" onPress={showAddModal} /> */}
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
            <Menu
              visible={sortMenuVisible}
              onDismiss={() => setSortMenuVisible(false)}
              theme={searchBarTheme}
              anchor={
                <IconButton
                  icon={() => <FontAwesome name="unsorted" size={24} />}
                  onPress={() => setSortMenuVisible(true)}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  setSortMode("none"); // ニュートラル状態を示す値に設定
                  setSortMenuVisible(false);
                }}
                title="ソート解除"
              />
              <Menu.Item
                onPress={() => {
                  setSortMode("alphabetical");
                  setSortMenuVisible(false);
                }}
                title="五十音順"
                leadingIcon="sort-alphabetical-ascending"
              />
              <Menu.Item
                onPress={() => {
                  setSortMode("expiryDate");
                  setSortMenuVisible(false);
                }}
                title="消費期限順"
                leadingIcon="sort-calendar-ascending"
              />
            </Menu>
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

        <Dialog
          visible={dialogVisible}
          onDismiss={hideItemDialog}
          style={{ backgroundColor: "white" }}
        >
          <Dialog.Title style={{ fontSize: 30 }}>
            {selectedItem?.ingredientName}
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{ fontSize: 20 }}>
              消費期限:{" "}
              {selectedItem?.expiryDate
                ? displayDateInJapanese(selectedItem.expiryDate)
                : "日付なし"}
            </Text>
            <Text style={{ fontSize: 20 }}>数量: {selectedItem?.quantity}</Text>
            <Text style={{ fontSize: 20 }}>
              カテゴリー:{" "}
              {selectedItem?.categories
                .map((categoryItem) => {
                  const category = fetchedCategories.find(
                    (cat) => cat.id === categoryItem.id
                  );
                  return category ? category.title : undefined;
                })
                .filter(Boolean) // これによって、undefined を取り除くことができます。
                .join(", ")}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleEditIngredient}>編集</Button>
            <Button onPress={hideItemDialog}>閉じる</Button>
          </Dialog.Actions>
        </Dialog>
        {renderFAB()}
      </Portal>
      <View style={{ backgroundColor: "#F8F9F9", flex: 1, maxHeight: "100%" }}>
        <SwipeListView
          onScroll={onScroll}
          style={{ flex: 1, backgroundColor: "#F8F9F9" }}
          data={filteredAndSortedIngredients}
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
            setIsSwiping(false);
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
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
};

export default Stock;
