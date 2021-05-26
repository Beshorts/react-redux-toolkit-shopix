import { createSelector } from '@reduxjs/toolkit';
// import selector products state
import { selectAllProducts} from '../features/productsAPI/productsAPISlice';
// import selector cartItems state
import { favoriteIdSelector} from '../features/favorites/favoriteSlice';

/***** get products added to favorite ******/
export const favoriteSelected = createSelector(
 selectAllProducts,
 favoriteIdSelector,
  (entities, favoriteProducts) => entities.filter(elem => {
    return favoriteProducts.includes(elem.id)
    }
  )
);
