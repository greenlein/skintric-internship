import { configureStore } from "@reduxjs/toolkit";
import demographicsReducer from "./demographics";

export const store = configureStore({
  reducer: {
    demographics: demographicsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
