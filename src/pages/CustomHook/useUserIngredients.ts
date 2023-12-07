import { useState, useEffect } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Ingredient } from "../EditStock";

export const useUserIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const q = query(
        collection(db, "ingredients"),
        where("userId", "==", auth.currentUser?.uid)
      );
      const querySnapshot = await getDocs(q);
      const items: Ingredient[] = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data() as Ingredient;
        if (data.expiryDate && data.expiryDate instanceof Timestamp) {
          data = { ...data, expiryDate: data.expiryDate.toDate() };
        }
        items.push({ ...data, id: doc.id });
      });
      setIngredients(items);
    };

    fetchIngredients();
  }, []);

  return ingredients;
};
