import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import uiSlice from "./slices/uiSlice";
import licenseSlice from "./slices/licenseSlice";
import notificationSlice from "./slices/notificationSlice";
import accessibilitySlice from "./slices/accessibilitySlice";
import systemSlice from "./slices/systemSlice";
import userSlice from "./slices/userSlice";
import adminSlice from "./slices/adminSlice";
import { api } from "../services/api/base";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    ui: uiSlice,
    license: licenseSlice,
    notifications: notificationSlice,
    accessibility: accessibilitySlice,
    system: systemSlice,
    user: userSlice,
    admin: adminSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
