// src/store/index.js  or src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web
import { apiSlice } from "../services/apiService";
import authReducer from "../features/authSlice";
// import teamReducer from "...";
// import projectReducer from "...";

const rootReducer = combineReducers({
  auth: authReducer,
  // team: teamReducer,
  // projects: projectReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],           // only persist auth (most common & safest)
  // You can add more later: whitelist: ['auth', 'theme', 'cart']
  blacklist: [apiSlice.reducerPath], // very important – never persist RTK Query cache
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions + your own non-serializable if any
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

// Important: Create persistor
export const persistor = persistStore(store);

// Optional: useful for development (clears persist storage)
// persistor.purge();