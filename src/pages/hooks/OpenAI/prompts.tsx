import React from "react";
import { useRecipeInfo } from "../../../RecipeInfoContext";

export const initial = (ingredients: string, seasonings: string) => {
  const { recipeInfo, setRecipeInfo } = useRecipeInfo();
  console.log(recipeInfo);

  const prompt: string = `${recipeInfo}
                          以上の材料の中で一人分のレシピを作成して。
                          すべてを使う必要はありません。
                          作成した後残る食材とg数をプログラムしやすいリスト形式にして最後に記載して。`;
  return prompt;
};

export default initial;
