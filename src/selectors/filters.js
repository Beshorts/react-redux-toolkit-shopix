import { createSelector } from '@reduxjs/toolkit';
// import selector products state
import { selectAllProducts } from '../features/productsAPI/productsAPISlice'
// import selector filterBY state
import { filterSelector } from '../features/filters/filtersSlice'

/***** get products filtered by product_type ******/
export const productsSelected = createSelector(
 selectAllProducts,
 filterSelector,
  (entities, filterBy) => entities.filter(elem =>
    elem.product_type === filterBy)
);
