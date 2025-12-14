"use client";
import { createContext, useContext, useState } from "react";
import { dummyMyPoint } from "@/tools/dummyData";
import { callApiLog } from "@/tools/apiLog";

// Create Context
const PointContext = createContext();

// Create Provider
export function PointContextProvider({ children }) {
  const [pointDataList, setMyPointDataList] = useState({});

  const setPointDataList = (newObject) => {
    setMyPointDataList((prevArray) => {
      return newObject;
    }); // Immutably add object
    // setMyPointDataList(newObject);
  };
  return (
    <PointContext.Provider value={{ pointDataList, setPointDataList }}>
      {children}
    </PointContext.Provider>
  );
}

// Create a custom hook
export const usePointContext = () => useContext(PointContext);
