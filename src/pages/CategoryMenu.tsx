import React, { useState, memo, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  List,
  Appbar,
  Dialog,
  Button,
  TextInput,
  Portal,
} from "react-native-paper";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db, auth } from "../firebase";

import { useCategories } from "./components/useCategories";

export type categoriesType = {
  id: string;
  title: string;
};

// const categories = [
//   { id: "1", title: "肉" },
//   { id: "2", title: "野菜" },
// ];

export const CategoryMenu = memo(() => {
  // カテゴリ取得
  const categories = useCategories();

  // カテゴリ削除用
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<categoriesType | null>(null);
  const showDialog = (category: categoriesType) => {
    setSelectedCategory(category);
    setVisible(true);
  };
  const hideDialog = useCallback(() => setVisible(false), []);

  // カテゴリ名変更用
  const [renameVisible, setRenameVisible] = useState(false);
  const showRenameDialog = (category: categoriesType) => {
    setSelectedCategory(category);
    setRenameVisible(true);
  };
  const hideRenameDialog = () => setRenameVisible(false);

  // カテゴリ追加用
  const [addVisible, setAddVisible] = useState(false);
  const hideAddDialog = () => setAddVisible(false);
  const [categoryName, setCategoryName] = useState("");
  const changeText = useCallback(
    (newText: string) => {
      setCategoryName(newText);
    },
    [setCategoryName]
  );

  // カテゴリの削除処理
  // const deleteCategory = (id: string): void => {
  //   if (selectedCategory) {
  //     if (auth.currentUser === null) {
  //       return;
  //     }
  //     const ref = doc(db, "categories", id);
  //     deleteDoc(ref);
  //   }
  //   setVisible(false);
  // };

  // カテゴリの削除処理
  const deleteCategory = async (categoryId: string): Promise<void> => {
    if (!auth.currentUser) {
      return;
    }

    // カテゴリに関連する食材を検索
    const ingredientQuery = query(
      collection(db, "ingredients"),
      where("categories", "array-contains", categoryId)
    );

    const querySnapshot = await getDocs(ingredientQuery);
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      // カテゴリー情報を更新
      const updatedCategories = doc
        .data()
        .categories.filter((catId: string) => catId !== categoryId);
      batch.update(doc.ref, { categories: updatedCategories });
    });

    // カテゴリを削除
    const categoryRef = doc(db, "categories", categoryId);
    batch.delete(categoryRef);

    // Firestoreに更新を反映
    await batch.commit();
  };

  // カテゴリの追加処理
  const addCategory = () => {
    if (categoryName) {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        addDoc(collection(db, "categories"), {
          userId: userId,
          categoryName: categoryName,
        });
        setCategoryName("");
      }
    }
    setAddVisible(false);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="カテゴリ一覧" />
        <Appbar.Action icon="plus" onPress={() => setAddVisible(true)} />
      </Appbar.Header>
      <View>
        <List.Section>
          {categories.map((category) => (
            <List.Item
              key={category.id}
              title={category.title}
              onLongPress={() => showDialog(category)}
              style={{ padding: 10 }}
              // カテゴリ名変更用
              // right={() => (
              //   <TouchableOpacity onPress={() => showRenameDialog(category)}>
              //     <List.Icon icon="square-edit-outline" color="#000" />
              //   </TouchableOpacity>
              // )}
            />
          ))}
        </List.Section>
      </View>

      {/* 削除ダイアログ */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text>{`カテゴリ「${selectedCategory?.title}」を削除しますか？ `}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>キャンセル</Button>
            <Button
              onPress={() => {
                if (selectedCategory) {
                  deleteCategory(selectedCategory.id);
                }
              }}
            >
              削除する
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* カテゴリ名変更ダイアログ
      <Dialog visible={renameVisible} onDismiss={hideRenameDialog}>
        <Dialog.Title>カテゴリ名を変更する</Dialog.Title>
        <Dialog.Content>
          <TextInput></TextInput>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideRenameDialog}>キャンセル</Button>
          <Button onPress={() => console.log("変更する")}>変更する</Button>
        </Dialog.Actions>
      </Dialog> */}

      {/* カテゴリ追加ダイアログ */}
      <Portal>
        <Dialog visible={addVisible} onDismiss={hideAddDialog}>
          <Dialog.Title>カテゴリを追加する</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={categoryName}
              onChangeText={changeText}
            ></TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideAddDialog}>キャンセル</Button>
            <Button onPress={addCategory}>追加する</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
});
