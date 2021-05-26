import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteProducts: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  // reducers actions
  reducers: {
    addToFavorite: (state, action) => {
       const id = action.payload
       // check if id is already in state
      const favorite = state.favoriteProducts.findIndex(elem => elem.id === id);
      if (favorite === -1) {
        // add new item to the state
        state.favoriteProducts.push({id});
      }
    },
    removeFromFavorite: (state, action) => {
      const id = action.payload
      state.favoriteProducts.splice(state.favoriteProducts.findIndex(elem => elem.id === id), 1)
    }
  }
});

// value generated automatically by createSlice
export default favoriteSlice.reducer

export const favoriteIdSelector = state => state.favorite.favoriteProducts

// actions to dipatching
export const {
  addToFavorite,
  removeFromFavorite
} = favoriteSlice.actions
