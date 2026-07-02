import React, { createContext, useContext, ReactNode } from "react";

interface ProgressContextType {
  isReady: boolean;
}

const ProgressContext = createContext<ProgressContextType>({ isReady: true });

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  return (
    <ProgressContext.Provider value={{ isReady: true }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
