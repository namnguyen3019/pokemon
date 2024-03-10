import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import cartReducer from '../features/Cart/cartSlice';
export const store = configureStore({
  reducer: { 
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
