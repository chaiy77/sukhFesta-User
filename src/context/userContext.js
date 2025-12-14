"use client";
import { createContext, useContext, useState } from "react";
// import { dummyMyPoint } from "@/tools/dummyData";

// Create Context
const UserContext = createContext();

// Create Provider
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [liffObject, setLiffObject] = useState(null);
  const [lineToken, setLineToken] = useState(null);
  const [isLogin, setLogin] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        liffObject,
        setLiffObject,
        lineToken,
        setLineToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
