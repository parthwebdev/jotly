"use client";

import { createContext, useContext, useState } from "react";

interface MobileContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileContext = createContext<MobileContextProps | undefined>(
  undefined
);

export const useMobileContext = () => {
  const context = useContext(MobileContext);
  if (!context)
    throw new Error("useMobileContext must be used within the Provider!");

  return context;
};

const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MobileContext.Provider value={{ setIsOpen, isOpen }}>
      {children}
    </MobileContext.Provider>
  );
};

export default MobileProvider;
