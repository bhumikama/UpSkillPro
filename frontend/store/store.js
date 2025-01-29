// import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import rootReducer from "./rootReducer"; // Import rootReducer

// // Persist configuration
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"], // Persist only the auth slice
// };

// // Persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// // Persistor for persisting and rehydrating state
// export const persistor = persistStore(store);


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";

// Conditionally use storage only on the client side
const createPersistStorage = () => {
  if (typeof window !== "undefined") {
    const storage = require("redux-persist/lib/storage").default; // Uses localStorage
    return storage;
  }
  return undefined; // Avoids error on the server
};

// Persist config
const persistConfig = {
  key: "root",
  storage: createPersistStorage(), // Dynamically set storage
  whitelist: ["auth"], // Only persist auth state
};

// Create persisted reducer only on client side
const persistedReducer =
  typeof window !== "undefined"
    ? persistReducer(persistConfig, rootReducer)
    : rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = typeof window !== "undefined" ? persistStore(store) : null;
