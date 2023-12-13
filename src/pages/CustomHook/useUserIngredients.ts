import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Ingredient } from "../EditStock";

export const useUserIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "ingredients"),
      where("userId", "==", auth.currentUser?.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: Ingredient[] = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data() as Ingredient;
        // FirestoreのTimestampオブジェクトをDateオブジェクトに変換
        if (data.expiryDate && data.expiryDate instanceof Timestamp) {
          data = { ...data, expiryDate: data.expiryDate.toDate() };
        }
        items.push({ ...data, id: doc.id });
      });
      setIngredients(items);
    });

    return () => unsubscribe();
  }, []);

  return ingredients;
};
