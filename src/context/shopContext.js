"use client";
import { createContext, useContext, useState } from "react";
import { dummyMyPoint } from "@/tools/dummyData";

// Create Context
const ShopContext = createContext();

// Create Provider
export function ShopContextProvider({ children }) {
  const [shopList, setShopList] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  const selectShop = (newObject) => {
    setSelectedShop(newObject);
  };

  return (
    <ShopContext.Provider
      value={{ selectedShop, selectShop, shopList, setShopList }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShopContext = () => useContext(ShopContext);
