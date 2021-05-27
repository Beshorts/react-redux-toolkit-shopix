import {useState} from 'react';

import {useSelector,useDispatch} from 'react-redux';

// redux actions
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity
}  from '../../features/cart/cartSlice';

import { addToFavorite, removeFromFavorite } from '../../features/favorites/favoriteSlice';

// handle open and close Drawer
export function  useDrawer() {

    const [mobileOpen, setMobileOpen] = useState(false);

    const openDrawerCallback = () => {
     setMobileOpen(true);
    }
    const closeDrawerCallback = () => {
     setMobileOpen(false);
    }
    return [mobileOpen, openDrawerCallback, closeDrawerCallback];
  };


/* manage onClick events and keep track to UI logic on refresh page */
export  function useHandlerButton(value) {

  const dispatch = useDispatch();

  // get states
  const cartItems = useSelector(state => state.cart.cartItems)
  const favorites = useSelector(state => state.favorite.favoriteProducts)

  // get current element based on passed value
  const getCurrentCartItem = cartItems.find(elem => elem.id === value);
  const getCurrentFavoriteItem = favorites.find(elem => elem.id === value);

  // initialize hooks state to manage UI logic
  const [cartItem, setCartItem] = useState(getCurrentCartItem || false);
  const [favoriteItem, setFavoriteItem] = useState(getCurrentFavoriteItem || false)
  const [state, setState] = useState(false);


  const cart = item => {
    setCartItem(true)
    if (cartItem) {
      dispatch(removeFromCart(item))
      setCartItem(false)
    } else {
      dispatch(addToCart(item));
    }
  };

  const favorite = item => {
    setFavoriteItem(true)
    if (favoriteItem) {
      dispatch(removeFromFavorite(item.id))
      setFavoriteItem(false)
    } else {
      dispatch(addToFavorite(item.id))
    }
  };

  const addQuantity = item => {
    dispatch(incrementQuantity(item));
    setState(!state);
  };

  const removeQuantity = item => {
    dispatch(decrementQuantity(item));
    setState(!state);
  };

return {
  // current state
  getCurrentCartItem,
  // hooks states
  cartItem,
  favoriteItem,
  // handlers for redux actions
  favorite,
  cart,
  addQuantity,
  removeQuantity
 };
};



