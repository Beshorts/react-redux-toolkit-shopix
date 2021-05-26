import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// using redux-persist for persisting state across refresh pages
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"

import rootReducer from "./root-reducer"

export const store = configureStore({
   // persistedState,
    reducer: rootReducer,
    // avoid non-serializability check for redux-persist
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    })
  });


  export const persistor = persistStore(store);

