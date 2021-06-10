import { createSelector } from '@reduxjs/toolkit';
// import selector products state
import { selectAllProducts } from '../features/productsAPI/productsAPISlice';

import { productsSelected } from './filters';

// create memoized state to fill grids data

/***** get products from products filtered state where price is up to 7 ******/
export const productsBestPrices = createSelector(
 productsSelected,
  (products) => products.filter(elem =>
    elem.price <= 7)
);

/***** get products from entities state filtered by custom rule ******/
export const productsSuggested = createSelector(
 selectAllProducts,
  (entities) => entities.filter(elem => elem.name.startsWith("C"))
);
