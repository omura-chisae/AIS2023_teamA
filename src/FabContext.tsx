import React, { createContext, useState, useContext, ReactNode } from "react";

// FabContext の型定義
interface FabContextType {
  isFabDisabled: boolean;
  setFabDisabled: (disabled: boolean) => void;
}

// createContext のデフォルト値に型アサーションを使用
const FabContext = createContext<FabContextType>({
  isFabDisabled: false,
  setFabDisabled: () => {},
});

export const useFabContext = () => useContext(FabContext);

export const FabProvider = ({ children }: { children: ReactNode }) => {
  const [isFabDisabled, setFabDisabled] = useState(false);

  return (
    <FabContext.Provider value={{ isFabDisabled, setFabDisabled }}>
      {children}
    </FabContext.Provider>
  );
};
