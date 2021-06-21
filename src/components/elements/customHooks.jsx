import {useState, useMemo} from 'react';

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
export const  useDrawer = () => {

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
export  const useAddRemoveCartItem = (value) => {

  const dispatch = useDispatch();

  // get states
  const cartItems = useSelector(state => state.cart.cartItems)

  // get current element based on passed value
  const getCurrentCartItem = cartItems.find(elem => elem.id === value) || false;
  // initialize hooks state to manage UI logic
  const [cartItem, setCartItem] = useState(getCurrentCartItem || false);

  const cart = item => {
    setCartItem(cartItem)
    if (getCurrentCartItem) {
      dispatch(removeFromCart(item))
      setCartItem(!cartItem)
    } else {
      dispatch(addToCart(item));
    }
  };

return {
  // get current state
  getCurrentCartItem,
  // handlers for redux actions
  cart,
 };
};

export  const useAddRemoveFavorite = (value) => {

  const dispatch = useDispatch();

  // get states
  const favorites = useSelector(state => state.favorite.favoriteProducts)

  // get current element based on passed value
  const getCurrentFavoriteItem = favorites.find(elem => elem.id === value) || false;

  // initialize hooks state from function to manage UI logic
  const [favoriteItem, setFavoriteItem] = useState(getCurrentFavoriteItem || false)

  const favorite = item => {
    setFavoriteItem(favoriteItem)
    if (getCurrentFavoriteItem) {
      dispatch(removeFromFavorite(item.id))
      setFavoriteItem(!favoriteItem)
    } else {
      dispatch(addToFavorite(item.id))
    }
  };

return {
  // get current state
  getCurrentFavoriteItem,
  // handlers for redux actions
  favorite,
 };
};

/* manage onClick events and keep track to UI logic on refresh page */
export  const useQuantityCounter = (value) => {

  const dispatch = useDispatch();

  // get states
  const cartItems = useSelector(state => state.cart.cartItems)

  // get current element based on passed value
  const getCurrentCartItem = cartItems.find(elem => elem.id === value);

  // initialize hooks state to manage UI logic
  const [state, setState] = useState(false);


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
  // handlers for redux actions
  addQuantity,
  removeQuantity
 };
};


// create one Row Grid Fixed width with variable heights and parameters
export const  useOneRowGrid = (height,value) => {

  // initialize state
  let cellWidth = 0;
  // manage width based on height parameters
  height >= 190 ? cellWidth = 210 : cellWidth = 160;
  // fixed cell height
  const cellHeight = height;
  // fixed row
  const rowCount = 1;
  // create columns based on elements length spammed on rowCount result
  const columnCount = Math.ceil(value.length / rowCount);

  // memoize grid state
  const itemData = useMemo(
    () => ({
      columnCount,
      value,
    }),
    [columnCount, value]
  );

  return {
    cellHeight,
    cellWidth,
    rowCount,
    columnCount,
    itemData,
  }
};


