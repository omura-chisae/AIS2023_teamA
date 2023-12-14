import React, { createContext, useState, useContext } from "react";

interface RecipeInfoContextType {
  recipeInfo: string;
  setRecipeInfo: (info: string) => void;
}

export const RecipeInfoContext = createContext<RecipeInfoContextType>({
  recipeInfo: "",
  setRecipeInfo: () => {},
});

export const useRecipeInfo = () => useContext(RecipeInfoContext);
