import { createSlice } from '@reduxjs/toolkit';

 const initialState = {
  cartItems: [],
  };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price } = action.payload;
      // check if id is already in state
      const product = state.cartItems.findIndex(elem => elem.id === id);
      if (product === -1) {
        // add new item to the state
        state.cartItems.push({ id, quantity: + 1, price: price });
      }
    },
    incrementQuantity: (state, action) => {
      const { id, price } = action.payload;
      // find product by action payload and increment required quantity and update current price
      const product = state.cartItems.findIndex(elem => elem.id === id);
      state.cartItems.map((item, index) =>
        product === index
        // update current price by current quantity
        ? { ...id, quantity: item.quantity++, price: item.price = (price * [item.quantity]).toFixed(2) }
        // Don't modify other items
        : item
      )
    },
    decrementQuantity: (state, action) => {
      const { id, price } = action.payload;
      /* find product by action payload and decrement required quantity and update current price
         until it will be removed from state */
      const product = state.cartItems.findIndex(elem => elem.id === id);
      state.cartItems.map((elem, index) =>
        product === index && elem.quantity > 1
        ? { ...id, quantity: elem.quantity--, price: elem.price = (price * [elem.quantity]).toFixed(2) }
        : product === index && elem.quantity <= 1
        ? state.cartItems.splice(state.cartItems.findIndex(elem => elem.id === id), 1)
        : elem
      );
    },
    removeFromCart: (state, action) => {
      const {id} = action.payload;
      state.cartItems.splice(state.cartItems.findIndex(elem => elem.id === id), 1)
    },
  },
});

// actions to dipatching
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  itemSelected,
} = cartSlice.actions

// value generated automatically by createSlice
export default cartSlice.reducer

// current state
export const cartSelector = state => state.cart.cartItems

