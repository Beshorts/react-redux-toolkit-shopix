import { createSelector } from '@reduxjs/toolkit';

// import selector of all products
import { selectAllProducts} from '../features/productsAPI/productsAPISlice';

// import selector of all ids of products added to cart
import { cartSelector} from '../features/cart/cartSlice';


/***** get details of products added in cart ******/
export const productsCartSelector = createSelector(
 selectAllProducts,
 cartSelector,
   (entities, cartItems) => entities.filter(elem => {
     return cartItems.find(item => item.id === elem.id)
   }
  )
);

/***** get total quantity of products ***/
export const fullQuantitySelector = createSelector(
 cartSelector,
   (cartItems) => cartItems.reduce((total, obj) =>
    obj.quantity + total, 0)
);

/***** get total cart price state ******/
export const totalCartPriceSelector = createSelector(
  cartSelector,
  (state) => state.reduce((acc, curr) =>
    acc + Number(curr.price),0)
)

