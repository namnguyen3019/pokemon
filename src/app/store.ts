import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/Cart/cartSlice';
import pokemonsApi from '../features/Pokemon/pokemonsSlice';
export const store = configureStore({
  reducer: { 
    cart: cartReducer,
    [pokemonsApi.reducerPath]: pokemonsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonsApi.middleware),
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
