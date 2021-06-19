import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
  filterBy: "",
 };

 const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
     getFilterBy: (state, action) => {
      state.filterBy = action.payload
     },
   },
 });

 // actions to dispatching
 export const { getFilterBy } = filterSlice.actions;

 // value generated automatically by createSlice
 export default filterSlice.reducer;

 // selector of current state
 export const filterSelector = state => state.filters.filterBy;

