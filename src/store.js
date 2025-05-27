export const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE": {
      if (state.favorites.some(fav => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
        return state;
      }
      const updatedFavorites = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    }

    case "REMOVE_FAVORITE": {
      const updatedFavorites = state.favorites.filter(
        fav => fav.uid !== action.payload.uid || fav.type !== action.payload.type
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    }

    default:
      return state;
  }
};
