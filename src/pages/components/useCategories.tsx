import { useEffect, useState } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db, auth } from "../../firebase";

export type categoriesType = {
  id: string;
  title: string;
};

// カテゴリ取得用のカスタムフック
export const useCategories = () => {
  const [categories, setCategories] = useState<categoriesType[]>([]);

  useEffect(() => {
    const fetchCategories = () => {
      const currentUser = auth.currentUser;
      const userUid = currentUser ? currentUser.uid : null; // uidの取得
      if (userUid) {
        const ref = collection(db, "categories");
        const q = query(ref, where("userId", "==", userUid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          // データ格納用の空配列を定義
          const categories: categoriesType[] = [];

          // データを配列に代入
          snapshot.forEach((doc) => {
            const categoryId = doc.id;
            const categoryData = doc.data();
            const categoryName = categoryData.categoryName;

            const currentCategory = {
              id: categoryId,
              title: categoryName,
            };
            categories.push(currentCategory);
          });
          setCategories(categories);
        });
        return unsubscribe;
      }
    };
    fetchCategories();
  }, []);

  return categories;
};
