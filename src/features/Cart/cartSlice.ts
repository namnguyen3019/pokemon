import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';

interface PokemonItem {
  id: number;
  name: string;
  weight: number;
  quantity: number; // New field for quantity
}

interface CartState {
  items: PokemonItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<PokemonItem>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        // If item already exists in cart, increment its quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // If item is not in cart, add it with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== itemIdToRemove);
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export const selectTotalPrice = (state: RootState): number => {
  const { items } = state.cart;
  return items.reduce((totalPrice: number, item: PokemonItem) => totalPrice + (item.weight * item.quantity), 0);
};
export default cartSlice.reducer;
