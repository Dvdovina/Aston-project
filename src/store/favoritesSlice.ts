import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoritesState, Movie } from "@utils/types/types";
import { STORAGE_KEYS } from "@utils/constants/constants";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@utils/storage/localStorage";
import { RootState } from "@store/store";



const initialState: FavoritesState = {
  favorites: getLocalStorageItem(STORAGE_KEYS.FAVORITES) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.favorites.some(
        (film) => film.imdbID === action.payload.imdbID
      );
      if (!exists) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter(
          (film) => film.imdbID !== action.payload.imdbID
        );
      }
      setLocalStorageItem(STORAGE_KEYS.FAVORITES, state.favorites);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (film) => film.imdbID !== action.payload
      );
      setLocalStorageItem(STORAGE_KEYS.FAVORITES, state.favorites);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
export const selectFavorites = (state: RootState) => state.favorites.favorites;