import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authApi from "@/api/authApi";
import authReducer from "@/app/redux/slices/authSlice";
import modalReducer from "@/app/redux/slices/modalSlice"

export const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,
      modal: modalReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
