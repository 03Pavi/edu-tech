
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, createTransform } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import userReducer from "./auth/auth.slice";
import courseReducer from "./courses/course.slice";
import testSeriesReducer from "./test-series/test-series.slice";
import bannerReducer from "./cms/banner.slice";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const ErrorTransform = createTransform(
  (inboundState: any, key) => {
    if (key === "user") {
      return { ...inboundState, error: null };
    }
    return inboundState;
  },
  (outboundState) => outboundState,
  { whitelist: ["user"] }
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist user for now to avoid large state issues
  transforms: [ErrorTransform],
};

const rootReducer = combineReducers({
  user: userReducer,
  courses: courseReducer,
  testSeries: testSeriesReducer,
  banners: bannerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof store>;
// export type RootState = ReturnType<AppStore["getState"]>; // Redefining RootState above for type safety
export type AppDispatch = AppStore["dispatch"];
export default store;
