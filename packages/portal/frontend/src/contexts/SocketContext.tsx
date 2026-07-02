import React, { createContext, useContext, ReactNode } from "react";

interface SocketContextType {
  isConnected: boolean;
  socket: null;
}

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  socket: null,
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ isConnected: false, socket: null }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
