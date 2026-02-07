"use client";
import { createContext, useContext, useState } from "react";
import { dummyMyPoint } from "@/tools/dummyData";
import { callApiLog } from "@/tools/apiLog";

// Create Context
const PointContext = createContext();

// Create Provider
export function PointContextProvider({ children }) {
  const [pointData, setMyPointData] = useState({});

  const setPointData = (newObject) => {
    callApiLog("PointContext => new pointData = " + JSON.stringify(newObject));
    setMyPointData(() => {
      return newObject;
    }); // Immutably add object
    // setMyPointDataList(newObject);
  };
  return (
    <PointContext.Provider value={{ pointData, setPointData }}>
      {children}
    </PointContext.Provider>
  );
}

// Create a custom hook
export const usePointContext = () => useContext(PointContext);
