import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';
import { Pokemon } from '../Pokemon/pokemonsSlice';

export type CartItem  = {
  item: Pokemon;
  quantity: number; // New field for quantity
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Pokemon>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(cartItem => cartItem.item.id === newItem.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ item: newItem, quantity: 1 });
      }
    },
    changeItemQuantity: (state, action) => {
      const {itemId, newQuantity} = action.payload;
      const existingItemIndex = state.items.findIndex(cartItem => cartItem.item.id === itemId);
      state.items[existingItemIndex].quantity = newQuantity
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(cartItem =>cartItem.item.id !== itemIdToRemove);
    },
  },
});

export const { addItemToCart, removeItemFromCart, changeItemQuantity } = cartSlice.actions;
export const selectTotalPrice = (state: RootState): number => {
  const { items } = state.cart;
  return items.reduce((totalPrice: number, cartItem: CartItem) => totalPrice + (cartItem.item.weight * cartItem.quantity), 0);
};
export default cartSlice.reducer;
