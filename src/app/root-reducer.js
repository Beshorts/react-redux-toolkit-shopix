import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";

import storageSession from 'redux-persist/lib/storage/session'

// import reducers
import products from './../features/productsAPI/productsAPISlice';
import filters from './../features/filters/filtersSlice';
import cart from './../features/cart/cartSlice';
import favorite from './../features/favorites/favoriteSlice';

const persistConfig = {
  key: "root",
  /* for this project cache/persist data only in current browser session:
     keep the cache intact on refresh page and purge it on closing browser */
  storage: storageSession,
  // clear redux persist state on close app => use it on development
  blacklist: ['products', 'cart', 'favorite', 'filters']
}

const rootReducer = combineReducers({
  products,
  filters,
  cart,
  favorite,
});

export default persistReducer(persistConfig, rootReducer);
