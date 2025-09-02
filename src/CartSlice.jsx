import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],       // cart items
    totalItems: 0,   // total quantity of items in cart
    totalCost: 0,    // total cost of items in cart
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }

      // update totals
      state.totalItems++;
      state.totalCost += parseFloat(cost.toString().replace(/[^0-9.-]+/g, ""));
    },

    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.name === action.payload);

      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity;
        state.totalCost -= parseFloat(itemToRemove.cost.toString().replace(/[^0-9.-]+/g, "")) * itemToRemove.quantity;
      }

      state.items = state.items.filter(item => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        // adjust totals before changing
        state.totalItems -= itemToUpdate.quantity;
        state.totalCost -= parseFloat(itemToUpdate.cost.toString().replace(/[^0-9.-]+/g, "")) * itemToUpdate.quantity;

        // set new quantity
        itemToUpdate.quantity = quantity;

        // adjust totals after changing
        state.totalItems += quantity;
        state.totalCost += parseFloat(itemToUpdate.cost.toString().replace(/[^0-9.-]+/g, "")) * quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
