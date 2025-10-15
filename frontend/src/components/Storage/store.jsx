// store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "../Reducers/userReducers";
import authReducer from "../Reducers/authReducer";
import tokenReducer from "../Reducers/tokenReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "authentication"],
};

const rootReducer = combineReducers({
  user: userReducer,
  authentication: authReducer,
  token: tokenReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false, // <- silence "_persist" key warning completely
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
