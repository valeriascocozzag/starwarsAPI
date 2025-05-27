import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  favorites: [],
};

const GlobalContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.some(fav => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          fav => fav.uid !== action.payload.uid || fav.type !== action.payload.type
        ),
      };

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalStore = () => useContext(GlobalContext);
