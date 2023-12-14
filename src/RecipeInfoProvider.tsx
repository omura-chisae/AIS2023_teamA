import React, { useState } from "react";
import { RecipeInfoContext } from "./RecipeInfoContext";

type Props = {
  children?: React.ReactNode;
};

export const RecipeInfoProvider: React.FC<Props> = ({ children }) => {
  const [recipeInfo, setRecipeInfo] = useState("");

  return (
    <RecipeInfoContext.Provider value={{ recipeInfo, setRecipeInfo }}>
      {children}
    </RecipeInfoContext.Provider>
  );
};
