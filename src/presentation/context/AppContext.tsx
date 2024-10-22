import React from "react";
import { createContext, useState } from "react";

interface AppContextType {
  isFirstTime: boolean;
  setFirstTime: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  isFirstTime: true,
  setFirstTime: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFirstTime, setFirstTime] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ isFirstTime, setFirstTime }}>
      {children}
    </AppContext.Provider>
  );
};
