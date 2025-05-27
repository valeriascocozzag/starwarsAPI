import React, { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../store"; 

const GlobalContext = createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalReducer = () => useContext(GlobalContext);
export default useGlobalReducer;
